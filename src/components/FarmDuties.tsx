"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Loader2, AlertCircle } from "lucide-react";
import WoodenButton from "./WoodenButton";
import SuccessModal from "./SuccessModal";

export default function FarmDuties() {
  // Mount state for SSR hydration safety
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Social tasks completion states
  const [followStatus, setFollowStatus] = useState<"idle" | "verifying" | "completed">("idle");
  const [likeStatus, setLikeStatus] = useState<"idle" | "verifying" | "completed">("idle");
  const [repostStatus, setRepostStatus] = useState<"idle" | "verifying" | "completed">("idle");

  const [followTimer, setFollowTimer] = useState(0);
  const [likeTimer, setLikeTimer] = useState(0);
  const [repostTimer, setRepostTimer] = useState(0);

  // Track document visibility to pause/run timer realistically
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Timer effects
  useEffect(() => {
    if (followTimer > 0 && followStatus === "verifying") {
      if (!isDocumentVisible) return;
      const id = setTimeout(() => {
        setFollowTimer((prev) => {
          if (prev <= 1) {
            setFollowStatus("completed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [followTimer, followStatus, isDocumentVisible]);

  useEffect(() => {
    if (likeTimer > 0 && likeStatus === "verifying") {
      if (!isDocumentVisible) return;
      const id = setTimeout(() => {
        setLikeTimer((prev) => {
          if (prev <= 1) {
            setLikeStatus("completed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [likeTimer, likeStatus, isDocumentVisible]);

  useEffect(() => {
    if (repostTimer > 0 && repostStatus === "verifying") {
      if (!isDocumentVisible) return;
      const id = setTimeout(() => {
        setRepostTimer((prev) => {
          if (prev <= 1) {
            setRepostStatus("completed");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [repostTimer, repostStatus, isDocumentVisible]);

  const startVerification = (
    url: string,
    setStatus: React.Dispatch<React.SetStateAction<"idle" | "verifying" | "completed">>,
    setTimer: React.Dispatch<React.SetStateAction<number>>
  ) => {
    window.open(url, "_blank");
    setStatus("verifying");
    setTimer(5); // 5-second verification countdown
  };

  const getVerificationMessage = (timer: number) => {
    if (timer > 4) return "Opening X...";
    if (timer > 2) return "Checking...";
    return "Verifying...";
  };

  // Form input states
  const [xUsername, setXUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [formError, setFormError] = useState("");

  // Input validation helpers
  const isXUsernameValid = xUsername.trim().length >= 3;
  const isWalletValid = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);

  // Completed Checklist Items
  const checklist = [
    {
      id: "follow",
      text: "Follow us on X",
      isCompleted: followStatus === "completed",
      status: followStatus,
      timer: followTimer,
      action: () => {
        startVerification("https://x.com/EthCowz", setFollowStatus, setFollowTimer);
      },
      buttonText: "Follow @EthCowz",
    },
    {
      id: "like",
      text: "Like",
      isCompleted: likeStatus === "completed",
      status: likeStatus,
      timer: likeTimer,
      action: () => {
        startVerification("https://x.com/EthCowz/status/2064025751423168525", setLikeStatus, setLikeTimer);
      },
      buttonText: "Like Post",
    },
    {
      id: "repost",
      text: "Repost",
      isCompleted: repostStatus === "completed",
      status: repostStatus,
      timer: repostTimer,
      action: () => {
        startVerification("https://x.com/EthCowz/status/2064025751423168525", setRepostStatus, setRepostTimer);
      },
      buttonText: "Repost",
    },
    {
      id: "username",
      text: "Enter your X Username",
      isCompleted: isXUsernameValid,
      isFormField: true,
      hint: "Starts with @, min 3 chars",
    },
    {
      id: "wallet",
      text: "Enter your Wallet Address",
      isCompleted: isWalletValid,
      isFormField: true,
      hint: "Valid Ethereum wallet (0x...)",
    },
  ];

  const allCompleted = checklist.every((item) => item.isCompleted);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allCompleted) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xUsername,
          walletAddress,
        }),
      });

      const data = await response.json();

      if (data && data.success === true) {
        setIsSuccessOpen(true);
        // Reset states
        setFollowStatus("idle");
        setLikeStatus("idle");
        setRepostStatus("idle");
        setFollowTimer(0);
        setLikeTimer(0);
        setRepostTimer(0);
        setXUsername("");
        setWalletAddress("");
      } else if (
        data &&
        (data.error === "Already registered" ||
          data.message === "Already registered" ||
          data.status === "duplicate" ||
          (typeof data.error === "string" && data.error.toLowerCase().includes("already registered")) ||
          (typeof data.message === "string" && data.message.toLowerCase().includes("already registered")))
      ) {
        setFormError("Already registered");
      } else {
        setFormError(data.error || data.message || "Something went wrong. Try again.");
      }
    } catch {
      setFormError("Server error. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="farm-duties"
      className="relative w-full pt-20 pb-60 sm:pb-72 lg:pb-36 bg-grass-green flex flex-col items-center justify-start overflow-hidden px-4"
    >
      <div className="max-w-6xl w-full mx-auto relative z-20">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2
            className="font-luckiest-guy text-4xl sm:text-6xl text-paper-beige tracking-wider"
            style={{ textShadow: "4px 4px 0px #8B5A2B" }}
          >
            FARM DUTIES
          </h2>
          <p className="font-outfit font-bold text-dark-text text-lg max-w-xl mx-auto mt-2">
            Show the farmer you have what it takes. Perform the actions below to qualify for GTD.
          </p>
        </div>

        {/* Dual Layout: Billboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Farm Duties Checklist (Wooden Board) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#7a4e2b] via-[#653e20] to-[#503118] border-8 border-[#3d2515] rounded-3xl shadow-[0_12px_0_#2b1a0e]">
            {/* Bolt decorations in the corners to look like a placards sign */}
            <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
            <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
            <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
            {/* Vertical wood panels line effect */}
            <div className="absolute inset-y-0 left-1/3 w-[2px] bg-[#2b1a0e]/15 z-0" />
            <div className="absolute inset-y-0 right-1/3 w-[2px] bg-[#2b1a0e]/15 z-0" />

            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div>
                <h3
                  className="font-luckiest-guy text-2xl sm:text-3xl text-paper-beige mb-6 tracking-wide"
                  style={{ textShadow: "2px 2px 0px #2E2E2E" }}
                >
                  Duty Checklist
                </h3>

                <div className="space-y-4">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-text/40 border-2 border-wood-brown backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        {/* Checkbox */}
                        <div className="relative flex-shrink-0 w-8 h-8 rounded-full border-2 border-paper-beige bg-wood-brown flex items-center justify-center">
                          {item.isCompleted ? (
                            <div className="absolute inset-0 bg-button-green rounded-full flex items-center justify-center border-2 border-paper-beige transform transition-all duration-200 scale-105">
                              <Check className="w-5 h-5 text-paper-beige stroke-[3]" />
                            </div>
                          ) : item.status === "verifying" ? (
                            <div className="absolute inset-0 bg-amber-500 rounded-full flex items-center justify-center border-2 border-paper-beige transform transition-all duration-200 scale-105">
                              <Loader2 className="w-4 h-4 text-paper-beige animate-spin" />
                            </div>
                          ) : null}
                        </div>

                        {/* Text */}
                        <div>
                          <p className="font-luckiest-guy text-base sm:text-lg text-paper-beige tracking-wide">
                            {item.text}
                          </p>
                          {item.hint && !item.isCompleted && (
                            <p className="text-xs text-paper-beige/70 font-semibold font-outfit">
                              {item.hint}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Button for Non-Form Fields */}
                      {!item.isFormField && (
                        <button
                          type="button"
                          onClick={item.action}
                          disabled={item.isCompleted || item.status === "verifying"}
                          className={`px-4 py-2 font-luckiest-guy text-xs sm:text-sm border-2 border-wood-brown rounded-md tracking-wider transition-all shadow-md cursor-pointer ${item.isCompleted
                            ? "bg-button-green text-paper-beige cursor-default opacity-80"
                            : item.status === "verifying"
                              ? "bg-amber-500 text-paper-beige cursor-default animate-pulse"
                              : "bg-paper-beige text-wood-brown hover:bg-wood-brown hover:text-paper-beige active:scale-95"
                            }`}
                        >
                          {item.isCompleted
                            ? "Completed"
                            : item.status === "verifying"
                              ? getVerificationMessage(item.timer || 0)
                              : item.buttonText}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-paper-beige/20 pt-4 flex items-center justify-between">
                <span className="font-outfit text-sm font-bold text-paper-beige">
                  Progress
                </span>
                <span className="font-luckiest-guy text-lg text-paper-beige">
                  {checklist.filter((c) => c.isCompleted).length} / 5 Done
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form (Paper Card) */}
          <div
            id="apply"
            className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center relative overflow-hidden bg-[#F8F0D8] border-4 border-dark-text rounded-3xl shadow-[0_10px_0_#2E2E2E]"
          >
            {/* Vintage paper dashed inner border */}
            <div className="absolute inset-3 border-2 border-dashed border-dark-text/20 rounded-2xl pointer-events-none z-0" />

            <div className="relative z-10 w-full">
              <h3 className="font-luckiest-guy text-2xl sm:text-3xl text-dark-text mb-2 tracking-wide">
                Apply to da Herd
              </h3>
              <p className="font-outfit font-bold text-sm text-dark-text/80 mb-6">
                Enter your credentials to complete the final duties and submit your entry.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="xUsername"
                    className="block font-luckiest-guy text-sm text-dark-text mb-2 tracking-wide"
                  >
                    X Username
                  </label>
                  <div className="relative">
                    <input
                      suppressHydrationWarning
                      type="text"
                      id="xUsername"
                      value={xUsername}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && !val.startsWith("@")) {
                          setXUsername("@" + val);
                        } else {
                          setXUsername(val);
                        }
                      }}
                      placeholder="@username"
                      className="w-full px-4 py-3 rounded-xl border-4 border-wood-brown bg-paper-beige text-dark-text font-outfit font-bold placeholder-dark-text/40 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all"
                      required
                    />
                    {xUsername && !isXUsernameValid && (
                      <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Minimum 3 characters
                      </p>
                    )}
                  </div>
                </div>

                {/* Wallet Address Field */}
                <div>
                  <label
                    htmlFor="walletAddress"
                    className="block font-luckiest-guy text-sm text-dark-text mb-2 tracking-wide"
                  >
                    Wallet Address
                  </label>
                  <div className="relative">
                    <input
                      suppressHydrationWarning
                      type="text"
                      id="walletAddress"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value.trim())}
                      placeholder="0x..."
                      className="w-full px-4 py-3 rounded-xl border-4 border-wood-brown bg-paper-beige text-dark-text font-outfit font-bold placeholder-dark-text/40 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all text-sm"
                      required
                    />
                    {walletAddress && !isWalletValid && (
                      <p className="text-red-600 text-xs font-bold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Must be a valid 42-char EVM address
                      </p>
                    )}
                  </div>
                </div>

                {formError && (
                  <div className="p-3 bg-red-100 border-2 border-red-400 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 flex justify-center">
                  {!isMounted ? (
                    <WoodenButton type="submit" disabled={true}>
                      Apply
                    </WoodenButton>
                  ) : (
                    <WoodenButton
                      type="submit"
                      disabled={!allCompleted || isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" /> Applying...
                        </span>
                      ) : (
                        "Apply"
                      )}
                    </WoodenButton>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot: pointing-cow.png at the bottom right pointing left towards the board */}
      <div className="absolute right-[-120px] sm:right-[4%] lg:right-[8%] bottom-0 w-[340px] h-[340px] sm:w-[330px] sm:h-[330px] lg:w-[440px] lg:h-[440px] z-30 pointer-events-none">
        <Image
          src="/assets/pointing-cow.png"
          alt="Pointing Cow"
          fill
          sizes="(max-width: 640px) 340px, (max-width: 1024px) 330px, 440px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </section>
  );
}

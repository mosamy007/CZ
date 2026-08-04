"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, AlertCircle, Check, Search } from "lucide-react";
import WoodenButton from "./WoodenButton";

export default function FarmDuties() {
  const [walletAddress, setWalletAddress] = useState("");
  const [gtdList, setGtdList] = useState<string[]>([]);
  const [fcfsList, setFcfsList] = useState<string[]>([]);
  
  const [isLoadingLists, setIsLoadingLists] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<null | "gtd" | "fcfs" | "not-found">(null);
  const [checkedAddress, setCheckedAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch lists on mount
  useEffect(() => {
    async function loadLists() {
      try {
        const [gtdRes, fcfsRes] = await Promise.all([
          fetch("/gtd.json"),
          fetch("/fcfs.json"),
        ]);
        
        if (gtdRes.ok && fcfsRes.ok) {
          const gtdData = await gtdRes.json();
          const fcfsData = await fcfsRes.json();
          setGtdList(gtdData);
          setFcfsList(fcfsData);
        }
      } catch (err) {
        console.error("Error loading whitelist files:", err);
      } finally {
        setIsLoadingLists(false);
      }
    }
    loadLists();
  }, []);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setCheckResult(null);

    const cleanAddress = walletAddress.trim().toLowerCase();
    
    // EVM address verification
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(cleanAddress);
    if (!isValid) {
      setErrorMsg("Please enter a valid Ethereum address (0x...)");
      return;
    }

    setIsChecking(true);
    setCheckedAddress(walletAddress.trim());

    // Simulated short delay for premium UX feel
    setTimeout(() => {
      if (gtdList.indexOf(cleanAddress) !== -1) {
        setCheckResult("gtd");
      } else if (fcfsList.indexOf(cleanAddress) !== -1) {
        setCheckResult("fcfs");
      } else {
        setCheckResult("not-found");
      }
      setIsChecking(false);
    }, 1200);
  };

  return (
    <section
      id="farm-duties"
      className="relative w-full min-h-screen pt-28 pb-60 sm:pb-72 lg:pb-36 bg-grass-green flex flex-col items-center justify-start overflow-hidden px-4"
    >
      <div className="max-w-4xl w-full mx-auto relative z-20 flex-grow flex flex-col justify-center">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2
            className="font-luckiest-guy text-4xl sm:text-6xl text-paper-beige tracking-wider"
            style={{ textShadow: "4px 4px 0px #8B5A2B" }}
          >
            <span>WHITELIST CHECKER</span>
          </h2>
          <p className="font-outfit font-bold text-dark-text text-lg max-w-xl mx-auto mt-2">
            <span>Paste your Ethereum wallet address to check if you are whitelisted for FCFS or GTD.</span>
          </p>
        </div>

        {/* Center Wooden Signboard */}
        <div className="max-w-2xl w-full mx-auto p-6 sm:p-12 text-center relative overflow-hidden bg-gradient-to-br from-[#7a4e2b] via-[#653e20] to-[#503118] border-8 border-[#3d2515] rounded-3xl shadow-[0_12px_0_#2b1a0e]">
          {/* Bolt decorations in the corners */}
          <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
          <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
          <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-inner z-0 opacity-70" />
          
          {/* Wood panels vertical lines */}
          <div className="absolute inset-y-0 left-1/4 w-[2px] bg-[#2b1a0e]/15 z-0" />
          <div className="absolute inset-y-0 left-2/4 w-[2px] bg-[#2b1a0e]/15 z-0" />
          <div className="absolute inset-y-0 left-3/4 w-[2px] bg-[#2b1a0e]/15 z-0" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Input and check form */}
            <div className="w-full px-4 py-6 sm:py-8 rounded-2xl bg-paper-beige border-4 border-wood-brown shadow-lg">
              <form onSubmit={handleCheck} className="space-y-5">
                <div>
                  <label
                    htmlFor="walletAddress"
                    className="block font-luckiest-guy text-lg sm:text-xl text-wood-brown mb-3 tracking-wide"
                  >
                    <span>Enter Wallet Address</span>
                  </label>
                  <div className="relative max-w-lg mx-auto">
                    <input
                      type="text"
                      id="walletAddress"
                      value={walletAddress}
                      onChange={(e) => {
                        setWalletAddress(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      placeholder="0x..."
                      disabled={isChecking || isLoadingLists}
                      className="w-full px-4 py-3 rounded-xl border-4 border-wood-brown bg-paper-beige text-dark-text font-outfit font-bold placeholder-dark-text/40 focus:outline-none focus:ring-4 focus:ring-sky-blue/50 transition-all text-sm text-center"
                      required
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-red-600 text-xs font-bold mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </p>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <WoodenButton
                    type="submit"
                    disabled={isChecking || isLoadingLists || !walletAddress.trim()}
                  >
                    {isChecking ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                        <span>Checking...</span>
                      </span>
                    ) : isLoadingLists ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
                        <span>Loading Registry...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Search className="w-5 h-5 flex-shrink-0" />
                        <span>Check Wallet</span>
                      </span>
                    )}
                  </WoodenButton>
                </div>
              </form>
            </div>

            {/* Results Display */}
            {checkResult && (
              <div className="mt-8 w-full animate-fade-in">
                {checkResult === "gtd" && (
                  <div className="p-6 rounded-2xl bg-button-green border-4 border-wood-brown shadow-xl text-paper-beige text-center">
                    <div className="w-12 h-12 bg-paper-beige rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-wood-brown">
                      <Check className="w-7 h-7 text-button-green stroke-[3] flex-shrink-0" />
                    </div>
                    <h4 className="font-luckiest-guy text-2xl tracking-wide mb-2">
                      <span>CONGRATS! YOU ARE IN DA HERD!</span>
                    </h4>
                    <div className="font-outfit font-bold text-sm sm:text-base max-w-md mx-auto mb-4 text-paper-beige/90">
                      <span>Your wallet </span>
                      <span className="underline break-all block mt-1 font-mono text-xs notranslate" translate="no">{checkedAddress}</span>
                      <span> is whitelisted for the </span>
                      <strong className="text-amber-300"><span>GTD (Guaranteed Mint)</span></strong>
                      <span> spot!</span>
                    </div>
                    <Link
                      href="https://opensea.io/collection/cowz1/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2.5 bg-paper-beige text-wood-brown font-luckiest-guy rounded-xl border-4 border-wood-brown hover:bg-[#eae0c5] active:scale-95 transition-all text-sm tracking-wider"
                    >
                      <span>View on OpenSea</span>
                    </Link>
                  </div>
                )}

                {checkResult === "fcfs" && (
                  <div className="p-6 rounded-2xl bg-[#FF9900] border-4 border-wood-brown shadow-xl text-paper-beige text-center">
                    <div className="w-12 h-12 bg-paper-beige rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-wood-brown">
                      <Check className="w-7 h-7 text-[#FF9900] stroke-[3] flex-shrink-0" />
                    </div>
                    <h4 className="font-luckiest-guy text-2xl tracking-wide mb-2">
                      <span>CONGRATS! YOU ARE IN DA HERD!</span>
                    </h4>
                    <div className="font-outfit font-bold text-sm sm:text-base max-w-md mx-auto mb-4 text-paper-beige/90">
                      <span>Your wallet </span>
                      <span className="underline break-all block mt-1 font-mono text-xs notranslate" translate="no">{checkedAddress}</span>
                      <span> is whitelisted for the </span>
                      <strong className="text-yellow-200"><span>FCFS (First-Come, First-Served)</span></strong>
                      <span> spot!</span>
                    </div>
                    <Link
                      href="https://opensea.io/collection/cowz1/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2.5 bg-paper-beige text-wood-brown font-luckiest-guy rounded-xl border-4 border-wood-brown hover:bg-[#eae0c5] active:scale-95 transition-all text-sm tracking-wider"
                    >
                      <span>View on OpenSea</span>
                    </Link>
                  </div>
                )}

                {checkResult === "not-found" && (
                  <div className="p-6 rounded-2xl bg-[#a1403b] border-4 border-wood-brown shadow-xl text-paper-beige text-center">
                    <div className="w-12 h-12 bg-paper-beige rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-wood-brown">
                      <AlertCircle className="w-7 h-7 text-[#a1403b] stroke-[3] flex-shrink-0" />
                    </div>
                    <h4 className="font-luckiest-guy text-2xl tracking-wide mb-2">
                      <span>NOT FOUND IN DA LISTS!</span>
                    </h4>
                    <div className="font-outfit font-bold text-sm sm:text-base max-w-md mx-auto mb-4 text-paper-beige/90">
                      <span>Wallet </span>
                      <span className="underline break-all block mt-1 font-mono text-xs notranslate" translate="no">{checkedAddress}</span>
                      <span> was not found in the FCFS or GTD lists.</span>
                    </div>
                    <Link
                      href="https://opensea.io/collection/cowz1/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2.5 bg-paper-beige text-wood-brown font-luckiest-guy rounded-xl border-4 border-wood-brown hover:bg-[#eae0c5] active:scale-95 transition-all text-sm tracking-wider"
                    >
                      <span>Visit OpenSea</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
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
    </section>
  );
}

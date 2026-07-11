"use client";

interface WoodenButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function WoodenButton({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: WoodenButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-luckiest-guy text-lg sm:text-xl text-paper-beige px-8 py-3 border-4 border-[#4a2e18] rounded-2xl bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] shadow-[0_5px_0_#4a2e18] active:shadow-[0_1px_0_#4a2e18] active:translate-y-[4px] select-none cursor-pointer transition-all duration-150 ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "opacity-100 hover:scale-[1.03] active:scale-[0.97]"
      } ${className}`}
      style={{
        textShadow: "2px 2px 0px #2E2E2E",
        minHeight: "56px",
      }}
    >
      <span className="relative z-10 block text-center tracking-wider">
        {children}
      </span>
    </button>
  );
}

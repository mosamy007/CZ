"use client";

import Image from "next/image";
import WoodenButton from "./WoodenButton";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-dark-text/75 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Container */}
      <div className="relative bg-[#F8F0D8] border-4 border-dark-text rounded-3xl p-8 max-w-md w-full shadow-[0_10px_0_#2E2E2E] text-center z-10 overflow-hidden">
        {/* Vintage paper dashed inner border */}
        <div className="absolute inset-3 border-2 border-dashed border-dark-text/20 rounded-2xl pointer-events-none z-0" />

        <div className="relative z-10">
          {/* Stamp Image */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="w-full h-full relative transform -rotate-12">
              <Image
                src="/assets/stamp-approved.png.png"
                alt="Approved Stamp"
                fill
                sizes="192px"
                className="object-contain filter drop-shadow-lg pointer-events-none"
              />
            </div>
          </div>

          {/* Modal Title & Text */}
          <h2
            className="font-luckiest-guy text-3xl sm:text-4xl text-button-green mb-4 tracking-wider"
            style={{ textShadow: "2px 2px 0px #2E2E2E" }}
          >
            Welcome to da Herd!
          </h2>
          <p className="font-outfit font-bold text-dark-text text-lg mb-8 leading-relaxed">
            Your application has been received. The farmer is reviewing your farm credentials. Keep an eye on our X!
          </p>

          {/* Close button */}
          <div className="flex justify-center">
            <WoodenButton onClick={onClose}>
              Back to Farm
            </WoodenButton>
          </div>
        </div>
      </div>
    </div>
  );
}

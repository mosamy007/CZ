"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-wood-brown text-paper-beige pt-12 pb-8 mt-auto">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-paper-beige/20 pb-8">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="relative w-32 h-10 group transition-transform duration-300 hover:scale-105">
              <Image
                src="/assets/cowz-logo.svg"
                alt="Cowz Logo"
                fill
                className="object-contain"
              />
            </Link>
            <p className="font-outfit font-bold text-xs sm:text-sm text-paper-beige/70 text-center md:text-left">
              Get to da herd. Whitelist duties in progress.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="font-luckiest-guy tracking-wider hover:text-sky-blue transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/faq"
              className="font-luckiest-guy tracking-wider hover:text-sky-blue transition-colors text-sm"
            >
              FAQ
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://x.com/EthCowz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 bg-dark-text text-paper-beige font-luckiest-guy rounded-md border-2 border-paper-beige hover:bg-paper-beige hover:text-dark-text hover:scale-105 active:scale-95 transition-all duration-200 text-xs"
            >
              X
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-outfit font-bold text-paper-beige/50">
          <p>© {currentYear} Cowz. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

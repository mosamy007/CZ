"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X as CloseIcon } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-sky-blue/80 backdrop-blur-md border-b-4 border-wood-brown/20 py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="relative w-52 h-16 sm:w-64 sm:h-20 -ml-8 sm:ml-0 group transition-transform duration-300 hover:scale-105">
              <Image
                src="/assets/cowz-logo.svg"
                alt="Cowz Logo"
                fill
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-luckiest-guy text-lg tracking-wider transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? "text-wood-brown underline underline-offset-4 decoration-4"
                      : "text-dark-text hover:text-wood-brown"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Social Icons / Links */}
            <div className="flex items-center space-x-4 pl-4 border-l-2 border-wood-brown/20">
              <Link
                href="https://x.com/EthCowz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1 bg-dark-text text-paper-beige font-luckiest-guy rounded-md border-2 border-wood-brown hover:bg-wood-brown hover:text-paper-beige hover:scale-105 active:scale-95 transition-all duration-200"
              >
                X
              </Link>
              <Link
                href="https://opensea.io/collection/hoodcowz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1 bg-[#2081E2] text-white font-luckiest-guy rounded-md border-2 border-wood-brown hover:bg-[#1868b7] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
              >
                OpenSea
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-text hover:text-wood-brown focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-paper-beige/95 border-b-4 border-wood-brown shadow-lg backdrop-blur-md">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-luckiest-guy text-xl transition-colors w-full text-center ${
                    isActive
                      ? "text-wood-brown bg-wood-brown/10 rounded-xl"
                      : "text-dark-text hover:text-wood-brown"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
             <div className="pt-4 border-t border-wood-brown/20 w-full flex flex-col items-center gap-3">
              <Link
                href="https://x.com/EthCowz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-2 bg-dark-text text-paper-beige font-luckiest-guy rounded-md border-2 border-wood-brown text-center w-2/3 hover:bg-wood-brown hover:text-paper-beige transition-all"
              >
                X
              </Link>
               <Link
                 href="https://opensea.io/collection/hoodcowz"
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="px-8 py-2 bg-[#2081E2] text-white font-luckiest-guy rounded-md border-2 border-wood-brown text-center w-2/3 hover:bg-[#1868b7] transition-all"
               >
                 OpenSea
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

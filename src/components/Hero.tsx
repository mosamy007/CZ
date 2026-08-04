"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import WoodenButton from "./WoodenButton";

export default function Hero() {
  const router = useRouter();

  const handleJoin = () => {
    router.push("/check");
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24"
    >
      {/* Sky Background (Optimized with Next.js Image) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/assets/hero-sky.png"
          alt="Sky Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom pointer-events-none"
        />
      </div>

      {/* Farm Background (Optimized with Next.js Image) */}
      <div className="absolute bottom-0 left-0 right-0 h-[58vh] md:inset-0 md:h-full z-0 opacity-85 pointer-events-none">
        <Image
          src="/assets/farm-background.png"
          alt="Farm Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom pointer-events-none"
        />
      </div>

      {/* Hero Content Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center items-center text-center pt-8 pb-52 sm:pb-60 lg:pb-32">
        <div className="max-w-2xl px-4 py-8 rounded-3xl bg-paper-beige/90 border-4 border-wood-brown shadow-2xl relative">
          <h1
            className="font-luckiest-guy text-4xl sm:text-6xl md:text-7xl text-[#FF9900] tracking-wide mb-4"
            style={{
              textShadow:
                "4px 4px 0px #8B5A2B, -2px -2px 0px #8B5A2B, 2px -2px 0px #8B5A2B, -2px 2px 0px #8B5A2B, 2px 2px 0px #8B5A2B",
            }}
          >
            GET TO DA HERD
          </h1>
          <p className="font-luckiest-guy text-xl sm:text-2xl text-wood-brown mb-2 tracking-wider">
            GTD Applications are now open.
          </p>
          <p className="font-outfit font-bold text-dark-text text-base sm:text-lg mb-8 max-w-md mx-auto">
            Complete the farm duties to secure your spot in da herd.
          </p>

          <div className="flex justify-center">
            <WoodenButton onClick={handleJoin}>
              Check
            </WoodenButton>
          </div>
        </div>
      </div>

      {/* Characters Scene - Spread out across the bottom on mobile */}

      {/* Left Side: Black Cow Mascot */}
      <div className="absolute left-[-25px] sm:left-[8%] lg:left-[15%] bottom-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[360px] lg:h-[360px] z-10 pointer-events-none">
        <Image
          src="/assets/cow-black.png"
          alt="Mascot Cow Black"
          fill
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 360px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>

      {/* Right Side: Farmer and Dog */}
      {/* Farmer */}
      <div className="absolute right-[12%] sm:right-[15%] lg:right-[20%] bottom-0 w-[190px] h-[190px] sm:w-[240px] sm:h-[240px] lg:w-[380px] lg:h-[380px] z-10 pointer-events-none">
        <Image
          src="/assets/farmer-half.png"
          alt="Farmer"
          fill
          sizes="(max-width: 640px) 190px, (max-width: 1024px) 240px, 380px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>

      {/* Dog */}
      <div className="absolute right-[-15px] sm:right-[2%] lg:right-[10%] bottom-0 w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] lg:w-[230px] lg:h-[230px] z-10 pointer-events-none">
        <Image
          src="/assets/dog.png"
          alt="Dog"
          fill
          sizes="(max-width: 640px) 110px, (max-width: 1024px) 140px, 230px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>
    </section>
  );
}

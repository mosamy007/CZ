"use client";

import Image from "next/image";

export default function FarmDuties() {
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
            FARM DUTIES
          </h2>
        </div>

        {/* Center Wooden Signboard */}
        <div className="max-w-2xl w-full mx-auto p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-br from-[#7a4e2b] via-[#653e20] to-[#503118] border-8 border-[#3d2515] rounded-3xl shadow-[0_12px_0_#2b1a0e]">
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
            <h3
              className="font-luckiest-guy text-3xl sm:text-4xl text-[#FF9900] tracking-wider mb-6 text-center"
              style={{ textShadow: "3px 3px 0px #2E2E2E" }}
            >
              NOTICE
            </h3>
            
            <div className="px-6 py-8 rounded-2xl bg-paper-beige border-4 border-wood-brown shadow-lg w-full">
              <p className="font-luckiest-guy text-xl sm:text-2xl text-wood-brown tracking-wide leading-relaxed">
                all aplications has been recieved, wallet checker soon keep an eye on our X
              </p>
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
    </section>
  );
}

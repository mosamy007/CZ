"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Roadmap() {
  const phases = [
    {
      num: "01",
      title: "Rounding Up",
      desc: "Gathering the cows in the pasture. Launching our private channels, community building, and spreading word of the secret herd.",
    },
    {
      num: "02",
      title: "Branding",
      desc: "Mascot reveal, artwork teaser, and farmer collaborations. Fine-tuning our traits and revealing the cartoon farm theme.",
    },
    {
      num: "03",
      title: "Moving the Herd",
      desc: "Opening FCFS Applications on our landing page. Verifying farm duties and selecting the most dedicated members to join the whitelist.",
    },
    {
      num: "04",
      title: "Green Pastures",
      desc: "Official whitelist collection and herd onboarding. Secret pasture utilities, custom merchandise, and long-term farm development.",
    },
  ];

  return (
    <section
      id="roadmap"
      className="relative w-full py-24 bg-sky-blue flex flex-col items-center justify-start overflow-hidden px-4"
    >
      {/* Cow White mascot peaking from bottom-left */}
      <div className="absolute left-[-5%] bottom-[-5%] w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] pointer-events-none z-10 opacity-90">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-1, 2, -1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full origin-bottom-left"
        >
          <Image
            src="/assets/cow-white.png"
            alt="Mascot Cow White"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-luckiest-guy text-4xl sm:text-6xl text-wood-brown tracking-wider"
            style={{
              textShadow:
                "3px 3px 0px #F8F0D8, -2px -2px 0px #F8F0D8, 2px -2px 0px #F8F0D8, -2px 2px 0px #F8F0D8, 2px 2px 0px #F8F0D8",
            }}
          >
            ROADMAP TIMELINE
          </h2>
          <p className="font-outfit font-bold text-dark-text text-lg max-w-xl mx-auto mt-2">
            The herd moves together. Here is how we make our journey to the green pastures.
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl border-4 border-wood-brown shadow-xl bg-paper-beige overflow-hidden"
            >
              {/* Paper Card Background Image Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "url('/assets/paper-card.png.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="relative z-10 flex gap-4 items-start">
                {/* Number Badge */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl bg-wood-brown text-paper-beige flex items-center justify-center font-luckiest-guy text-2xl border-2 border-dark-text rotate-[-6deg]"
                  style={{ textShadow: "1px 1px 0px #2E2E2E" }}
                >
                  {phase.num}
                </div>

                <div>
                  <h3 className="font-luckiest-guy text-2xl text-wood-brown mb-2 tracking-wide">
                    {phase.title}
                  </h3>
                  <p className="font-outfit font-bold text-dark-text/90 text-sm sm:text-base leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

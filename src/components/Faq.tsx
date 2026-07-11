"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-4 border-wood-brown rounded-2xl overflow-hidden bg-paper-beige shadow-md">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between text-left font-luckiest-guy text-lg sm:text-xl text-wood-brown tracking-wide hover:bg-wood-brown/5 transition-colors focus:outline-none cursor-pointer"
      >
        <span>{question}</span>
        <div
          className={`flex-shrink-0 ml-4 text-wood-brown transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        >
          <ChevronDown className="w-6 h-6 stroke-[3]" />
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="p-5 pt-0 font-outfit font-bold text-dark-text/90 text-sm sm:text-base border-t-2 border-wood-brown/10 leading-relaxed bg-[#f5ebd0]/30">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is Cowz?",
      answer: "we are 10,000 unique Cowz trying to escape the huge farm. by disguising and blending in the community on the road to freedom!.",
    },
    {
      question: "How do I get Whitelisted?",
      answer: "Complete the farm duties and submit your wallet address.",
    },
    {
      question: "What chain are Cowz launching on?",
      answer: "We’re building on Ethereum, escaping to Opensea.",
    },
    {
      question: "Why it takes too long?",
      answer: "Our number 1 priority is the ART, once the art is finished 100% we will launch.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full pt-20 pb-44 sm:pb-52 lg:pb-48 bg-sky-blue flex flex-col items-center justify-start overflow-hidden px-4"
    >
      <div className="max-w-4xl w-full mx-auto relative z-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className="font-luckiest-guy text-4xl sm:text-6xl text-[#FF9900] tracking-wider"
            style={{ textShadow: "4px 4px 0px #8B5A2B" }}
          >
            FAQ
          </h2>
          <p className="font-outfit font-bold text-dark-text text-lg max-w-xl mx-auto mt-2">
            Got questions, partner? We got answers. Here is what you need to know about da herd.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>

      {/* Mascot: cow-white.png sitting at the bottom right */}
      <div className="absolute right-[0px] sm:right-[8%] bottom-0 w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[300px] lg:h-[300px] z-10 pointer-events-none">
        <Image
          src="/assets/cow-white.png"
          alt="White Cow"
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 300px"
          className="object-contain object-bottom pointer-events-none"
        />
      </div>
    </section>
  );
}

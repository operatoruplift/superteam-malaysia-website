"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/site";
import AnimatedSection from "./AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";

function FAQItem({
  faq,
  isOpen,
  toggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.03]">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[16px] font-medium pr-6 leading-snug">
          {faq.question}
        </span>
        <ChevronDown
          size={16}
          className={`text-gold-light shrink-0 transition-transform duration-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-[14px] text-text-secondary leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="section-divider mb-28 sm:mb-36" />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <AnimatedSection className="text-center mb-14" zoom>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-light mb-5">
            FAQ
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

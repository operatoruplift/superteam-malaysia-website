"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import STLogo from "./STLogo";
import DotGrid from "./DotGrid";
import TextReveal from "./TextReveal";
import { useTheme } from "./ThemeProvider";
import { useRef } from "react";

const roles = ["Founders", "Developers", "Designers", "Creators", "Builders"];

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves slower, foreground faster
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.6]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Petronas Towers background photo — parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/petronas.jpg"
          alt="Kuala Lumpur skyline"
          fill
          priority
          className="object-cover object-center scale-110"
          quality={85}
        />
      </motion.div>

      {/* Scroll-driven fade to black */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Dark overlays — lighter in light mode so towers are visible */}
      <div className={`absolute inset-0 ${isLight ? "bg-white/40" : "bg-black/60"}`} />
      <div className={`absolute inset-0 ${isLight
        ? "bg-gradient-to-t from-[#fafbfc] via-white/50 to-transparent"
        : "bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-transparent"
      }`} />
      <div className={`absolute inset-0 ${isLight
        ? "bg-gradient-to-b from-white/60 via-transparent to-[#fafbfc]"
        : "bg-gradient-to-b from-[#0f0f0f]/80 via-transparent to-[#0f0f0f]"
      }`} />

      {/* Subtle gold tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-transparent to-st-purple/[0.03]" />

      {/* Dot grid animation — full page overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <DotGrid color={isLight ? [196, 143, 0] : [232, 168, 0]} secondaryColor={[140, 120, 200]} />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 bg-noise" />

      {/* Decorative top line - gold */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent z-[5]" />

      {/* Bottom fade to page background */}
      <div className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t ${isLight ? "from-[#fafbfc]" : "from-[#0f0f0f]"} to-transparent z-[3]`} />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 text-center pt-20 sm:pt-24 pb-20 sm:pb-32"
      >
        {/* Logo — ST Malaysia mark with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <STLogo
              size={80}
              className={isLight
                ? "drop-shadow-[0_0_40px_rgba(232,168,0,0.3)]"
                : "drop-shadow-[0_0_60px_rgba(232,168,0,0.15)]"
              }
            />
            {/* Subtle ambient glow behind logo */}
            <div className={`absolute -inset-6 rounded-full ${isLight
              ? "bg-white/60 blur-xl"
              : "bg-gold/[0.06] blur-2xl"
            } -z-10`} />
          </div>
        </motion.div>

        {/* Badge — Solana logo + "Solana · Malaysia" in bubble, "Live Chapter" with gold dot */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full border backdrop-blur-sm ${isLight
            ? "border-gold/25 bg-white/70"
            : "border-gold/20 bg-black/40"
          }`}>
            {/* Solana logo */}
            <svg width="14" height="14" viewBox="0 0 397.7 311.7" fill="none" className="shrink-0">
              <linearGradient id="sol-a" x1="360.879" x2="141.213" y1="351.455" y2="-69.294" gradientTransform="matrix(1 0 0 -1 0 314)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00FFA3" />
                <stop offset="1" stopColor="#DC1FFF" />
              </linearGradient>
              <path fill="url(#sol-a)" d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
              <path fill="url(#sol-a)" d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
              <path fill="url(#sol-a)" d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
            </svg>
            <span className={`text-[13px] font-medium tracking-wide ${isLight ? "text-[#996f00]" : "text-gold-light"}`}>
              Solana &middot; Malaysia
            </span>
          </div>
          <span className={`inline-flex items-center gap-2 text-[13px] font-medium tracking-wide ${isLight ? "text-[#4a4a5a]" : "text-gray-300"}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold shadow-[0_0_8px_rgba(232,168,0,0.6)]" />
            </span>
            Live Chapter
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(2.8rem,8vw,7rem)] font-extrabold tracking-[-0.03em] leading-[0.92]"
        >
          <span className={`block ${isLight ? "text-[#1a1a2e]" : "text-white"} drop-shadow-[0_2px_20px_rgba(0,0,0,0.15)]`}>
            Building the Solana
          </span>
          <span className="block gradient-text-gold text-glow-gold mt-1">
            Ecosystem in Malaysia
          </span>
        </motion.h1>

        {/* Subtitle with typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`mt-8 text-[clamp(1rem,2.5vw,1.25rem)] max-w-2xl mx-auto leading-relaxed font-light ${isLight ? "text-[#4a4a5a]" : "text-gray-300 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"}`}
        >
          <TextReveal words={roles} className="gradient-text-gold font-semibold" interval={2500} />
          {" "}unite to build the future of Web3 in Malaysia. Join the movement.
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="https://t.me/SuperteamMY"
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-gold inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-[14px] sm:text-[15px]"
          >
            Join Community
            <ArrowRight
              size={17}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
          <a
            href="https://earn.superteam.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 font-medium text-[14px] sm:text-[15px] backdrop-blur-sm"
          >
            Explore Opportunities
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 sm:mt-20 flex flex-col items-center gap-3"
        >
          <span className={`text-[11px] uppercase tracking-[0.2em] font-medium ${isLight ? "text-[#8a8a9a]" : "text-gray-400"}`}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
            className="w-5 h-8 rounded-full border border-gold/20 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-gold/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

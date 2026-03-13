"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import STLogo from "./STLogo";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9998] bg-[#0f0f0f] flex flex-col items-center justify-center"
        >
          {/* Ambient glow */}
          <div className="absolute w-[300px] h-[300px] bg-gold/[0.06] blur-[120px] rounded-full" />

          {/* Logo with pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <STLogo size={72} className="drop-shadow-[0_0_40px_rgba(232,168,0,0.3)]" />
          </motion.div>

          {/* Loading bar */}
          <div className="mt-8 w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted"
          >
            Superteam Malaysia
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

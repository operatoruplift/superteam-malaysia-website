"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import STLogo from "./STLogo";

const SCROLL_OFFSET = 100; // extra pixels to scroll past the section top

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Mission", href: "#mission" },
  { label: "Events", href: "#events" },
  { label: "Members", href: "#members" },
  { label: "Directory", href: "/members" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72 + SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-[0_1px_0_rgba(232,168,0,0.06)]"
          : "bg-transparent"
      } light-nav`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo — single ST Malaysia mark */}
          <Link href="/" className="shrink-0">
            <STLogo size={44} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative px-4 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-white/[0.03]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2.5 rounded-full border border-gold/15 hover:border-gold/30 text-text-muted hover:text-gold-light transition-all duration-300 hover:bg-gold/[0.04]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="https://earn.superteam.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-st-outline text-[13px] font-medium px-5 py-2"
            >
              Earn
            </a>
            <a
              href="https://t.me/SuperteamMY"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-[13px] px-5 py-2"
            >
              Join Community
            </a>
          </div>

          {/* Mobile: theme toggle + menu */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 text-text-muted hover:text-gold-light transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="px-5 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block text-[15px] text-text-secondary hover:text-text-primary py-3 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border space-y-2.5">
                <a
                  href="https://earn.superteam.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[14px] text-center btn-st-outline px-5 py-2.5"
                >
                  Earn
                </a>
                <a
                  href="https://t.me/SuperteamMY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[14px] text-center btn-gold px-5 py-2.5"
                >
                  Join Community
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

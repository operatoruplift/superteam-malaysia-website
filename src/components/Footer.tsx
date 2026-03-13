"use client";

import Link from "next/link";
import STLogo from "./STLogo";
import KLSkylineDots from "./KLSkylineDots";

const footerLinks = {
  Navigate: [
    { label: "Mission", href: "#mission" },
    { label: "Events", href: "#events" },
    { label: "Members", href: "#members" },
    { label: "Projects", href: "#projects" },
    { label: "Directory", href: "/members" },
  ],
  Opportunities: [
    { label: "Bounties", href: "https://earn.superteam.fun", external: true },
    { label: "Hackathons", href: "https://earn.superteam.fun", external: true },
    { label: "Grants", href: "https://earn.superteam.fun", external: true },
    { label: "Jobs", href: "https://earn.superteam.fun", external: true },
    { label: "Workshops", href: "https://lu.ma/mysuperteam", external: true },
  ],
  Connect: [
    { label: "Twitter / X", href: "https://x.com/SuperteamMY", external: true },
    { label: "Telegram", href: "https://t.me/SuperteamMY", external: true },
    { label: "Discord", href: "https://discord.gg/superteam", external: true },
    { label: "Superteam Global", href: "https://superteam.fun", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-secondary/50 overflow-hidden">
      {/* KL skyline dot grid art background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[200%] sm:h-full opacity-40 sm:opacity-30">
          <KLSkylineDots />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo & description */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <STLogo size={52} />
            </div>
            <p className="text-[13px] text-text-secondary leading-relaxed max-w-xs">
              Malaysia&apos;s home for Solana builders, creators, and founders.
              Part of the global Superteam network.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://x.com/SuperteamMY"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-border flex items-center justify-center text-text-muted hover:text-gold-light hover:border-gold/20 transition-all"
                aria-label="X / Twitter"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me/SuperteamMY"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-border flex items-center justify-center text-text-muted hover:text-gold-light hover:border-gold/20 transition-all"
                aria-label="Telegram"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://discord.gg/superteam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-border flex items-center justify-center text-text-muted hover:text-gold-light hover:border-gold/20 transition-all"
                aria-label="Discord"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-text-muted">
            &copy; {new Date().getFullYear()} Superteam Malaysia &middot; Built
            on Solana
          </p>
          <p className="text-[12px] text-text-muted">
            Part of{" "}
            <a
              href="https://superteam.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-gold-light transition-colors duration-200"
            >
              Superteam Global
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

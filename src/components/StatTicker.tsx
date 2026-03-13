"use client";

import { useEffect, useState } from "react";

type Stat = { label: string; value: string };

const fallbackStats: Stat[] = [
  { label: "SOL Price", value: "$183.42" },
  { label: "Active Members", value: "37" },
  { label: "Ecosystem GDP", value: "$90K+" },
  { label: "Projects Shipped", value: "10" },
  { label: "Solana TPS", value: "4,102" },
];

export default function StatTicker() {
  const [stats, setStats] = useState<Stat[]>(fallbackStats);

  useEffect(() => {
    // Fetch live SOL price
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      .then((r) => r.json())
      .then((data) => {
        if (data?.solana?.usd) {
          setStats((prev) =>
            prev.map((s) =>
              s.label === "SOL Price"
                ? { ...s, value: `$${data.solana.usd.toFixed(2)}` }
                : s
            )
          );
        }
      })
      .catch(() => {});
  }, []);

  // Triple for seamless loop
  const tripled = [...stats, ...stats, ...stats];

  return (
    <div className="stat-ticker fixed top-0 left-0 right-0 z-[200] overflow-hidden"
      style={{ background: "rgba(15,15,15,0.95)", borderBottom: "1px solid rgba(232,168,0,0.08)", height: "32px" }}
    >
      <div className="flex animate-ticker whitespace-nowrap h-full items-center">
        {tripled.map((stat, i) => (
          <span key={`${stat.label}-${i}`} className="inline-flex items-center gap-2 px-6 text-[11px] shrink-0">
            <span style={{ color: "#94949e" }}>{stat.label}</span>
            <span style={{ color: "#ffc940", fontWeight: 500 }}>{stat.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

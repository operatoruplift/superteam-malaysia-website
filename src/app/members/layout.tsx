import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members Directory",
  description:
    "Browse 37+ builders, developers, designers, and founders powering the Solana ecosystem in Malaysia. Filter by skills, lanes, and rarity.",
  openGraph: {
    title: "Members Directory | Superteam Malaysia",
    description:
      "Browse 37+ builders powering the Solana ecosystem in Malaysia.",
  },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

"use client";

import { motion } from "framer-motion";

export default function KLSkyline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.6 }}
      className="relative select-none pointer-events-none w-full"
    >
      <svg
        viewBox="0 0 1200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="skylineGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffc940" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#e8a800" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e8a800" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="skylineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8a800" stopOpacity="0" />
            <stop offset="20%" stopColor="#e8a800" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ffc940" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#e8a800" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#e8a800" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="towerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffc940" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e8a800" stopOpacity="0.05" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Ambient glow behind towers */}
        <ellipse cx="600" cy="200" rx="200" ry="120" fill="#e8a800" opacity="0.04" filter="url(#softGlow)" />

        {/* Far background buildings - left */}
        <rect x="80" y="200" width="30" height="80" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="120" y="185" width="25" height="95" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="155" y="195" width="35" height="85" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="200" y="170" width="28" height="110" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="240" y="180" width="22" height="100" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="275" y="190" width="30" height="90" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />

        {/* KL Tower (Menara KL) */}
        <rect x="340" y="120" width="12" height="160" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <ellipse cx="346" cy="120" rx="20" ry="12" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <line x1="346" y1="108" x2="346" y2="70" stroke="#ffc940" strokeWidth="1" opacity="0.2" />
        <circle cx="346" cy="68" r="2" fill="#ffc940" opacity="0.3" />

        {/* Mid buildings */}
        <rect x="390" y="165" width="24" height="115" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="425" y="175" width="30" height="105" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="465" y="155" width="20" height="125" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />

        {/* Left Petronas Tower */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <path d="M510 280 L510 90 L515 60 L520 45 L525 38 L530 45 L535 60 L540 90 L540 280 Z" fill="url(#towerGlow)" stroke="url(#skylineStroke)" strokeWidth="0.8" />
          <line x1="525" y1="38" x2="525" y2="15" stroke="#ffc940" strokeWidth="1.2" opacity="0.35" />
          <circle cx="525" cy="13" r="2" fill="#ffc940" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          {[100, 120, 140, 160, 180, 200, 220, 240, 260].map((y) => (
            <line key={`lt-${y}`} x1="512" y1={y} x2="538" y2={y} stroke="#ffc940" strokeWidth="0.3" opacity="0.1" />
          ))}
          {[110, 130, 150, 170, 190, 210, 230, 250].map((y) => (
            <rect key={`lw-${y}`} x="520" y={y} width="6" height="3" fill="#ffc940" opacity="0.08" rx="0.5" />
          ))}
        </motion.g>

        {/* Skybridge */}
        <motion.path
          d="M540 160 C560 155, 590 155, 610 160"
          stroke="#ffc940"
          strokeWidth="1.5"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
        <motion.rect
          x="555" y="155" width="40" height="10" rx="2"
          fill="url(#skylineGold)" stroke="#ffc940" strokeWidth="0.5" opacity="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 2 }}
        />

        {/* Right Petronas Tower */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          <path d="M610 280 L610 90 L615 60 L620 45 L625 38 L630 45 L635 60 L640 90 L640 280 Z" fill="url(#towerGlow)" stroke="url(#skylineStroke)" strokeWidth="0.8" />
          <line x1="625" y1="38" x2="625" y2="15" stroke="#ffc940" strokeWidth="1.2" opacity="0.35" />
          <circle cx="625" cy="13" r="2" fill="#ffc940" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          {[100, 120, 140, 160, 180, 200, 220, 240, 260].map((y) => (
            <line key={`rt-${y}`} x1="612" y1={y} x2="638" y2={y} stroke="#ffc940" strokeWidth="0.3" opacity="0.1" />
          ))}
          {[110, 130, 150, 170, 190, 210, 230, 250].map((y) => (
            <rect key={`rw-${y}`} x="622" y={y} width="6" height="3" fill="#ffc940" opacity="0.08" rx="0.5" />
          ))}
        </motion.g>

        {/* Buildings right side */}
        <rect x="670" y="165" width="22" height="115" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="700" y="175" width="32" height="105" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="745" y="190" width="25" height="90" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="780" y="165" width="28" height="115" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />

        {/* Merdeka 118 */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3 }}
        >
          <path d="M860 280 L865 80 L870 50 L875 40 L880 50 L885 80 L890 280 Z" fill="url(#towerGlow)" stroke="url(#skylineStroke)" strokeWidth="0.6" />
          <line x1="875" y1="40" x2="875" y2="20" stroke="#ffc940" strokeWidth="0.8" opacity="0.25" />
          {[90, 120, 150, 180, 210, 240].map((y) => (
            <line key={`mk-${y}`} x1="867" y1={y} x2="883" y2={y} stroke="#ffc940" strokeWidth="0.3" opacity="0.08" />
          ))}
        </motion.g>

        {/* Far right buildings */}
        <rect x="920" y="195" width="30" height="85" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="960" y="210" width="25" height="70" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="1000" y="200" width="35" height="80" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="1050" y="215" width="28" height="65" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />
        <rect x="1090" y="205" width="30" height="75" fill="url(#skylineGold)" stroke="url(#skylineStroke)" strokeWidth="0.5" />

        {/* Ground line */}
        <line x1="0" y1="279" x2="1200" y2="279" stroke="url(#skylineStroke)" strokeWidth="1" />

        {/* Stars */}
        {[
          [150, 50], [300, 30], [450, 60], [700, 25], [850, 55], [1050, 40], [200, 80], [550, 20], [750, 70], [950, 35],
          [100, 35], [400, 45], [580, 65], [680, 40], [820, 30], [1000, 55], [1100, 45],
        ].map(([cx, cy], i) => (
          <circle key={`star-${i}`} cx={cx} cy={cy} r="0.8" fill="#ffc940" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.1;0.35;0.1"
              dur={`${2 + (i % 3)}s`}
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Gradient fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg to-transparent" />
    </motion.div>
  );
}

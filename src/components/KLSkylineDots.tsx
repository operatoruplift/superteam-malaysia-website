// KL Skyline dot grid art — Petronas Towers, KL Tower, and surrounding buildings
// Grid: 120 cols × 60 rows, rendered as SVG dots

// Skyline profile: each column's max height (from bottom, row 59 = ground)
// Heights represent how many rows up from the bottom are filled
const skylineProfile: number[] = (() => {
  const h = new Array(120).fill(0);

  // --- Small buildings left ---
  for (let c = 3; c <= 6; c++) h[c] = 10;
  for (let c = 8; c <= 11; c++) h[c] = 14;
  for (let c = 10; c <= 12; c++) h[c] = 16;
  for (let c = 14; c <= 17; c++) h[c] = 12;
  for (let c = 19; c <= 22; c++) h[c] = 18;
  for (let c = 21; c <= 23; c++) h[c] = 20;
  for (let c = 25; c <= 27; c++) h[c] = 14;
  for (let c = 29; c <= 31; c++) h[c] = 10;

  // --- Left Petronas Tower (cols 35-46) ---
  // Base wider, tapers to top
  for (let c = 34; c <= 47; c++) h[c] = 30; // base
  for (let c = 35; c <= 46; c++) h[c] = 38;
  for (let c = 36; c <= 45; c++) h[c] = 42;
  for (let c = 37; c <= 44; c++) h[c] = 45;
  for (let c = 38; c <= 43; c++) h[c] = 48;
  for (let c = 39; c <= 42; c++) h[c] = 50;
  for (let c = 40; c <= 41; c++) h[c] = 53;
  h[40] = 55; h[41] = 55; // spire tip

  // --- Skybridge (cols 48-53) ---
  for (let c = 48; c <= 53; c++) h[c] = 26;

  // --- Right Petronas Tower (cols 54-67) ---
  for (let c = 54; c <= 67; c++) h[c] = 30;
  for (let c = 55; c <= 66; c++) h[c] = 38;
  for (let c = 56; c <= 65; c++) h[c] = 42;
  for (let c = 57; c <= 64; c++) h[c] = 45;
  for (let c = 58; c <= 63; c++) h[c] = 48;
  for (let c = 59; c <= 62; c++) h[c] = 50;
  for (let c = 60; c <= 61; c++) h[c] = 53;
  h[60] = 55; h[61] = 55; // spire tip

  // --- Medium buildings between towers and KL Tower ---
  for (let c = 70; c <= 73; c++) h[c] = 16;
  for (let c = 72; c <= 74; c++) h[c] = 20;

  // --- KL Tower (cols 77-81, thin with sphere and spire) ---
  for (let c = 77; c <= 83; c++) h[c] = 22; // base structure
  for (let c = 78; c <= 82; c++) h[c] = 30;
  for (let c = 79; c <= 81; c++) h[c] = 38;
  // Observation deck / pod (wider)
  for (let c = 77; c <= 83; c++) h[c] = Math.max(h[c], 34);
  for (let c = 78; c <= 82; c++) h[c] = Math.max(h[c], 36);
  // Spire
  h[80] = 48;
  h[79] = 42; h[81] = 42;

  // --- Buildings right of KL Tower ---
  for (let c = 86; c <= 89; c++) h[c] = 14;
  for (let c = 88; c <= 91; c++) h[c] = 18;
  for (let c = 93; c <= 96; c++) h[c] = 12;
  for (let c = 95; c <= 97; c++) h[c] = 10;
  for (let c = 99; c <= 102; c++) h[c] = 15;
  for (let c = 104; c <= 107; c++) h[c] = 8;
  for (let c = 109; c <= 111; c++) h[c] = 6;

  // Ground level — thin strip
  for (let c = 0; c <= 119; c++) h[c] = Math.max(h[c], 2);

  return h;
})();

// Generate dots from the profile
const klDots: [number, number][] = (() => {
  const dots: [number, number][] = [];
  const ROWS = 60;
  for (let c = 0; c < 120; c++) {
    const height = skylineProfile[c];
    for (let h = 0; h < height; h++) {
      const row = ROWS - 1 - h; // bottom-up
      dots.push([c, row]);
    }
  }
  return dots;
})();

export default function KLSkylineDots() {
  return (
    <svg
      viewBox="0 0 120 60"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
    >
      {klDots.map(([x, y], i) => (
        <circle
          key={i}
          cx={x + 0.5}
          cy={y + 0.5}
          r="0.2"
          fill="#e8a800"
          opacity={y < 15 ? 0.4 : y < 30 ? 0.25 : 0.15}
        />
      ))}
    </svg>
  );
}

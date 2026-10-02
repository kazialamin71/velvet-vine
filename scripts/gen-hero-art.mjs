/**
 * Generates the three hero-slider illustrations in design/hero-slides/.
 * Composition rule: detail is weighted to the right half of the 16:9 frame so the
 * hero headline (which sits left, under the darkest part of the scrim) stays clean.
 *
 *   node scripts/gen-hero-art.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const INK = "#15150f";
const INK2 = "#1f1f18";
const CREAM = "#f2ede3";
const GOLD = "#a98c4b";
const GREEN = "#2f4a3a";
const OUT = "design/hero-slides";

const head = (label, gx, gy) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" role="img" aria-label="${label}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${INK}"/><stop offset="1" stop-color="${INK2}"/>
</linearGradient>
<radialGradient id="glow" cx="${gx}" cy="${gy}" r="0.52">
<stop offset="0" stop-color="${GREEN}" stop-opacity="0.60"/>
<stop offset="0.55" stop-color="${GREEN}" stop-opacity="0.18"/>
<stop offset="1" stop-color="${GREEN}" stop-opacity="0"/>
</radialGradient>
<radialGradient id="warm" cx="${gx}" cy="${gy}" r="0.34">
<stop offset="0" stop-color="${GOLD}" stop-opacity="0.22"/>
<stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
</radialGradient>
<pattern id="hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
<line x1="0" y1="0" x2="0" y2="16" stroke="${CREAM}" stroke-opacity="0.045" stroke-width="1"/>
</pattern>
</defs>
<rect width="1920" height="1080" fill="url(#bg)"/>
<rect width="1920" height="1080" fill="url(#hatch)"/>
<rect width="1920" height="1080" fill="url(#glow)"/>
<rect width="1920" height="1080" fill="url(#warm)"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
`;

const FOOT = `</g>
</svg>
`;

/** Strokes are read through the hero scrim, so they are drawn well above their nominal weight. */
const K = 1.85;
const op = (o) => +Math.min(1, o * K).toFixed(3);

const r1 = (n) => Math.round(n);

const ln = (x1, y1, x2, y2, c = CREAM, o = 0.3, w = 2) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${c}" stroke-opacity="${op(o)}" stroke-width="${w}"/>\n`;

const rect = (x, y, w, h, c = CREAM, o = 0.3, sw = 2, rx = 0, fill = null, fo = 0) =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill ?? "none"}"${fill ? ` fill-opacity="${op(fo)}"` : ""} stroke="${c}" stroke-opacity="${op(o)}" stroke-width="${sw}"/>\n`;

const circ = (cx, cy, rr, c = CREAM, o = 0.3, sw = 2, fill = null, fo = 0) =>
  `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(rr)}" fill="${fill ?? "none"}"${fill ? ` fill-opacity="${op(fo)}"` : ""} stroke="${c}" stroke-opacity="${op(o)}" stroke-width="${sw}"/>\n`;

const ellip = (cx, cy, rx, ry, c = CREAM, o = 0.3, sw = 2) =>
  `<ellipse cx="${r1(cx)}" cy="${r1(cy)}" rx="${rx}" ry="${ry}" fill="none" stroke="${c}" stroke-opacity="${op(o)}" stroke-width="${sw}"/>\n`;

const path = (d, c = CREAM, o = 0.3, sw = 2, dash = null, fill = null, fo = 0) =>
  `<path d="${d}" fill="${fill ?? "none"}"${fill ? ` fill-opacity="${op(fo)}"` : ""} stroke="${c}" stroke-opacity="${op(o)}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>\n`;

mkdirSync(OUT, { recursive: true });

const write = (name, body, label, gx = "0.70", gy = "0.46") => {
  const svg = head(label, gx, gy) + body + FOOT;
  writeFileSync(join(OUT, name), svg, "utf8");
  console.log(`${join(OUT, name)}  ${(svg.length / 1024).toFixed(1)} KB`);
};

/* ───────────────────────────  1. Fabric sourcing  ─────────────────────────── */
{
  let s = ln(0, 975, 1920, 975, CREAM, 0.16, 2);
  for (const x of [905, 1372, 1840]) s += ln(x, 205, x, 975, CREAM, 0.22, 3);
  for (const y of [205, 385, 565, 745, 925]) s += ln(905, y, 1840, y, CREAM, 0.22, 3);

  [385, 565, 745, 925].forEach((shelfY, row) => {
    const cy = shelfY - 90;
    for (let col = 0; col < 8; col++) {
      const cx = 975 + col * 120;
      const accent = (row + col) % 5 === 0;
      const c = accent ? GOLD : CREAM;
      const o = accent ? 0.55 : 0.26;
      s += circ(cx, cy, 57, c, o, 2);
      s += circ(cx, cy, 34, c, +(o * 0.75).toFixed(3), 1.5);
      s += circ(cx, cy, 11, c, +(o * 0.9).toFixed(3), 1.5, c, +(o * 0.5).toFixed(3));
      const ang = -0.6 + 0.25 * ((row * 3 + col) % 7);
      s += path(
        `M ${r1(cx + 57 * Math.cos(ang))} ${r1(cy + 57 * Math.sin(ang))} a 57 57 0 0 1 -18 26`,
        c,
        +(o * 0.8).toFixed(3),
        2
      );
    }
  });

  for (const [bx, lean] of [[700, -13], [772, -8], [846, -17]]) {
    s += `<g transform="rotate(${lean} ${bx} 975)">\n`;
    s += rect(bx - 30, 455, 60, 520, CREAM, 0.24, 2, 28);
    s += ellip(bx, 457, 30, 12, GOLD, 0.42);
    s += ln(bx - 30, 560, bx + 30, 560, CREAM, 0.14, 1.5);
    s += ln(bx - 30, 700, bx + 30, 700, CREAM, 0.14, 1.5);
    s += `</g>\n`;
  }

  s += path("M 560 975 C 760 930 980 1010 1240 962 C 1460 922 1660 980 1900 948", GOLD, 0.38, 2.5);
  s += path("M 560 1002 C 760 957 980 1037 1240 989 C 1460 949 1660 1007 1900 975", CREAM, 0.18, 2);

  write(
    "velvet-vine-hero-sourcing.svg",
    s,
    "Illustration of a fabric store with rolls of cloth on warehouse shelving"
  );
}

/* ───────────────────────────  2. Sampling and sewing  ─────────────────────── */
{
  let s = ln(0, 905, 1920, 905, CREAM, 0.16, 2);
  s += ln(1010, 905, 1010, 1080, CREAM, 0.14, 2);
  s += ln(1760, 905, 1760, 1080, CREAM, 0.14, 2);

  s += rect(1065, 835, 690, 70, CREAM, 0.34, 3, 14);
  s += rect(1600, 420, 150, 415, CREAM, 0.34, 3, 10);
  s += rect(1185, 420, 565, 95, CREAM, 0.34, 3, 12);
  s += rect(1150, 420, 108, 190, CREAM, 0.34, 3, 10);
  s += ln(1204, 610, 1204, 712, CREAM, 0.4, 3);
  s += path("M 1204 712 l 0 44", GOLD, 0.75, 3);
  s += path("M 1176 712 l 56 0 l 0 22 l -56 0 z", CREAM, 0.34, 2);

  s += circ(1676, 560, 58, CREAM, 0.34, 3);
  s += circ(1676, 560, 22, GOLD, 0.45, 2);
  for (let a = 0; a < 360; a += 45) {
    const t = (a * Math.PI) / 180;
    s += ln(1676 + 24 * Math.cos(t), 560 + 24 * Math.sin(t), 1676 + 56 * Math.cos(t), 560 + 56 * Math.sin(t), CREAM, 0.18, 1.5);
  }

  s += ellip(1498, 352, 26, 10, GOLD, 0.55);
  s += rect(1472, 352, 52, 68, GOLD, 0.45, 2);
  s += ellip(1498, 420, 26, 10, GOLD, 0.55);
  s += path("M 1498 356 C 1430 300 1300 316 1250 392 C 1222 436 1210 540 1204 610", GOLD, 0.6, 2);

  s += path("M 905 862 C 1010 820 1090 842 1176 818 L 1232 818 C 1330 844 1420 806 1520 826", CREAM, 0.3, 2.5);
  s += path("M 905 806 C 1010 764 1090 786 1176 762 L 1232 762 C 1330 788 1420 750 1520 770", CREAM, 0.16, 2);
  s += path("M 920 836 C 1020 794 1096 816 1180 792", GOLD, 0.55, 2, "10 12");

  for (const cx of [880, 965]) {
    s += path(`M ${cx - 34} 905 L ${cx - 13} 775 L ${cx + 13} 775 L ${cx + 34} 905 Z`, CREAM, 0.24, 2);
    s += ellip(cx, 775, 13, 6, GOLD, 0.45);
  }

  s += `<g transform="rotate(-4 1420 220)">\n`;
  s += rect(1320, 120, 200, 200, CREAM, 0.2, 2, 4);
  [162, 190, 218, 246, 274].forEach((y, i) => {
    s += ln(1344, y, 1344 + (i % 2 ? 140 : 96), y, CREAM, 0.14, 2);
  });
  s += `</g>\n`;

  write(
    "velvet-vine-hero-sampling.svg",
    s,
    "Illustration of an industrial sewing machine stitching a sample garment",
    "0.72",
    "0.52"
  );
}

/* ───────────────────────────  3. Inspection and export  ───────────────────── */
{
  let s = ln(0, 880, 1920, 880, CREAM, 0.16, 2);
  s += ln(1020, 880, 1020, 1080, CREAM, 0.14, 2);
  s += ln(1820, 880, 1820, 1080, CREAM, 0.14, 2);

  const HX = 1230;
  const HY = 300;
  s += circ(HX, HY - 40, 16, CREAM, 0.34, 3);
  s += path(`M ${HX} ${HY - 24} L ${HX} ${HY + 6}`, CREAM, 0.34, 3);
  s += path(`M ${HX - 132} ${HY + 62} L ${HX} ${HY + 6} L ${HX + 132} ${HY + 62}`, CREAM, 0.34, 3);
  s += path(`M ${HX - 132} ${HY + 62} L ${HX + 132} ${HY + 62}`, CREAM, 0.22, 2);
  s += path(
    `M ${HX - 30} ${HY + 64} L ${HX - 150} ${HY + 112} L ${HX - 196} ${HY + 300} ` +
      `L ${HX - 124} ${HY + 322} L ${HX - 112} ${HY + 248} L ${HX - 112} ${HY + 500} ` +
      `L ${HX + 112} ${HY + 500} L ${HX + 112} ${HY + 248} L ${HX + 124} ${HY + 322} ` +
      `L ${HX + 196} ${HY + 300} L ${HX + 150} ${HY + 112} L ${HX + 30} ${HY + 64} ` +
      `L ${HX} ${HY + 104} Z`,
    CREAM,
    0.38,
    3,
    null,
    CREAM,
    0.035
  );
  s += path(`M ${HX - 30} ${HY + 64} L ${HX} ${HY + 104} L ${HX + 30} ${HY + 64}`, GOLD, 0.5, 2.5);
  s += ln(HX, HY + 120, HX, HY + 500, CREAM, 0.18, 2);
  for (const by of [168, 232, 296, 360, 424]) s += circ(HX, HY + by, 6, GOLD, 0.55, 2);

  s += `<g transform="rotate(-6 1000 760)">\n`;
  s += rect(900, 620, 200, 260, CREAM, 0.22, 2.5, 6);
  s += rect(960, 604, 80, 30, CREAM, 0.3, 2.5, 6);
  [686, 742, 798].forEach((y) => {
    s += path(`M 934 ${y} l 16 18 l 30 -34`, GOLD, 0.65, 3);
    s += ln(998, y + 6, 1072, y + 6, CREAM, 0.16, 2);
  });
  s += `</g>\n`;

  s += path("M 820 880 C 980 836 1120 902 1300 868", GOLD, 0.35, 2, "4 14");

  const carton = (x, y, w, h, d, o = 0.26) => {
    let c = rect(x, y, w, h, CREAM, o, 2.5);
    c += path(`M ${x} ${y} l ${d} ${-d} l ${w} 0 l ${-d} ${d} Z`, CREAM, +(o * 0.8).toFixed(3), 2);
    c += path(`M ${x + w} ${y} l ${d} ${-d} l 0 ${h} l ${-d} ${d} Z`, CREAM, +(o * 0.6).toFixed(3), 2);
    c += ln(x + w / 2, y, x + w / 2, y + h, CREAM, +(o * 0.5).toFixed(3), 2);
    c += rect(x + 22, y + h / 2 - 22, w - 44, 44, GOLD, 0.4, 2);
    return c;
  };
  s += carton(1540, 700, 230, 180, 42);
  s += carton(1560, 520, 190, 180, 36, 0.2);
  s += carton(1300, 760, 170, 120, 32, 0.16);

  s += rect(1480, 250, 400, 240, CREAM, 0.12, 2.5, 6);
  for (let x = 1512; x < 1870; x += 36) s += ln(x, 262, x, 478, CREAM, 0.07, 2);

  write(
    "velvet-vine-hero-inspection.svg",
    s,
    "Illustration of a finished garment on an inspection rail beside checked export cartons",
    "0.66",
    "0.42"
  );
}

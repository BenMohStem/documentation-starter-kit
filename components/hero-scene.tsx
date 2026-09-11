const MOON = { x: 930, y: 250, r: 56 };

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) >>> 0;
    return s / 4294967296;
  };
}

type Star = { x: number; y: number; r: number; o: number; t: boolean; d: number };

function genStars(): Star[] {
  const rnd = lcg(97);
  const stars: Star[] = [];
  for (let i = 0; i < 130; i++) {
    const x = rnd() * 1600;
    const y = rnd() * 470;
    const dx = x - MOON.x;
    const dy = y - MOON.y;
    const nearMoon = Math.sqrt(dx * dx + dy * dy) < MOON.r + 90;
    if (nearMoon) continue;
    stars.push({
      x,
      y,
      r: 0.5 + rnd() * 1.3,
      o: 0.14 + rnd() * 0.62,
      t: i % 11 === 0,
      d: rnd() * 6,
    });
  }
  return stars;
}

type Tree = { x: number; y: number; s: number; w: number; k: number };

function genCluster(
  rnd: () => number,
  cx: number,
  spread: number,
  baseY: number,
  yJit: number,
  sMin: number,
  sMax: number,
  count: number
): Tree[] {
  const trees: Tree[] = [];
  for (let i = 0; i < count; i++) {
    const x = cx + (rnd() * 2 - 1) * spread;
    const s = sMin + rnd() * (sMax - sMin);
    trees.push({
      x,
      y: baseY + (rnd() * 2 - 1) * yJit,
      s,
      w: 0.85 + rnd() * 0.3,
      k: (rnd() * 2 - 1) * 2.2,
    });
  }
  trees.sort((a, b) => a.s - b.s);
  return trees;
}

function genTrees() {
  const far = genCluster(lcg(31), 800, 720, 592, 22, 0.28, 0.5, 26);
  const mid = genCluster(lcg(57), 800, 740, 622, 18, 0.45, 0.8, 22);
  const leftNear = genCluster(lcg(13), 235, 260, 762, 34, 0.85, 1.75, 17);
  const rightNear = genCluster(lcg(73), 1352, 252, 758, 38, 0.85, 1.85, 18);
  const fgLeft = genCluster(lcg(91), 70, 130, 905, 30, 1.9, 2.5, 4);
  const fgRight = genCluster(lcg(41), 1548, 110, 900, 36, 1.9, 2.6, 4);
  return { far, mid, leftNear, rightNear, fgLeft, fgRight };
}

const stars = genStars();
const trees = genTrees();

function Pines({ list, fill }: { list: Tree[]; fill: string }) {
  return (
    <g fill={fill}>
      {list.map((t, i) => (
        <use
          key={i}
          href="#wwa-pine"
          transform={`translate(${t.x.toFixed(1)},${t.y.toFixed(1)}) scale(${t.s.toFixed(2)},${(t.s * t.w).toFixed(2)}) rotate(${t.k.toFixed(1)})`}
        />
      ))}
    </g>
  );
}

export default function HeroScene() {
  return (
    <svg
      className="wwa-hero-svg"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A quiet moonlit valley: forested ridges around a still lake, a single warm light deep in the trees"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080f0d" />
          <stop offset="30%" stopColor="#0c1714" />
          <stop offset="55%" stopColor="#112019" />
          <stop offset="78%" stopColor="#16291f" />
          <stop offset="100%" stopColor="#1d3326" />
        </linearGradient>
        <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9e4cf" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#d8d2ba" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#c9c4ae" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#c9c4ae" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="moonBody" cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#f2edda" />
          <stop offset="65%" stopColor="#ddd8c2" />
          <stop offset="100%" stopColor="#c7c2ab" />
        </radialGradient>
        <radialGradient id="moonSkyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dcd6bd" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#dcd6bd" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#dcd6bd" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#132520" />
          <stop offset="45%" stopColor="#0d1a16" />
          <stop offset="100%" stopColor="#080f0c" />
        </linearGradient>
        <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="72%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#020403" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb45c" stopOpacity="0.85" />
          <stop offset="30%" stopColor="#e8963f" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e8963f" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="soft2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0.5 0" />
        </filter>
        <filter id="cloudNoise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="3" seed="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.83 0 0 0 0 0.86 0 0 0 0 0.8 0 0 0 0.6 0" />
        </filter>
        <g id="wwa-pine">
          <path d="M-1.6,0 L1.6,0 L1,-10 L-1,-10 Z" />
          <path d="M-11,-5 L11,-5 L0,-38 Z" />
          <path d="M-9.5,-31 L9.5,-31 L0,-60 Z" />
          <path d="M-7.5,-53 L7.5,-53 L0,-80 Z" />
        </g>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />
      <circle cx={MOON.x} cy={MOON.y} r="300" fill="url(#moonSkyGlow)" />

      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#dfe6dd"
          opacity={s.o}
          className={s.t ? "wwa-twinkle" : undefined}
          style={s.t ? { animationDelay: `${s.d.toFixed(1)}s` } : undefined}
        />
      ))}

      <g opacity="0.5">
        <ellipse cx="980" cy="205" rx="230" ry="26" fill="#cfd8cd" opacity="0.08" filter="url(#soft2)" />
        <ellipse cx="1290" cy="300" rx="200" ry="20" fill="#cfd8cd" opacity="0.06" filter="url(#soft2)" className="wwa-mist-b" />
      </g>

      <circle cx={MOON.x} cy={MOON.y} r="215" fill="url(#moonHalo)" />
      <circle cx={MOON.x} cy={MOON.y} r={MOON.r} fill="url(#moonBody)" />
      <g opacity="0.08">
        <circle cx={MOON.x - 20} cy={MOON.y - 12} r="13" fill="#56523f" />
        <circle cx={MOON.x - 20} cy={MOON.y - 12} r="13" fill="#56523f" />
        <circle cx={MOON.x + 26} cy={MOON.y + 20} r="9" fill="#56523f" />
        <circle cx={MOON.x + 2} cy={MOON.y + 38} r="6" fill="#56523f" />
        <circle cx={MOON.x - 34} cy={MOON.y + 24} r="5" fill="#56523f" />
      </g>

      <g opacity="0.55" stroke="#101d16" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M1030,150 q6,-5 12,-1 q6,-4 12,0" />
        <path d="M1060,166 q4,-3 8,-1" />
      </g>

      <path
        d="M0,610 C130,530 200,478 320,505 C400,522 448,470 545,452 C640,435 715,498 815,508 C915,518 975,468 1075,448 C1170,430 1265,498 1372,503 C1462,507 1530,478 1600,508 L1600,900 L0,900 Z"
        fill="#22352c"
      />
      <path
        d="M0,610 C130,530 200,478 320,505 C400,522 448,470 545,452 C640,435 715,498 815,508 C915,518 975,468 1075,448 C1170,430 1265,498 1372,503 C1462,507 1530,478 1600,508 L1600,560 L0,560 Z"
        fill="#2a4034"
        opacity="0.5"
        filter="url(#soft)"
      />

      <ellipse cx="400" cy="600" rx="480" ry="42" fill="#cdd7d4" opacity="0.05" filter="url(#soft2)" className="wwa-mist-a" />
      <ellipse cx="1150" cy="635" rx="430" ry="34" fill="#cdd7d4" opacity="0.045" filter="url(#soft2)" className="wwa-mist-b" />

      <path
        d="M0,672 C150,612 265,596 405,622 C525,644 605,602 725,612 C845,622 925,582 1045,597 C1155,610 1258,570 1388,600 C1478,620 1548,596 1600,612 L1600,900 L0,900 Z"
        fill="#19291f"
      />
      <Pines list={trees.far} fill="#1c2c23" />
      <Pines list={trees.mid} fill="#131f18" />

      <path d="M0,700 C90,760 200,820 330,900 L0,900 Z" fill="#0e1712" />
      <path d="M470,900 C420,820 360,760 300,706 C400,730 470,790 520,868 Z" fill="#0c130f" />
      <path d="M1600,695 C1500,755 1395,815 1270,900 L1600,900 Z" fill="#0e1712" />
      <path d="M1120,900 C1170,822 1235,762 1305,708 C1210,732 1140,792 1085,870 Z" fill="#0c130f" />

      <Pines list={trees.leftNear} fill="#0a120e" />
      <Pines list={trees.rightNear} fill="#0a120e" />

      <path
        d="M300,776 C470,758 640,752 800,760 C960,768 1130,772 1305,784 L1600,802 L1600,900 L0,900 L0,790 Z"
        fill="url(#lake)"
      />

      <g opacity="0.9">
        <rect x="898" y="778" width="64" height="5" rx="2.5" fill="#d9d3bd" opacity="0.5" filter="url(#soft)" />
        <rect x="906" y="792" width="52" height="4" rx="2" fill="#d9d3bd" opacity="0.4" filter="url(#soft)" />
        <rect x="896" y="806" width="68" height="4" rx="2" fill="#d9d3bd" opacity="0.32" filter="url(#soft)" />
        <rect x="910" y="822" width="44" height="3.5" rx="1.7" fill="#d9d3bd" opacity="0.26" filter="url(#soft)" />
        <rect x="900" y="840" width="56" height="3" rx="1.5" fill="#d9d3bd" opacity="0.2" filter="url(#soft)" />
        <rect x="914" y="860" width="36" height="2.6" rx="1.3" fill="#d9d3bd" opacity="0.14" filter="url(#soft)" />
        <ellipse cx="930" cy="784" rx="48" ry="8" fill="#cdd7d4" opacity="0.15" filter="url(#soft)" />
      </g>
      <g stroke="#0a140f" strokeWidth="2" opacity="0.5">
        <path d="M520,810 L1030,810" />
        <path d="M560,838 L990,838" opacity="0.6" />
        <path d="M610,866 L940,866" opacity="0.4" />
      </g>

      <g>
        <circle cx="640" cy="742" r="26" fill="url(#windowGlow)" opacity="0.55" filter="url(#soft2)" />
        <circle cx="640" cy="742" r="12" fill="url(#windowGlow)" opacity="0.7" />
        <rect x="636.5" y="738" width="7" height="9" rx="1" fill="#ffca85" opacity="0.95" />
      </g>

      <g fill="#e8b05f">
        <circle cx="728" cy="705" r="1.6" className="wwa-flicker" style={{ animationDelay: "0s" }} />
        <circle cx="762" cy="742" r="1.3" className="wwa-flicker" style={{ animationDelay: "2.4s" }} />
        <circle cx="808" cy="688" r="1.5" className="wwa-flicker" style={{ animationDelay: "4.8s" }} />
        <circle cx="1018" cy="700" r="1.4" className="wwa-flicker" style={{ animationDelay: "1.2s" }} />
        <circle cx="1064" cy="736" r="1.2" className="wwa-flicker" style={{ animationDelay: "3.6s" }} />
      </g>

      <Pines list={trees.fgLeft} fill="#050906" />
      <Pines list={trees.fgRight} fill="#050906" />

      <rect width="1600" height="900" fill="url(#vignette)" />
      <rect width="1600" height="900" filter="url(#grain)" opacity="0.055" />
    </svg>
  );
}

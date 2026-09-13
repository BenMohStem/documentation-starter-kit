import type { ReactNode } from "react";

/**
 * SceneHeader v4 — organic, generated scene illustrations.
 * Every scene is built with the systems that make the home hero work:
 * seeded generation (stars, clouds, tree clusters, fireflies),
 * layered atmospheric perspective, a consistent light source with
 * halo and interplay, a vignette, and film grain. The home hero is
 * the quality bar; these are the same craft, smaller.
 */

type Ridge = { d: string; fill: string };
type Pine = { list: [number, number, number][]; fill: string; scale?: number };

type SceneSpec = {
  label: string;
  sky: string[];
  light?: { x: number; y: number; r: number; core: string; glow: string };
  farStars?: boolean;
  ridges: Ridge[];
  pines?: Pine[];
  mist?: { cx: number; cy: number; rx: number; ry: number; o: number }[];
  birds?: [number, number, number][];
  fireflies?: [number, number][];
  clouds?: { x: number; y: number; rx: number; ry: number; o: number }[];
  reflection?: { cy: number; strength: number; from: { x: number; y: number } };
  subjects?: ReactNode;
};

const H = 300;

/* ---------- seeded generators (same technique as the home hero) ---------- */

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) >>> 0;
    return s / 4294967296;
  };
}

function genStars(seed: number, count: number, maxY: number, lightX?: number, lightY?: number) {
  const rnd = lcg(seed);
  const out: { x: number; y: number; r: number; o: number; t: boolean; d: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x = rnd() * 1600;
    const y = rnd() * maxY;
    if (lightX !== undefined && lightY !== undefined) {
      const dx = x - lightX;
      const dy = y - lightY;
      if (Math.sqrt(dx * dx + dy * dy) < 110) continue;
    }
    out.push({
      x,
      y,
      r: 0.5 + rnd() * 1.2,
      o: 0.12 + rnd() * 0.5,
      t: i % 9 === 0,
      d: rnd() * 6,
    });
  }
  return out;
}

function genClouds(seed: number, count: number, yMin: number, yMax: number, baseO: number) {
  const rnd = lcg(seed);
  const out: { x: number; y: number; rx: number; ry: number; o: number; w: number }[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: rnd() * 1600,
      y: yMin + rnd() * (yMax - yMin),
      rx: 130 + rnd() * 220,
      ry: 12 + rnd() * 16,
      o: baseO * (0.6 + rnd() * 0.8),
      w: rnd() * 1.2 - 0.6,
    });
  }
  return out;
}

function genCluster(
  rnd: () => number,
  cx: number,
  spread: number,
  baseY: number,
  yJit: number,
  sMin: number,
  sMax: number,
  count: number
): [number, number, number][] {
  const list: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const x = cx + (rnd() * 2 - 1) * spread;
    const s = sMin + rnd() * (sMax - sMin);
    list.push([x, baseY + (rnd() * 2 - 1) * yJit, s]);
  }
  list.sort((a, b) => a[2] - b[2]);
  return list;
}

function Pines({ list, fill, scale = 1 }: Pine) {
  return (
    <g fill={fill}>
      {list.map(([x, y, s], i) => (
        <use key={i} href="#sc-pine" transform={`translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * scale).toFixed(2)})`} />
      ))}
    </g>
  );
}

export default function SceneHeader({
  scene,
  height = 240,
}: {
  scene: string;
  height?: number;
}) {
  const S = scenes[scene] ?? scenes.premise;

  const seedNum = [...scene].reduce((a, c) => a + c.charCodeAt(0), 7);
  const stars = genStars(seedNum * 13 + 5, 46, 130, S.light?.x, S.light?.y);
  const clouds = S.clouds
    ? genClouds(seedNum * 31 + 3, S.clouds.length || 5, 30, 120, 0.06)
    : null;
  const cloudEllipses = S.clouds?.map((c, i) => ({ ...c, key: i })) ?? null;

  return (
    <div className="wwa-scene-frame">
      <svg
        className="wwa-scene"
        viewBox={`0 0 1600 ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ height }}
        role="img"
        aria-label={S.label}
      >
        <defs>
          <linearGradient id={`sc3-sky-${scene}`} x1="0" y1="0" x2="0" y2="1">
            {S.sky.map((c, i) => (
              <stop key={i} offset={`${Math.round((i / (S.sky.length - 1)) * 100)}%`} stopColor={c} />
            ))}
          </linearGradient>
          <radialGradient id={`sc3-glow-${scene}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={S.light?.glow ?? "#cdd7d4"} stopOpacity="0.5" />
            <stop offset="55%" stopColor={S.light?.glow ?? "#cdd7d4"} stopOpacity="0.14" />
            <stop offset="100%" stopColor={S.light?.glow ?? "#cdd7d4"} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`sc3-window-${scene}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffca85" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#e8963f" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e8963f" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`sc3-vignette-${scene}`} cx="50%" cy="46%" r="74%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#020403" stopOpacity="0.5" />
          </radialGradient>
          <filter id={`sc3-blur-${scene}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id={`sc3-blur2-${scene}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id={`sc3-grain-${scene}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0.5 0" />
          </filter>
          <g id="sc-pine">
            <path d="M-1.4,0 L1.4,0 L1,-9 L-1,-9 Z" />
            <path d="M-10,-4 L10,-4 L0,-36 Z" />
            <path d="M-8.4,-28 L8.4,-28 L0,-56 Z" />
            <path d="M-6.6,-48 L6.6,-48 L0,-74 Z" />
          </g>
          <g id="sc-bird">
            <path d="M-7,0 Q-3.5,-5 0,-1.2 Q3.5,-5 7,0" fill="none" strokeWidth="1.6" />
          </g>
        </defs>

        <rect width="1600" height={H} fill={`url(#sc3-sky-${scene})`} />

        {/* light source with sky-wide glow */}
        {S.light && (
          <>
            <circle cx={S.light.x} cy={S.light.y} r={S.light.r * 4} fill={`url(#sc3-glow-${scene})`} opacity="0.6" />
            <circle cx={S.light.x} cy={S.light.y} r={S.light.r * 3.6} fill={`url(#sc3-glow-${scene})`} />
            <circle cx={S.light.x} cy={S.light.y} r={S.light.r} fill={S.light.core} opacity="0.96" />
            {S.light.r > 30 && (
              <>
                <circle cx={S.light.x - S.light.r * 0.3} cy={S.light.y - S.light.r * 0.2} r={S.light.r * 0.16} fill="#56523f" opacity="0.1" />
                <circle cx={S.light.x + S.light.r * 0.28} cy={S.light.y + S.light.r * 0.3} r={S.light.r * 0.11} fill="#56523f" opacity="0.09" />
              </>
            )}
          </>
        )}

        {/* generated stars — seeded per scene, avoided near the light */}
        {(S.farStars ?? true) &&
          stars.map((s, i) => (
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

        {/* generated high clouds — drifting bands */}
        {clouds &&
          clouds.map((c, i) => (
            <ellipse
              key={i}
              cx={c.x}
              cy={c.y}
              rx={c.rx}
              ry={c.ry}
              fill={S.light?.glow ?? "#cdd7d4"}
              opacity={c.o}
              filter={`url(#sc3-blur2-${scene})`}
              className="wwa-mist-b"
              style={{ animationDelay: `${(i * 1.7).toFixed(1)}s` }}
            />
          ))}

        {/* author-placed clouds (dawn bands etc.) */}
        {cloudEllipses &&
          cloudEllipses.map((c) => (
            <ellipse
              key={c.key}
              cx={c.x}
              cy={c.y}
              rx={c.rx}
              ry={c.ry}
              fill={S.light?.glow ?? "#cdd7d4"}
              opacity={c.o}
              filter={`url(#sc3-blur2-${scene})`}
              className="wwa-mist-a"
            />
          ))}

        {S.ridges.map((r, i) => (
          <path key={i} d={r.d} fill={r.fill} />
        ))}

        {S.pines?.map((p, i) => (
          <Pines key={i} {...p} />
        ))}

        {S.mist?.map((m, i) => (
          <ellipse
            key={i}
            cx={m.cx}
            cy={m.cy}
            rx={m.rx}
            ry={m.ry}
            fill="#cdd7d4"
            opacity={m.o}
            filter={`url(#sc3-blur2-${scene})`}
            className={i % 2 ? "wwa-mist-b" : "wwa-mist-a"}
          />
        ))}

        {S.birds?.map(([x, y, s], i) => (
          <use key={i} href="#sc-bird" transform={`translate(${x},${y}) scale(${s})`} stroke="#0a120e" opacity="0.55" />
        ))}

        {/* fireflies — small warm lives in the dark */}
        {S.fireflies?.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={1.3 + ((i * 7) % 3) * 0.4}
            fill="#e8b05f"
            className="wwa-flicker"
            style={{ animationDelay: `${(i * 2.1).toFixed(1)}s` }}
          />
        ))}

        {S.subjects}

        <rect width="1600" height={H} fill={`url(#sc3-vignette-${scene})`} />
        <rect width="1600" height={H} filter={`url(#sc3-grain-${scene})`} opacity="0.05" />
      </svg>
      <span className="wwa-scene-caption">{S.label.split(" — ")[0]}</span>
    </div>
  );
}

/* ================= scene definitions ================= */

const scenes: Record<string, SceneSpec> = {
  premise: {
    label: "A green valley at dusk — meadow, forest, distant peak, the wanderer arriving",
    sky: ["#0a1611", "#10221a", "#173023", "#1e3b2a"],
    light: { x: 1210, y: 118, r: 40, core: "#e9e4cf", glow: "#d8d2ba" },
    clouds: [{ x: 980, y: 60, rx: 230, ry: 22, o: 0.06 }, { x: 400, y: 46, rx: 200, ry: 18, o: 0.05 }],
    fireflies: [[240, 262], [1420, 266], [1240, 258], [160, 254]],
    ridges: [
      { d: "M1180,150 L1268,96 L1356,150 L1600,150 L1600,300 L0,300 L0,150 Z", fill: "#26453a" },
      { d: "M0,182 C260,158 460,168 660,158 C860,148 1020,170 1220,158 C1380,149 1520,164 1600,156 L1600,300 L0,300 Z", fill: "#1e3a2c" },
    ],
    pines: [{ list: [[80, 190, 0.9], [200, 196, 1.1], [340, 192, 0.8], [500, 198, 1.2], [700, 190, 1], [900, 196, 1.1], [1120, 192, 0.9], [1320, 198, 1.2], [1500, 190, 0.8]], fill: "#1a3428", scale: 0.55 }],
    mist: [
      { cx: 480, cy: 236, rx: 360, ry: 16, o: 0.05 },
      { cx: 1180, cy: 252, rx: 320, ry: 14, o: 0.045 },
    ],
    birds: [[620, 100, 1.1], [660, 108, 0.8], [700, 98, 0.9]],
    subjects: (
      <g>
        <path d="M0,226 C300,204 520,214 760,204 C1000,194 1180,216 1400,206 C1500,202 1560,206 1600,204 L1600,300 L0,300 Z" fill="#152a1f" />
        <path d="M0,258 C240,242 480,252 720,244 C960,236 1180,252 1420,242 C1520,238 1580,242 1600,240 L1600,300 L0,300 Z" fill="#0d1b14" />
        {/* meadow flowers catching the last light */}
        <g fill="#d9a662" opacity="0.55">
          <circle cx="240" cy="270" r="1.4" /><circle cx="288" cy="278" r="1.1" /><circle cx="336" cy="268" r="1.3" />
          <circle cx="1240" cy="272" r="1.2" /><circle cx="1290" cy="280" r="1" /><circle cx="1350" cy="270" r="1.4" />
        </g>
        {/* the wanderer, small, entering the valley from the left */}
        <g transform="translate(120,262)" fill="#0b1610">
          <path d="M0,14 l1.2,-8 q0.4,-2.4 0.8,-3.6 l2.4,0 q0.8,3.2 0.8,5.6 l-1.2,6 Z" />
          <path d="M3,-9 q-4.4,-1.6 -5.6,-5.2 q-1.2,-3.2 1.2,-4.8 l2,-0.8 q-1.2,-3.2 1.2,-4.4 q1.6,-0.8 3.2,1.6 l1.6,-1.6 q2.4,0.8 1.6,4 q3.2,1.6 2.4,5.2 q-0.8,3.2 -3.2,4 Z" />
          <circle cx="4" cy="-26" r="2.1" />
          <path d="M2,-27.6 q2,-1.6 3.6,0 l0.8,2.4 q-2.4,-0.8 -4.8,-0.8 Z" />
        </g>
        <path d="M116,268 l5,-20" stroke="#3a2f22" strokeWidth="1.2" />
        {/* footprints behind the wanderer */}
        <g fill="#0b1610" opacity="0.75">
          <ellipse cx="98" cy="278" rx="1.6" ry="0.9" />
          <ellipse cx="86" cy="276" rx="1.6" ry="0.9" />
          <ellipse cx="74" cy="274" rx="1.6" ry="0.9" />
        </g>
      </g>
    ) as ReactNode,
  },

  emergence: {
    label: "Dawn over a wetland — heron in the shallows, reeds, waking flocks, first gold on the water",
    sky: ["#0d1108", "#141d0e", "#1a2712", "#223316"],
    light: { x: 820, y: 168, r: 34, core: "#f0d9a8", glow: "#e8b05f" },
    clouds: [{ x: 620, y: 70, rx: 300, ry: 24, o: 0.07 }, { x: 1200, y: 90, rx: 260, ry: 20, o: 0.06 }],
    ridges: [
      { d: "M0,178 C280,160 540,168 800,158 C1060,148 1300,168 1600,156 L1600,300 L0,300 Z", fill: "#2a3d22" },
      { d: "M0,212 C320,198 600,206 880,196 C1120,188 1360,206 1600,196 L1600,300 L0,300 Z", fill: "#1f3019" },
    ],
    mist: [
      { cx: 520, cy: 226, rx: 400, ry: 14, o: 0.07 },
      { cx: 1220, cy: 244, rx: 320, ry: 12, o: 0.06 },
    ],
    birds: [[1000, 92, 1.3], [1046, 100, 1], [1090, 88, 1.1], [960, 108, 0.8]],
    subjects: (
      <g>
        <path d="M0,252 C280,240 620,248 900,240 C1180,232 1420,246 1600,238 L1600,300 L0,300 Z" fill="#152313" />
        {/* water plane with dawn path */}
        <path d="M0,262 C300,256 700,258 1000,254 C1300,250 1480,258 1600,252 L1600,300 L0,300 Z" fill="#0e1a10" />
        <ellipse cx="820" cy="272" rx="200" ry="10" fill="#e8b05f" opacity="0.1" filter="url(#sc3-blur2-emergence)" />
        {/* water ripples concentric from the heron */}
        <g stroke="#1f3019" strokeWidth="1" fill="none" opacity="0.8">
          <ellipse cx="330" cy="278" rx="26" ry="3" />
          <ellipse cx="330" cy="278" rx="44" ry="5" opacity="0.6" />
          <ellipse cx="330" cy="278" rx="64" ry="7" opacity="0.35" />
        </g>
        {/* heron standing in shallows, neck up, watching the dawn */}
        <g transform="translate(322,252)" fill="#0e1a10">
          <path d="M0,26 l-2.4,-9 q-1,-3.4 1,-6.4 l1.4,-9 q0,-2 1.4,-2.6 l3.2,-0.6 q1.6,0 1.6,1.8 l-1,4.4 q-1.2,3.4 -1,6.4 l1.2,8 q0.4,4 -2,7 Z" />
          <path d="M7,-22 l8,-5.4 1.8,2.2 -8,5.4 Z" />
          <path d="M16,-27 l4.4,-1.4 q2,0 1,1.8 l-4.4,2.4 Z" />
          <path d="M-2,26 q-4,4 -8,3 l1,-2.4 q4,0 6,-2 Z" opacity="0.8" />
        </g>
        <circle cx="340" cy="226" r="1" fill="#d9a662" opacity="0.9" />
        {/* reeds on both banks */}
        <g stroke="#3a5244" strokeWidth="2" opacity="0.85">
          {[[120, 272, 16], [146, 278, 20], [172, 270, 13], [196, 276, 18], [1140, 276, 17], [1166, 282, 21], [1192, 272, 14], [1218, 278, 19]].map(([x, y, h], i) => (
            <path key={i} d={`M${x},${y} q3,-${h / 2} -2,-${h}`} fill="none" />
          ))}
        </g>
        {/* reed seed heads */}
        <g fill="#5a6a4a" opacity="0.7">
          <ellipse cx="118" cy="255" rx="1.4" ry="3.2" /><ellipse cx="170" cy="256" rx="1.2" ry="2.8" />
          <ellipse cx="1164" cy="259" rx="1.4" ry="3.4" /><ellipse cx="1216" cy="257" rx="1.2" ry="3" />
        </g>
        {/* a second wader far off, wings of the morning */}
        <g stroke="#0e1a10" strokeWidth="1.2" fill="none" opacity="0.6">
          <path d="M1380,238 q3.6,-4 7.2,0 q3.6,-4 7.2,0" />
          <path d="M1408,246 q3,-3.4 6,0 q3,-3.4 6,0" />
        </g>
      </g>
    ) as ReactNode,
  },

  observation: {
    label: "A cold lake under low moon — a wolf on the shore, reading the night",
    sky: ["#080d14", "#0c1520", "#101c2a", "#142636"],
    light: { x: 500, y: 96, r: 32, core: "#e6e9e4", glow: "#b8c9c4" },
    clouds: [{ x: 1100, y: 54, rx: 280, ry: 20, o: 0.05 }],
    fireflies: [[1480, 258], [1520, 264], [90, 262]],
    ridges: [
      { d: "M0,172 C240,148 420,162 640,150 C860,138 1040,164 1260,150 C1440,139 1560,158 1600,150 L1600,300 L0,300 Z", fill: "#1c2f3c" },
      { d: "M0,206 C300,188 560,196 820,188 C1080,180 1320,198 1600,188 L1600,300 L0,300 Z", fill: "#142530" },
    ],
    mist: [{ cx: 900, cy: 236, rx: 420, ry: 14, o: 0.05 }],
    birds: [[1180, 84, 1], [1216, 92, 0.8]],
    subjects: (
      <g>
        <path d="M0,246 C260,234 540,240 800,234 C1060,228 1300,240 1600,232 L1600,300 L0,300 Z" fill="#0d1a22" />
        {/* lake with moon reflection column */}
        <path d="M0,256 C260,250 540,252 800,248 C1060,244 1300,254 1600,246 L1600,300 L0,300 Z" fill="#0a141c" />
        <g opacity="0.55">
          {[[490, 262, 26, 3.2], [500, 272, 22, 2.6], [494, 282, 18, 2.2], [502, 292, 14, 1.8]].map(([x, y, w, h], i) => (
            <rect key={i} x={x - w / 2} y={y} width={w} height={h} rx={h / 2} fill="#cfd8cd" opacity={0.5 - i * 0.1} filter="url(#sc3-blur-observation)" />
          ))}
        </g>
        {/* shore stones */}
        <g fill="#0a141c">
          <ellipse cx="1420" cy="262" rx="18" ry="5" />
          <ellipse cx="1452" cy="266" rx="12" ry="4" />
          <ellipse cx="154" cy="268" rx="22" ry="6" />
        </g>
        {/* wolf silhouette on shore, head raised, watching the water */}
        <g transform="translate(1282,236)" fill="#0a141c">
          <path d="M0,30 q-2.4,-8 2.4,-12 q-5,-2.4 -6.4,-7 q10,-4.4 14,1 q3,-6.4 9,-4.4 q7,2.4 6,8 q-1,4.4 -5,5.4 q3,3.4 1,6 q-3,4 -8,3 q-6,9 -12,4 Z" />
          <path d="M20,-6 l7,-3 1,2 -7,3 Z" />
          <path d="M27,-12 q3,0 3,2 l-3,1 Z" />
          <path d="M4,-4 l-9,1 -2,3 9,-1 Z" opacity="0.7" />
          <path d="M2,30 l-14,2 -1,2 14,-2 Z" opacity="0.7" />
        </g>
        <circle cx="1300" cy="214" r="1" fill="#d9a662" opacity="0.85" />
        {/* its breath in the cold */}
        <ellipse cx="1312" cy="210" rx="7" ry="3" fill="#cfd8cd" opacity="0.14" filter="url(#sc3-blur-observation)" />
        {/* tracks along the shore behind it */}
        <g fill="#0a141c" opacity="0.85">
          <g transform="translate(1150,268)">
            <ellipse cx="0" cy="0" rx="2.6" ry="1.7" /><circle cx="-1.6" cy="-1.6" r="0.7" /><circle cx="1.6" cy="-1.6" r="0.7" />
          </g>
          <g transform="translate(1126,272)">
            <ellipse cx="0" cy="0" rx="2.6" ry="1.7" /><circle cx="-1.6" cy="-1.6" r="0.7" /><circle cx="1.6" cy="-1.6" r="0.7" />
          </g>
          <g transform="translate(1102,276)">
            <ellipse cx="0" cy="0" rx="2.6" ry="1.7" /><circle cx="-1.6" cy="-1.6" r="0.7" /><circle cx="1.6" cy="-1.6" r="0.7" />
          </g>
        </g>
      </g>
    ) as ReactNode,
  },

  roadmap: {
    label: "A dark pass between peaks — the road ahead, one lantern lit at its far end",
    sky: ["#0d0a10", "#120e16", "#181322", "#1e1930"],
    light: { x: 1380, y: 74, r: 26, core: "#dcd6ea", glow: "#c9c2ea" },
    clouds: [{ x: 500, y: 60, rx: 320, ry: 22, o: 0.05 }, { x: 1250, y: 92, rx: 240, ry: 18, o: 0.045 }],
    ridges: [
      { d: "M0,120 C160,84 300,108 460,84 C620,60 760,110 920,80 C1080,52 1240,104 1400,74 C1500,58 1570,80 1600,70 L1600,300 L0,300 Z", fill: "#2a2438" },
      { d: "M0,170 C200,140 400,152 600,136 C800,120 1000,152 1200,130 C1360,113 1520,140 1600,128 L1600,300 L0,300 Z", fill: "#201a2c" },
      { d: "M0,214 C240,192 480,200 720,188 C960,176 1200,198 1440,186 C1540,181 1590,188 1600,184 L1600,300 L0,300 Z", fill: "#171220" },
    ],
    pines: [{ list: [[60, 232, 1], [140, 238, 0.8], [1480, 230, 0.9], [1550, 236, 0.75]], fill: "#0e0a14", scale: 0.7 }],
    subjects: (
      <g>
        <path d="M0,252 C300,238 600,244 900,236 C1200,228 1420,240 1600,232 L1600,300 L0,300 Z" fill="#0e0a14" />
        {/* the pass: a road vanishing between the last ridges */}
        <path d="M760,300 C820,280 830,262 840,252 C850,264 862,282 920,300 Z" fill="#151018" />
        {/* the distant lantern, barely */}
        <path d="M838,254 C842,250 848,250 852,254 C848,258 842,258 838,254 Z" fill="#d9a662" opacity="0.55" />
        <circle cx="845" cy="254" r="9" fill="#d9a662" opacity="0.12" filter="url(#sc3-blur-roadmap)" />
        {/* waymarkers along the road: small stones already placed */}
        <g fill="#1c1526">
          <ellipse cx="796" cy="284" rx="4" ry="2.2" />
          <ellipse cx="786" cy="292" rx="4.6" ry="2.6" />
          <ellipse cx="922" cy="284" rx="4" ry="2.2" />
          <ellipse cx="934" cy="292" rx="4.6" ry="2.6" />
        </g>
        {/* snow patches high on the peaks */}
        <g fill="#3a3450" opacity="0.5">
          <path d="M300,96 L330,78 L360,96 Z" />
          <path d="M1150,84 L1176,68 L1202,84 Z" />
        </g>
      </g>
    ) as ReactNode,
  },

  idea: {
    label: "Sunrise over the world — the first promise, light reaching a sleeping land",
    sky: ["#0e1210", "#18201a", "#2a2a20", "#3a3324"],
    light: { x: 800, y: 210, r: 46, core: "#f4d9a0", glow: "#e8b05f" },
    clouds: [{ x: 520, y: 130, rx: 340, ry: 26, o: 0.09 }, { x: 1150, y: 150, rx: 300, ry: 22, o: 0.08 }],
    fireflies: [[380, 262], [1200, 266], [1450, 260]],
    ridges: [
      { d: "M0,196 C220,178 420,186 640,176 C860,166 1060,184 1280,172 C1440,164 1560,178 1600,172 L1600,300 L0,300 Z", fill: "#3a3a2e" },
      { d: "M0,230 C280,216 560,222 840,214 C1120,206 1360,220 1600,212 L1600,300 L0,300 Z", fill: "#2c2c22" },
    ],
    mist: [
      { cx: 420, cy: 246, rx: 380, ry: 12, o: 0.07 },
      { cx: 1220, cy: 256, rx: 300, ry: 11, o: 0.06 },
    ],
    birds: [[540, 128, 1.2], [586, 136, 0.9], [630, 126, 1]],
    subjects: (
      <g>
        <path d="M0,262 C320,252 640,256 960,250 C1280,244 1480,252 1600,248 L1600,300 L0,300 Z" fill="#1c1c16" />
        {/* sun path on low haze */}
        <ellipse cx="800" cy="238" rx="260" ry="18" fill="#e8b05f" opacity="0.12" filter="url(#sc3-blur2-idea)" />
        {/* ridgeline trees catching first light */}
        <g fill="#14140f">
          {[[240, 244, 0.7], [280, 246, 0.9], [330, 244, 0.6], [1240, 246, 0.8], [1290, 248, 0.7], [1350, 244, 0.9]].map(([x, y, s], i) => (
            <use key={i} href="#sc-pine" transform={`translate(${x},${y}) scale(${s})`} />
          ))}
        </g>
        {/* birds going out into the morning */}
        <g stroke="#14140f" strokeWidth="1.3" fill="none" opacity="0.7">
          <path d="M1030,150 q4,-5 8,0 q4,-5 8,0" />
          <path d="M1062,160 q3.4,-4 6.8,0 q3.4,-4 6.8,0" />
        </g>
        {/* dew glints along the near ground */}
        <g fill="#e8b05f" opacity="0.4">
          <circle cx="300" cy="278" r="1" /><circle cx="480" cy="284" r="0.8" /><circle cx="700" cy="276" r="1.1" />
          <circle cx="980" cy="282" r="0.9" /><circle cx="1220" cy="278" r="1" />
        </g>
      </g>
    ) as ReactNode,
  },

  plan: {
    label: "Stone by stone — a foundation being laid true, course on course, under a level line",
    sky: ["#0d1013", "#121719", "#161d20", "#1a2226"],
    clouds: [{ x: 600, y: 60, rx: 300, ry: 20, o: 0.045 }],
    fireflies: [[1420, 260], [200, 264]],
    ridges: [
      { d: "M0,190 C300,172 600,180 900,170 C1200,160 1440,176 1600,168 L1600,300 L0,300 Z", fill: "#242e33" },
      { d: "M0,232 C300,220 700,226 1000,218 C1300,210 1480,222 1600,216 L1600,300 L0,300 Z", fill: "#1a2327" },
    ],
    subjects: (
      <g>
        <path d="M0,268 C400,260 800,262 1200,258 C1440,255 1580,260 1600,258 L1600,300 L0,300 Z" fill="#11181b" />
        {/* coursed foundation stones — running bond, being laid left to right */}
        <g fill="#2c383d" stroke="#141c1f" strokeWidth="1">
          <rect x="560" y="252" width="52" height="12" rx="2" />
          <rect x="618" y="252" width="44" height="12" rx="2" />
          <rect x="668" y="252" width="56" height="12" rx="2" />
          <rect x="586" y="238" width="50" height="12" rx="2" />
          <rect x="642" y="238" width="58" height="12" rx="2" />
          {/* the stone being placed now, slightly above its course */}
          <rect x="806" y="246" width="54" height="12" rx="2" fill="#39464c" />
        </g>
        {/* mortar lines */}
        <g stroke="#141c1f" strokeWidth="0.8" opacity="0.6">
          <path d="M562,258 L722,258" /><path d="M588,244 L698,244" />
        </g>
        {/* the mason placing it — hands on the stone */}
        <g transform="translate(830,222)" fill="#141c1f">
          <path d="M-8,16 l-1,-11 q0,-3 1,-4 l3,0 q1,2 1,4 l1,11 Z" />
          <circle cx="-4" cy="-8" r="2.4" fill="#1e2629" />
          <path d="M-6,-9.6 q2,-1.6 3.6,0 l0.8,2.4 q-2.4,-0.8 -4.8,-0.8 Z" fill="#1e2629" />
          {/* arms lowering the stone */}
          <path d="M-5,-2 q-8,4 -12,10 l3,2 q4,-5 10,-8 Z" />
          <path d="M-2,-2 q8,4 12,10 l-3,2 q-4,-5 -10,-8 Z" />
        </g>
        {/* the level line with plumb bob, hung across the work */}
        <g stroke="#8fb8c9" strokeWidth="1" opacity="0.6">
          <path d="M600,236 L1000,236" strokeDasharray="4 5" />
          <path d="M800,236 L800,254" />
        </g>
        <path d="M800,254 l-3,6 3,4 3,-4 Z" fill="#8fb8c9" opacity="0.6" />
        {/* rough stones yet uncut, staged on the ground */}
        <g fill="#202a2e" stroke="#141c1f" strokeWidth="0.8">
          <ellipse cx="960" cy="284" rx="16" ry="7" />
          <ellipse cx="994" cy="288" rx="12" ry="6" />
          <ellipse cx="1022" cy="284" rx="14" ry="6" />
        </g>
      </g>
    ) as ReactNode,
  },

  steps: {
    label: "The record in the rock — strata of eras exposed in a cliff face, each layer kept",
    sky: ["#100d0e", "#181314", "#201a1c", "#282022"],
    clouds: [{ x: 800, y: 50, rx: 340, ry: 18, o: 0.04 }],
    ridges: [
      { d: "M0,150 C200,124 400,138 600,120 C800,102 960,140 1160,118 C1340,100 1500,134 1600,118 L1600,300 L0,300 Z", fill: "#3a2c2e" },
      { d: "M0,196 C260,176 520,186 780,172 C1040,158 1300,184 1600,168 L1600,300 L0,300 Z", fill: "#2c2224" },
    ],
    birds: [[980, 96, 0.9], [1014, 104, 0.7]],
    subjects: (
      <g>
        <path d="M0,236 C300,222 640,228 940,220 C1240,212 1440,224 1600,218 L1600,300 L0,300 Z" fill="#1e1618" />
        <path d="M0,268 C400,260 900,262 1600,256 L1600,300 L0,300 Z" fill="#120e0f" />
        {/* the exposed strata wall on the left — five distinct era bands */}
        <path d="M40,300 L40,180 C120,168 240,178 320,190 L320,300 Z" fill="#2c2224" />
        <g strokeWidth="1.4" opacity="0.85">
          <path d="M44,246 C140,240 240,244 316,252" stroke="#4a3a3c" />
          <path d="M44,254 C140,248 240,252 316,260" stroke="#443638" />
          <path d="M44,262 C140,256 240,260 316,268" stroke="#3e3032" />
          <path d="M44,270 C140,264 240,268 316,276" stroke="#382c2e" />
          <path d="M44,278 C140,272 240,276 316,284" stroke="#32262a" />
        </g>
        {/* one fossil kept in the deepest layer — the failure that taught */}
        <g fill="#5c4a4c" opacity="0.8">
          <circle cx="150" cy="282" r="3" fill="none" stroke="#5c4a4c" strokeWidth="1.2" />
          <path d="M153,282 l8,0 M141,282 l-8,0 M150,279 l0,-8 M150,285 l0,8" stroke="#5c4a4c" strokeWidth="0.8" />
        </g>
        {/* the cliff on the right — broken, honest profile */}
        <path d="M1320,300 L1320,196 C1380,182 1460,188 1520,204 L1520,300 Z" fill="#241b1d" />
        {/* a thin seam of gold in the newest stratum — the current work */}
        <g stroke="#d9a662" strokeWidth="1.2" opacity="0.55">
          <path d="M1330,236 C1390,230 1460,234 1510,240" />
        </g>
        {/* scree at the foot of the cliff */}
        <g fill="#1c1416">
          <ellipse cx="1270" cy="292" rx="20" ry="5" />
          <ellipse cx="1240" cy="296" rx="14" ry="4" />
          <ellipse cx="360" cy="294" rx="18" ry="5" />
        </g>
      </g>
    ) as ReactNode,
  },

  systems: {
    label: "Everything interacts — forest edge, field rows, a terraced town, smoke and light",
    sky: ["#0b100d", "#101812", "#152017", "#1a2819"],
    light: { x: 1290, y: 120, r: 30, core: "#e9e4cf", glow: "#cdd7d4" },
    clouds: [{ x: 700, y: 64, rx: 300, ry: 20, o: 0.05 }],
    fireflies: [[240, 260], [1550, 262], [1120, 258], [700, 266]],
    ridges: [
      { d: "M0,168 C280,152 560,158 840,148 C1120,138 1360,158 1600,146 L1600,300 L0,300 Z", fill: "#24382b" },
      { d: "M0,206 C300,192 600,198 900,188 C1200,178 1420,196 1600,188 L1600,300 L0,300 Z", fill: "#1a2c20" },
    ],
    birds: [[420, 110, 1], [456, 118, 0.8]],
    subjects: (
      <g>
        <path d="M0,244 C300,234 600,238 900,232 C1200,226 1420,236 1600,230 L1600,300 L0,300 Z" fill="#111f16" />
        {/* forest edge — pines leaning into the field */}
        <g fill="#0c1810">
          {[[140, 244, 1], [180, 246, 0.8], [230, 244, 1.1], [280, 246, 0.7]].map(([x, y, s], i) => (
            <use key={i} href="#sc-pine" transform={`translate(${x},${y}) scale(${s})`} />
          ))}
        </g>
        {/* field rows catching the light, converging on the town */}
        <g stroke="#3a5244" strokeWidth="1.6" opacity="0.85">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${360 + i * 44},300 L${560 + i * 12},258`} fill="none" />
          ))}
        </g>
        {/* irrigation channel crossing the rows */}
        <path d="M330,300 C420,282 520,276 640,268 L644,274 C524,282 428,288 338,304 Z" fill="#16241a" opacity="0.9" />
        {/* the terraced hillside town — three warm windows, chimney smoke */}
        <g fill="#0d1712">
          <path d="M880,240 l14,-12 14,12 v0 Z" />
          <rect x="878" y="240" width="32" height="14" />
          <path d="M935,244 l10,-9 10,9 Z" />
          <rect x="933" y="244" width="24" height="10" />
          <path d="M912,256 l12,-10 12,10 Z" />
          <rect x="910" y="256" width="28" height="12" />
        </g>
        <g fill="#ffca85">
          <rect x="886" y="244" width="5" height="6" opacity="0.9" />
          <rect x="898" y="244" width="5" height="6" opacity="0.75" />
          <rect x="938" y="247" width="4" height="5" opacity="0.85" />
        </g>
        <circle cx="924" cy="244" r="16" fill="url(#sc3-window-systems)" opacity="0.3" />
        {/* smoke drifting from a hearth */}
        <g stroke="#3a4a3c" strokeWidth="1.2" fill="none" opacity="0.5">
          <path d="M924,232 q3,-6 -2,-10 q-4,-5 1,-10 q4,-5 0,-9" />
        </g>
        {/* a granary beyond the town */}
        <g fill="#0a140e">
          <rect x="1180" y="252" width="16" height="10" />
          <path d="M1178,252 L1188,244 L1198,252 Z" />
        </g>
        {/* sheep in the far pasture, near dots */}
        <g fill="#243626">
          <ellipse cx="1360" cy="262" rx="3" ry="1.8" />
          <ellipse cx="1372" cy="264" rx="3" ry="1.8" />
          <ellipse cx="1384" cy="261" rx="2.6" ry="1.6" />
        </g>
      </g>
    ) as ReactNode,
  },

  design: {
    label: "The constitution carved at the threshold — a tablet of rules before an open door",
    sky: ["#0c1012", "#11161a", "#151b20", "#192126"],
    clouds: [{ x: 900, y: 50, rx: 320, ry: 18, o: 0.04 }],
    fireflies: [[1540, 260], [420, 264]],
    ridges: [
      { d: "M0,182 C280,166 560,172 840,162 C1120,152 1360,172 1600,158 L1600,300 L0,300 Z", fill: "#1e2b30" },
      { d: "M0,224 C320,212 660,218 980,208 C1260,200 1460,212 1600,204 L1600,300 L0,300 Z", fill: "#162024" },
    ],
    subjects: (
      <g>
        <path d="M0,258 C400,250 800,252 1200,248 C1440,245 1580,250 1600,248 L1600,300 L0,300 Z" fill="#0e1417" />
        {/* a stone threshold with carved rule-lines, beside an open door of light */}
        <g>
          {/* the standing stone, slightly angled, carved */}
          <g transform="translate(480,190)">
            <rect x="-46" y="0" width="92" height="74" rx="4" fill="#22303a" stroke="#101820" strokeWidth="1.4" />
            {/* carved lines — the rules, short and long */}
            <g stroke="#8fb8c9" strokeWidth="1.1" opacity="0.5">
              <path d="M-32,14 L32,14" />
              <path d="M-32,24 L18,24" />
              <path d="M-32,34 L32,34" />
              <path d="M-32,44 L8,44" />
              <path d="M-32,54 L26,54" />
              <path d="M-32,64 L14,64" />
            </g>
            {/* one rule carved deeper than the rest — the one law */}
            <path d="M-32,34 L32,34" stroke="#d9a662" strokeWidth="1.8" opacity="0.75" />
          </g>
          {/* the open door in a low wall, warm light through it */}
          <g>
            <rect x="880" y="196" width="10" height="86" fill="#131d22" />
            <rect x="1050" y="196" width="10" height="86" fill="#131d22" />
            <rect x="880" y="192" width="180" height="8" fill="#131d22" />
            <rect x="894" y="200" width="152" height="80" rx="2" fill="#1c2a26" />
            <rect x="894" y="200" width="152" height="80" rx="2" fill="#e8a052" opacity="0.16" />
            <circle cx="970" cy="240" r="60" fill="url(#sc3-window-design)" opacity="0.5" />
          </g>
          {/* a path of flagstones leading through the door */}
          <g fill="#1a262c" opacity="0.95">
            <ellipse cx="946" cy="288" rx="16" ry="5" />
            <ellipse cx="992" cy="292" rx="18" ry="5.5" />
            <ellipse cx="920" cy="280" rx="13" ry="4.4" />
          </g>
        </g>
      </g>
    ) as ReactNode,
  },

  demo: {
    label: "The training yard — crates stacked on a measured grid, one lit, the engine proving itself",
    sky: ["#0a0e0f", "#0e1516", "#121b1c", "#16211f"],
    clouds: [{ x: 900, y: 58, rx: 320, ry: 20, o: 0.04 }],
    ridges: [
      { d: "M0,186 C300,172 700,178 1100,168 C1320,163 1500,172 1600,168 L1600,300 L0,300 Z", fill: "#1e302c" },
      { d: "M0,226 C350,214 750,220 1150,210 C1380,205 1520,212 1600,208 L1600,300 L0,300 Z", fill: "#15221f" },
    ],
    subjects: (
      <g>
        {/* the yard floor: a perspective grid, the broadphase's ghost */}
        <path d="M0,262 C400,254 800,258 1200,252 C1440,248 1580,254 1600,250 L1600,300 L0,300 Z" fill="#0c1513" />
        <g stroke="#1a2a24" strokeWidth="1" opacity="0.65">
          <path d="M660,268 L960,268" />
          <path d="M660,278 L960,278" opacity="0.55" />
          <path d="M660,288 L960,288" opacity="0.4" />
          <path d="M672,262 L658,300" />
          <path d="M736,262 L728,300" />
          <path d="M800,262 L798,300" />
          <path d="M864,262 L868,300" />
          <path d="M928,262 L938,300" />
        </g>
        {/* crate stack: pyramid of bodies resting in contact */}
        <g fill="#131f1b" stroke="#22352c" strokeWidth="1.2">
          <rect x="700" y="242" width="18" height="18" rx="1" />
          <rect x="724" y="242" width="18" height="18" rx="1" />
          <rect x="748" y="242" width="18" height="18" rx="1" />
          <rect x="712" y="224" width="18" height="18" rx="1" />
          <rect x="736" y="224" width="18" height="18" rx="1" />
          <rect x="724" y="206" width="18" height="18" rx="1" />
        </g>
        {/* contact points glowing between the crates */}
        <g fill="#8fb8c9" opacity="0.7">
          <circle cx="722" cy="260" r="1.4" /><circle cx="746" cy="260" r="1.4" />
          <circle cx="719" cy="242" r="1.2" /><circle cx="745" cy="242" r="1.2" />
          <circle cx="733" cy="224" r="1.2" /><circle cx="743" cy="206" r="1.2" />
        </g>
        {/* the lit crate — the one under test this frame */}
        <rect x="724" y="206" width="18" height="18" rx="1" fill="#e8a052" opacity="0.3" />
        <circle cx="733" cy="215" r="26" fill="url(#sc3-window-demo)" opacity="0.4" />
        {/* a second small stack, settled and stable */}
        <g fill="#131f1b" stroke="#22352c" strokeWidth="1">
          <rect x="806" y="252" width="14" height="14" rx="1" />
          <rect x="824" y="252" width="14" height="14" rx="1" />
          <rect x="815" y="238" width="14" height="14" rx="1" />
        </g>
        {/* ghost of a trajectory: an arc where a thrown crate landed */}
        <g stroke="#22352c" strokeWidth="1" strokeDasharray="2 6" fill="none" opacity="0.6">
          <path d="M560,236 C600,180 650,160 700,190" />
        </g>
        <path d="M698,192 l4,8 -8,-2 Z" fill="#22352c" opacity="0.8" />
      </g>
    ) as ReactNode,
  },

  engine: {
    label: "The great machine — a gear train under the hill, turning slow, lit from within",
    sky: ["#0c0c12", "#11111a", "#15151f", "#191926"],
    light: { x: 430, y: 90, r: 30, core: "#ded8f2", glow: "#9a9ac9" },
    clouds: [{ x: 800, y: 56, rx: 300, ry: 18, o: 0.04 }],
    ridges: [
      { d: "M0,178 C300,164 700,170 1100,160 C1320,155 1500,164 1600,160 L1600,300 L0,300 Z", fill: "#232338" },
      { d: "M0,222 C350,210 750,216 1150,206 C1370,201 1520,210 1600,206 L1600,300 L0,300 Z", fill: "#191928" },
    ],
    subjects: (
      <g>
        <path d="M0,260 C400,252 800,256 1200,250 C1440,246 1580,252 1600,250 L1600,300 L0,300 Z" fill="#101018" />
        {/* an opened hillside: the machine half-buried, half-lit */}
        <path d="M560,300 C560,252 700,240 860,244 C1000,248 1040,262 1040,300 Z" fill="#12121e" />
        {/* the great gear train: three meshed wheels + a lantern pinion */}
        <g stroke="#4a4a6a" fill="none" strokeWidth="2.4" opacity="0.85">
          <circle cx="760" cy="270" r="22" />
          <circle cx="760" cy="270" r="5" />
          <circle cx="812" cy="258" r="13" />
          <circle cx="812" cy="258" r="3.4" />
          <circle cx="716" cy="262" r="10" />
          <circle cx="716" cy="262" r="2.8" />
        </g>
        {/* teeth on the great wheel */}
        <g fill="#4a4a6a" opacity="0.8">
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x="-2.2" y="-25.5" width="4.4" height="6" rx="1" transform={`translate(760,270) rotate(${i * 22.5})`} />
          ))}
        </g>
        {/* teeth on the middle pinion */}
        <g fill="#56568a" opacity="0.75">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x="-1.8" y="-15.6" width="3.6" height="5" rx="0.8" transform={`translate(812,258) rotate(${i * 36 + 11})`} />
          ))}
        </g>
        {/* a connecting rod to a slow beam pump */}
        <path d="M790,286 L880,282 L896,264" fill="none" stroke="#9a9ac9" strokeWidth="1.6" opacity="0.7" />
        <rect x="890" y="254" width="10" height="10" rx="1" fill="none" stroke="#9a9ac9" strokeWidth="1.4" opacity="0.7" />
        {/* oil-light in the machine's heart */}
        <circle cx="760" cy="270" r="3" fill="#c9a8d8" opacity="0.8" />
        <circle cx="760" cy="270" r="30" fill="url(#sc3-window-engine)" opacity="0.3" />
        {/* the kept-out parts: rejected pieces lying beside the work */}
        <g fill="#16162a" stroke="#2c2c48" strokeWidth="0.8">
          <ellipse cx="1090" cy="286" rx="12" ry="5" transform="rotate(-8 1090 286)" />
          <ellipse cx="1122" cy="290" rx="9" ry="4" transform="rotate(14 1122 290)" />
        </g>
        {/* small measurement marks chalked on the opened earth */}
        <g stroke="#56568a" strokeWidth="0.8" opacity="0.6">
          <path d="M600,292 L640,292" /><path d="M600,288 L600,296" /><path d="M640,288 L640,296" />
        </g>
      </g>
    ) as ReactNode,
  },

  std: {
    label: "The floor — hexagonal bedrock laid under still water, tested at every cell",
    sky: ["#0c0f10", "#101518", "#131a1d", "#161e21"],
    clouds: [{ x: 700, y: 56, rx: 320, ry: 18, o: 0.035 }],
    fireflies: [[1420, 262], [340, 266]],
    ridges: [
      { d: "M0,188 C320,176 680,182 1040,172 C1280,166 1480,176 1600,170 L1600,300 L0,300 Z", fill: "#20292e" },
      { d: "M0,224 C340,214 740,220 1100,212 C1340,207 1520,214 1600,210 L1600,300 L0,300 Z", fill: "#171f22" },
    ],
    subjects: (
      <g>
        {/* the hex lattice bedrock, exposed in the near ground */}
        <g stroke="#2c383d" strokeWidth="1.2" fill="none" opacity="0.85">
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => {
              const x = 480 + c * 36 + (r % 2) * 18;
              const y = 236 + r * 12;
              return <path key={`${r}-${c}`} d={`M${x},${y} l18,-6 18,6 -18,6 Z`} />;
            })
          )}
        </g>
        {/* one cell under test: filled and ringed */}
        <path d="M588,254 l18,-6 18,6 -18,6 Z" fill="#8fb8c9" opacity="0.16" />
        <path d="M588,254 l18,-6 18,6 -18,6 Z" fill="none" stroke="#8fb8c9" strokeWidth="1.6" opacity="0.8" />
        {/* a carver's chisel and mason's mallet resting on the floor */}
        <g transform="translate(1120,272) rotate(-14)">
          <rect x="0" y="-2" width="34" height="4" rx="1.6" fill="#3a4a4f" />
          <rect x="32" y="-4" width="10" height="8" rx="2" fill="#5f7161" />
        </g>
        <g transform="translate(1108,286) rotate(10)">
          <rect x="-4" y="-14" width="8" height="14" rx="2" fill="#3a2f22" />
          <rect x="-7" y="-20" width="14" height="8" rx="2.4" fill="#5a4a3a" />
        </g>
        {/* still water pooling over the far lattice — the tests run over everything */}
        <path d="M0,262 C400,256 800,258 1200,254 C1440,251 1580,256 1600,252 L1600,300 L0,300 Z" fill="#0d1519" opacity="0.6" />
        <g stroke="#1c2930" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M240,272 q14,-3 28,0 M300,282 q14,-3 28,0" />
        </g>
      </g>
    ) as ReactNode,
  },

  physics: {
    label: "Bodies in contact — a resting stack, forces drawn faint, starlight on the solver's work",
    sky: ["#0e0c10", "#141119", "#191622", "#1e1a2c"],
    light: { x: 1120, y: 86, r: 26, core: "#dcd6ea", glow: "#c9a8d8" },
    clouds: [{ x: 400, y: 48, rx: 280, ry: 16, o: 0.04 }],
    ridges: [
      { d: "M0,180 C300,168 700,174 1100,164 C1320,159 1500,168 1600,164 L1600,300 L0,300 Z", fill: "#2a2434" },
      { d: "M0,226 C340,216 740,222 1140,214 C1360,209 1520,216 1600,212 L1600,300 L0,300 Z", fill: "#1e1a28" },
    ],
    subjects: (
      <g>
        <path d="M0,262 C400,256 800,258 1200,254 C1440,251 1580,256 1600,254 L1600,300 L0,300 Z" fill="#120f18" />
        {/* the stack: three bodies resting, contact graph drawn between them */}
        <g fill="#181422" stroke="#3a3050" strokeWidth="1.2">
          <rect x="880" y="246" width="20" height="16" rx="1.5" />
          <rect x="904" y="246" width="20" height="16" rx="1.5" />
          <rect x="892" y="228" width="20" height="16" rx="1.5" />
        </g>
        {/* contact points, glowing, connected by the constraint graph */}
        <g>
          <circle cx="900" cy="262" r="1.8" fill="#c9a8d8" opacity="0.85" />
          <circle cx="924" cy="262" r="1.8" fill="#c9a8d8" opacity="0.85" />
          <circle cx="912" cy="244" r="1.8" fill="#c9a8d8" opacity="0.85" />
          <g stroke="#3a3050" strokeWidth="0.7" opacity="0.5" fill="none">
            <path d="M900,262 C906,254 906,252 912,244" />
            <path d="M924,262 C918,254 918,252 912,244" />
          </g>
        </g>
        {/* normal and friction arrows at the ground contacts */}
        <g stroke="#c9a8d8" strokeWidth="0.9" opacity="0.55">
          <path d="M900,262 L900,250" />
          <path d="M900,250 l-2.4,3 4.8,0 Z" fill="#c9a8d8" />
          <path d="M924,262 L924,250" />
          <path d="M924,250 l-2.4,3 4.8,0 Z" fill="#c9a8d8" />
        </g>
        {/* faint gravity vectors, dashed */}
        <g stroke="#3a3050" strokeWidth="0.8" opacity="0.35" strokeDasharray="2 6">
          <path d="M902,224 L902,206" />
          <path d="M912,206 L912,188" />
        </g>
        {/* a solved frame's ghost: the old position, faded */}
        <rect x="862" y="230" width="20" height="16" rx="1.5" fill="none" stroke="#241e34" strokeWidth="1" strokeDasharray="2 5" opacity="0.7" />
        {/* the iteration counter burning quietly in the dark */}
        <g stroke="#3a3050" strokeWidth="1" opacity="0.6">
          <path d="M770,258 L770,268 M774,258 L774,268 M778,258 L778,268 M782,258 L782,268 M786,258 L786,268" />
          <path d="M770,268 L786,268" />
        </g>
        <text x="784" y="254" fontSize="7" fill="#c9a8d8" opacity="0.5" fontFamily="monospace" textAnchor="middle">sweeps</text>
      </g>
    ) as ReactNode,
  },

  renderer: {
    label: "Light, arranged honestly — a ray crossing tiles, depth sorted per pixel",
    sky: ["#0a0d0f", "#0e1417", "#121a1e", "#16211f"],
    light: { x: 260, y: 92, r: 28, core: "#dfe9e4", glow: "#8fb8c9" },
    clouds: [{ x: 1000, y: 54, rx: 300, ry: 16, o: 0.035 }],
    ridges: [
      { d: "M0,182 C320,170 720,176 1120,166 C1340,161 1520,170 1600,166 L1600,300 L0,300 Z", fill: "#1e2c33" },
      { d: "M0,222 C360,212 760,218 1160,208 C1380,203 1530,212 1600,208 L1600,300 L0,300 Z", fill: "#141f24" },
    ],
    subjects: (
      <g>
        <path d="M0,256 C400,250 800,252 1200,248 C1440,245 1580,250 1600,248 L1600,300 L0,300 Z" fill="#0b1216" />
        {/* the screen of tiles — a frame being filled row by row */}
        <g fill="#13202a" stroke="#1e3240" strokeWidth="1">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={900 + c * 26} y={196 + r * 22} width="24" height="20" rx="1.5" />
            ))
          )}
        </g>
        {/* filled tiles: a triangle rasterizing, nearest rows brightest */}
        <g fill="#8fb8c9">
          <rect x="952" y="262" width="24" height="20" rx="1.5" opacity="0.55" />
          <rect x="978" y="262" width="24" height="20" rx="1.5" opacity="0.45" />
          <rect x="926" y="240" width="24" height="20" rx="1.5" opacity="0.65" />
          <rect x="952" y="240" width="24" height="20" rx="1.5" opacity="0.75" />
          <rect x="930" y="218" width="24" height="20" rx="1.5" opacity="0.85" />
          <rect x="956" y="218" width="24" height="20" rx="1.5" opacity="0.8" />
        </g>
        {/* per-pixel depth dots inside one tile — the oracle's work */}
        <g fill="#dfe9e4" opacity="0.7">
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={933 + i * 4.4} cy={224 + (i % 3) * 3.4} r="0.7" />
          ))}
        </g>
        {/* the light ray, striking the frame */}
        <path d="M292,120 C520,180 760,220 964,262" stroke="#8fb8c9" strokeWidth="1" strokeDasharray="3 7" opacity="0.4" fill="none" />
        {/* a second frame already finished, beside it — pipeline depth */}
        <g fill="#0e1820" stroke="#182634" strokeWidth="1" opacity="0.8">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={1180 + c * 26} y={212 + r * 22} width="24" height="20" rx="1.5" fill="#13202a" />
            ))
          )}
        </g>
        {/* a rejected buffer, kept faint in the corner — the failed fast path */}
        <g fill="#13202a" stroke="#261e2c" strokeWidth="1" opacity="0.6">
          <rect x="600" y="242" width="24" height="20" rx="1.5" />
          <rect x="626" y="242" width="24" height="20" rx="1.5" />
          <path d="M600,252 L650,252" stroke="#261e2c" strokeWidth="1.6" />
        </g>
      </g>
    ) as ReactNode,
  },

  doctrine: {
    label: "The doctrine — a great balance scale under stars: claims weighed before they are believed",
    sky: ["#0a0c12", "#0e1118", "#12141f", "#161a28"],
    light: { x: 1340, y: 84, r: 26, core: "#e6e0f4", glow: "#c9c2ea" },
    clouds: [{ x: 500, y: 44, rx: 320, ry: 16, o: 0.04 }],
    ridges: [
      { d: "M0,196 C300,186 700,190 1100,180 C1320,175 1500,184 1600,180 L1600,300 L0,300 Z", fill: "#1c1e30" },
      { d: "M0,238 C340,230 740,234 1140,226 C1360,222 1520,230 1600,226 L1600,300 L0,300 Z", fill: "#141624" },
    ],
    subjects: (
      <g>
        <path d="M0,270 C400,264 800,266 1200,262 C1440,259 1580,264 1600,262 L1600,300 L0,300 Z" fill="#0d0e18" />
        {/* the great balance: a tall stand, a beam, two pans */}
        <g stroke="#3d4160" strokeWidth="2.4" fill="none">
          <path d="M770,282 L770,182" />
          <path d="M742,282 L798,282" />
          <path d="M770,182 L700,204" />
          <path d="M770,182 L840,204" />
        </g>
        {/* the pans: one heavy with a measured stone, one lighter */}
        <g>
          {/* left pan — the claim, a rough stone */}
          <g stroke="#3d4160" strokeWidth="1.4">
            <path d="M700,204 L694,226 M700,204 L706,226" />
          </g>
          <path d="M688,226 A12,6 0 0 0 712,226 Z" fill="#23263e" stroke="#3d4160" strokeWidth="1.4" />
          <ellipse cx="700" cy="226" rx="12" ry="4.4" fill="#2a2d4a" stroke="#3d4160" strokeWidth="1" />
          {/* the stone: irregular, heavy */}
          <path d="M693,226 l3,-9 8,-2 6,5 -1,6 Z" fill="#3a3d5c" stroke="#4a4e70" strokeWidth="0.8" />
          {/* right pan — the evidence: an exact weight, stamped */}
          <g stroke="#3d4160" strokeWidth="1.4">
            <path d="M840,204 L834,230 M840,204 L846,230" />
          </g>
          <path d="M828,230 A12,6 0 0 0 852,230 Z" fill="#23263e" stroke="#3d4160" strokeWidth="1.4" />
          <ellipse cx="840" cy="230" rx="12" ry="4.4" fill="#2a2d4a" stroke="#3d4160" strokeWidth="1" />
          {/* the stamped weight: geometric, certain */}
          <path d="M833,230 l2,-8 6,-3 5,4 -1,7 Z" fill="#4a4e70" stroke="#5a5e80" strokeWidth="0.8" />
          <circle cx="841" cy="224" r="1.4" fill="#0d0e18" opacity="0.7" />
        </g>
        {/* the beam tips slightly toward the evidence — it must outweigh the claim */}
        <circle cx="770" cy="182" r="3.4" fill="#c9a8d8" opacity="0.85" />
        {/* calibration marks on the stand: the frozen thresholds */}
        <g stroke="#565a86" strokeWidth="0.9" opacity="0.7">
          <path d="M756,200 L770,200" /><path d="M758,214 L770,214" /><path d="M760,228 L770,228" />
        </g>
        {/* a rejected claim lying on the ground, below the left pan */}
        <g transform="translate(612,282) rotate(-9)">
          <path d="M0,0 l14,-4 10,5 -3,5 -14,2 Z" fill="#3a2c2e" stroke="#4a3a3c" strokeWidth="0.8" />
        </g>
        {/* a second one, older, half-buried — the kept failures */}
        <g transform="translate(566,290) rotate(6)">
          <path d="M0,0 l12,-3 8,4 -2,4 -12,1 Z" fill="#2c2224" stroke="#3a2c2e" strokeWidth="0.8" />
        </g>
        {/* the queue of claims waiting: small stones on the ground, right */}
        <g fill="#23263e" stroke="#3a3d5c" strokeWidth="0.7">
          <ellipse cx="920" cy="288" rx="8" ry="3.4" />
          <ellipse cx="944" cy="292" rx="6" ry="3" />
          <ellipse cx="962" cy="288" rx="7" ry="3.2" />
        </g>
      </g>
    ) as ReactNode,
  },

  thoughts: {
    label: "The thought database — constellations over a dark lake: points joined into shapes, remembered",
    sky: ["#080a12", "#0b0e18", "#0e1220", "#12162a"],
    farStars: true,
    clouds: [{ x: 700, y: 40, rx: 360, ry: 18, o: 0.035 }, { x: 1300, y: 60, rx: 280, ry: 14, o: 0.03 }],
    ridges: [
      { d: "M0,210 C320,200 700,204 1100,194 C1320,189 1500,198 1600,194 L1600,300 L0,300 Z", fill: "#181b2e" },
      { d: "M0,246 C340,238 740,242 1140,234 C1360,230 1520,238 1600,234 L1600,300 L0,300 Z", fill: "#10121f" },
    ],
    subjects: (
      <g>
        <path d="M0,272 C400,266 800,268 1200,264 C1440,261 1580,266 1600,264 L1600,300 L0,300 Z" fill="#0a0c16" />
        {/* constellation 1 — the Wanderer, high left: staff, head, steps */}
        <g stroke="#c9c2ea" strokeWidth="0.9" opacity="0.55" fill="none">
          <path d="M300,70 L310,96 L282,124 L314,148 L296,174" />
          <path d="M310,96 L342,120 L314,148" />
        </g>
        <g fill="#e6e0f4">
          <circle cx="300" cy="70" r="2.2" /><circle cx="310" cy="96" r="1.8" />
          <circle cx="282" cy="124" r="1.6" /><circle cx="342" cy="120" r="1.4" />
          <circle cx="314" cy="148" r="2" /><circle cx="296" cy="174" r="1.6" />
        </g>
        {/* constellation 2 — the Bear, center-right: the shoulder and the long nose */}
        <g stroke="#c9c2ea" strokeWidth="0.9" opacity="0.5" fill="none">
          <path d="M900,60 L944,76 L956,110 L928,124 L890,104 Z" />
          <path d="M944,76 L986,88" />
        </g>
        <g fill="#e6e0f4">
          <circle cx="900" cy="60" r="2" /><circle cx="944" cy="76" r="1.6" />
          <circle cx="956" cy="110" r="1.8" /><circle cx="928" cy="124" r="1.4" />
          <circle cx="890" cy="104" r="1.6" /><circle cx="986" cy="88" r="1.8" />
        </g>
        {/* constellation 3 — the Scale, low right, slightly fainter */}
        <g stroke="#c9c2ea" strokeWidth="0.8" opacity="0.4" fill="none">
          <path d="M1250,110 L1250,150 M1250,120 L1224,138 M1250,120 L1276,138" />
        </g>
        <g fill="#e6e0f4" opacity="0.85">
          <circle cx="1250" cy="110" r="1.6" /><circle cx="1250" cy="150" r="1.4" />
          <circle cx="1224" cy="138" r="1.4" /><circle cx="1276" cy="138" r="1.4" />
          <circle cx="1250" cy="120" r="2" />
        </g>
        {/* the lake: one constellation reflected, broken */}
        <g fill="#c9c2ea" opacity="0.3">
          <circle cx="314" cy="284" r="1.4" /><circle cx="300" cy="288" r="1.1" /><circle cx="296" cy="292" r="0.9" />
        </g>
        {/* faint horizon mist */}
        <ellipse cx="500" cy="252" rx="380" ry="10" fill="#cdd7d4" opacity="0.04" filter="url(#sc3-blur2-thoughts)" />
      </g>
    ) as ReactNode,
  },

  docs: {
    label: "The atlas room — a reading table under lamplight: maps, instruments, the whole project in one place",
    sky: ["#0d0f12", "#11141a", "#141821", "#181d28"],
    clouds: [{ x: 800, y: 48, rx: 320, ry: 16, o: 0.035 }],
    ridges: [
      { d: "M0,200 C300,190 700,194 1100,184 C1320,179 1500,188 1600,184 L1600,300 L0,300 Z", fill: "#1c202c" },
      { d: "M0,240 C340,232 740,236 1140,228 C1360,224 1520,232 1600,228 L1600,300 L0,300 Z", fill: "#141824" },
    ],
    subjects: (
      <g>
        <path d="M0,268 C400,262 800,264 1200,260 C1440,257 1580,262 1600,260 L1600,300 L0,300 Z" fill="#0d1017" />
        {/* the great reading table, center */}
        <g>
          <rect x="620" y="248" width="360" height="10" rx="2.5" fill="#22262f" stroke="#323846" strokeWidth="1" />
          <path d="M660,258 L652,292 M940,258 L948,292" stroke="#22262f" strokeWidth="6" />
          <path d="M660,292 L940,292" stroke="#22262f" strokeWidth="3" opacity="0.7" />
        </g>
        {/* the open atlas on the table: the world map */}
        <g transform="translate(700,236)">
          <path d="M0,12 L10,0 L86,0 L96,12 L96,20 L0,20 Z" fill="#1a1f2c" stroke="#323846" strokeWidth="0.9" />
          <path d="M48,0 L48,20" stroke="#323846" strokeWidth="0.7" />
          {/* coastlines and mountains, drawn small */}
          <g stroke="#4a5568" strokeWidth="0.7" fill="none">
            <path d="M14,8 q6,-4 12,0 q6,4 12,0" />
            <path d="M56,6 q5,-3 10,0" />
          </g>
          <path d="M26,5 l3,-4 3,4 Z M60,14 l2.4,-3.2 2.4,3.2 Z" fill="#4a5568" />
        </g>
        {/* the dividers and rule, lying beside the map */}
        <g transform="translate(838,238) rotate(8)">
          <path d="M0,0 L0,14 M0,2 L10,10 M0,2 L-10,10" stroke="#8fb8c9" strokeWidth="1" fill="none" opacity="0.8" />
          <circle cx="0" cy="2" r="1.4" fill="none" stroke="#8fb8c9" strokeWidth="0.8" opacity="0.8" />
        </g>
        <rect x="864" y="242" width="26" height="3.6" rx="1" fill="#3a4050" opacity="0.9" />
        {/* a lamp on the table, left: the warm center of the room */}
        <g>
          <rect x="662" y="232" width="3" height="6" rx="1" fill="#5a4a3a" />
          <path d="M656,232 L664,220 L672,232 Z" fill="#3a2f22" stroke="#5a4a3a" strokeWidth="0.9" />
          <ellipse cx="664" cy="226" rx="4.4" ry="5" fill="#ffca85" opacity="0.9" />
          <circle cx="664" cy="226" r="30" fill="url(#sc3-window-docs)" opacity="0.5" />
        </g>
        {/* shelves of ledgers behind, dark */}
        <g fill="#151823" stroke="#283042" strokeWidth="0.8">
          <rect x="130" y="206" width="220" height="66" rx="2" />
          <rect x="1250" y="206" width="220" height="66" rx="2" />
        </g>
        <g stroke="#283042" strokeWidth="1">
          <path d="M134,228 L346,228 M134,252 L346,252" />
          <path d="M1254,228 L1466,228 M1254,252 L1466,252" />
        </g>
        {/* ledger spines, varying */}
        <g fill="#1e2230">
          {[[142, 232, 8], [154, 232, 10], [168, 232, 7], [180, 232, 9], [194, 232, 8], [142, 256, 9], [156, 256, 7], [170, 256, 10]].map(([x, y, h], i) => (
            <rect key={i} x={x as number} y={y as number} width="4.4" height={h as number} rx="0.8" />
          ))}
          {[[1262, 232, 9], [1276, 232, 7], [1290, 232, 10], [1304, 232, 8], [1262, 256, 8], [1276, 256, 10], [1292, 256, 7]].map(([x, y, h], i) => (
            <rect key={`r${i}`} x={x as number} y={y as number} width="4.4" height={h as number} rx="0.8" />
          ))}
        </g>
        {/* one red spine among the ledgers — the kept failure, shelved with the rest */}
        <rect x="186" y="232" width="4.4" height="9" rx="0.8" fill="#6a3a3a" stroke="#8a4a4a" strokeWidth="0.6" />
        {/* a scroll rolled on the shelf, and stacked letters */}
        <g transform="translate(320,244)">
          <rect x="0" y="0" width="18" height="5" rx="2.5" fill="#2a2f3e" />
        </g>
        <g fill="#22262f">
          <rect x="1420" y="266" width="20" height="4" rx="0.8" />
          <rect x="1424" y="262" width="16" height="4" rx="0.8" />
        </g>
      </g>
    ) as ReactNode,
  },

  gates: {
    label: "The gatehouse — a narrow door in a strong wall: everything passes one check or turns back",
    sky: ["#0d0e10", "#111318", "#141620", "#171924"],
    clouds: [{ x: 700, y: 52, rx: 340, ry: 18, o: 0.04 }],
    fireflies: [[380, 262], [1240, 266], [1520, 260]],
    ridges: [
      { d: "M0,204 C300,194 700,198 1100,188 C1320,183 1500,192 1600,188 L1600,300 L0,300 Z", fill: "#1b1e28" },
      { d: "M0,244 C340,236 740,240 1140,232 C1360,228 1520,236 1600,232 L1600,300 L0,300 Z", fill: "#13151e" },
    ],
    subjects: (
      <g>
        <path d="M0,272 C400,266 800,268 1200,264 C1440,261 1580,266 1600,264 L1600,300 L0,300 Z" fill="#0b0d12" />
        {/* the wall, spanning */}
        <g fill="#181b26">
          <rect x="480" y="196" width="640" height="86" />
          {/* crenellation */}
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x={488 + i * 40} y="184" width="24" height="14" />
          ))}
        </g>
        {/* stone coursing, faint */}
        <g stroke="#232838" strokeWidth="0.7" opacity="0.7">
          <path d="M484,216 L1116,216" /><path d="M484,236 L1116,236" /><path d="M484,256 L1116,256" />
          <path d="M560,196 L560,216" /><path d="M680,216 L680,236" /><path d="M800,196 L800,216" />
          <path d="M920,236 L920,256" /><path d="M1040,196 L1040,216" />
        </g>
        {/* the gate: heavy timber, pointed arch, warm interior light behind */}
        <path d="M740,282 L740,240 Q740,222 800,222 Q860,222 860,240 L860,282 Z" fill="#0c0e14" />
        <path d="M748,282 L748,242 Q748,228 800,228 Q852,228 852,242 L852,282 Z" fill="#1a1208" />
        <path d="M748,282 L748,242 Q748,228 800,228 Q852,228 852,242 L852,282 Z" fill="#e8a052" opacity="0.14" />
        <circle cx="800" cy="256" r="42" fill="url(#sc3-window-gates)" opacity="0.5" />
        {/* timber planks on the open gate leaves, swung inward */}
        <g stroke="#2c2416" strokeWidth="2.4" opacity="0.95">
          <path d="M748,282 L726,246" /><path d="M756,282 L736,250" />
          <path d="M852,282 L874,246" /><path d="M844,282 L864,250" />
        </g>
        {/* the two gates' iron bands */}
        <path d="M726,252 L748,286 M874,252 L852,286" stroke="#3a3226" strokeWidth="1.6" />
        {/* a lantern hung beside the gate — the check is done by light, not force */}
        <g>
          <rect x="700" y="228" width="3" height="7" rx="1" fill="#5a4a3a" />
          <path d="M696,235 L707,235 L705,244 L698,244 Z" fill="#3a2f22" stroke="#5a4a3a" strokeWidth="0.8" />
          <ellipse cx="701.5" cy="239" rx="2.6" ry="3.4" fill="#ffca85" opacity="0.9" />
          <circle cx="701" cy="239" r="22" fill="url(#sc3-window-gates)" opacity="0.45" />
        </g>
        {/* travelers at the gate: one passing, one turned back */}
        <g transform="translate(620,258)" fill="#0c0e14">
          <path d="M0,16 l1,-9 q0,-2.6 1,-3.8 l2.6,0 q1,2.6 1,5.4 l-1.2,7.4 Z" />
          <circle cx="2.6" cy="-8" r="2" />
          <path d="M1,-9.6 q2,-1.4 3.4,0 l0.8,2.2 q-2.2,-0.6 -4.4,-0.6 Z" />
        </g>
        {/* the turned-away figure, walking off left, shoulders dropped */}
        <g transform="translate(560,260) scale(-1,1)" fill="#0c0e14" opacity="0.85">
          <path d="M0,16 l1,-9 q0,-2.6 1,-3.8 l2.6,0 q1,2.6 1,5.4 l-1.2,7.4 Z" />
          <circle cx="2.6" cy="-8" r="2" />
          <path d="M1,-9.6 q2,-1.4 3.4,0 l0.8,2.2 q-2.2,-0.6 -4.4,-0.6 Z" />
          {/* head bowed: no hood brim raised */}
        </g>
        {/* the road through, worn stones */}
        <g fill="#141824">
          <ellipse cx="800" cy="290" rx="30" ry="6" opacity="0.9" />
          <ellipse cx="800" cy="296" rx="44" ry="7" opacity="0.6" />
        </g>
      </g>
    ) as ReactNode,
  },

  research: {
    label: "The library of kept results — ordered shelves, a candle, one red spine: the failure kept",
    sky: ["#080a10", "#0b0d16", "#0f1120", "#131528"],
    light: { x: 1360, y: 78, r: 24, core: "#e6e0f4", glow: "#c9c2ea" },
    clouds: [{ x: 600, y: 46, rx: 300, ry: 16, o: 0.035 }],
    ridges: [
      { d: "M0,204 C300,194 700,200 1100,190 C1320,185 1500,194 1600,190 L1600,300 L0,300 Z", fill: "#1c1e30" },
      { d: "M0,244 C340,236 740,240 1140,232 C1360,228 1520,236 1600,232 L1600,300 L0,300 Z", fill: "#13141f" },
    ],
    subjects: (
      <g>
        {/* the reading room floor */}
        <path d="M0,272 C400,266 800,268 1200,264 C1440,261 1580,266 1600,264 L1600,300 L0,300 Z" fill="#0b0c14" />
        {/* tall shelves — era 2.x: many spines, uniform order */}
        <g fill="#22243a" stroke="#3a3d5c" strokeWidth="0.8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <rect key={i} x={560 + i * 18} y={210} width="13" height="52" rx="1" />
          ))}
        </g>
        {/* one red spine — the kept failure, never reshelved away */}
        <rect x="650" y="210" width="13" height="52" rx="1" fill="#6a3a3a" stroke="#8a4a4a" strokeWidth="0.8" />
        {/* lower shelves — era 3.x, sparser, newer */}
        <g fill="#22243a" stroke="#3a3d5c" strokeWidth="0.8">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={590 + i * 16} y={270} width="11" height="30" rx="1" />
          ))}
        </g>
        {/* a ledger lying open on the reading desk, with a candle */}
        <g transform="translate(860,272)">
          <rect x="0" y="0" width="44" height="12" rx="1.4" fill="#1a1c2e" stroke="#3a3d5c" strokeWidth="0.8" />
          <path d="M22,0 L22,12" stroke="#3a3d5c" strokeWidth="0.8" />
          <g stroke="#565a86" strokeWidth="0.6" opacity="0.8">
            <path d="M4,4 L19,4" /><path d="M4,7 L19,7" /><path d="M25,4 L40,4" /><path d="M25,7 L40,7" />
          </g>
        </g>
        <g>
          <rect x="920" y="262" width="3" height="8" rx="1" fill="#c9b98a" />
          <ellipse cx="921.5" cy="258" rx="2" ry="3.4" fill="#ffca85" opacity="0.9" />
          <circle cx="921.5" cy="258" r="22" fill="url(#sc3-window-research)" opacity="0.5" />
        </g>
        {/* a ladder to the high shelf — the work continues */}
        <g stroke="#2a2c48" strokeWidth="1.6" opacity="0.85">
          <path d="M1080,208 L1080,282" /><path d="M1096,208 L1096,282" />
          <path d="M1080,218 L1096,218" /><path d="M1080,234 L1096,234" />
          <path d="M1080,250 L1096,250" /><path d="M1080,266 L1096,266" />
        </g>
        {/* the newest acquisition, not yet shelved: lying flat on the desk */}
        <g transform="translate(1140,278)">
          <rect x="0" y="0" width="40" height="10" rx="1.2" fill="#2a2c48" stroke="#3a3d5c" strokeWidth="0.8" />
          <path d="M8,10 L8,3 L32,3 L32,10" fill="none" stroke="#565a86" strokeWidth="0.7" />
        </g>
        {/* open volume: stacked papers with measurement marks */}
        <g transform="translate(1200,280)">
          <rect x="0" y="0" width="34" height="8" rx="1" fill="#1e2036" stroke="#3a3d5c" strokeWidth="0.7" />
          <g stroke="#565a86" strokeWidth="0.5">
            <path d="M5,3 L30,3" /><path d="M5,5 L24,5" />
          </g>
        </g>
      </g>
    ) as ReactNode,
  },
};

export { scenes };

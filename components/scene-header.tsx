import type { ReactNode } from "react";

/**
 * SceneHeader v2 — precise layered illustrations.
 * Every scene is a composed landscape: 4-6 depth layers, correct
 * atmospheric perspective (far = lighter/hazier), a consistent
 * light source per scene, and a unique subject per page.
 */

type SceneSpec = {
  label: string;
  sky: string[];          // gradient stops, top to horizon
  light?: { x: number; y: number; r: number; core: string; glow: string };
  ridges: { d: string; fill: string; pine?: boolean; pineFill?: string; pineScale?: number; pineList?: [number, number, number][] }[];
  subjects?: React.ReactNode;
  birds?: [number, number, number][];
  mist?: { cx: number; cy: number; rx: number; ry: number; o: number }[];
};

const H = 300; // base height of viewBox

function Pines({ list, fill, scale = 1 }: { list: [number, number, number][]; fill: string; scale?: number }) {
  return (
    <g fill={fill}>
      {list.map(([x, y, s], i) => (
        <use key={i} href="#sc-pine" transform={`translate(${x},${y}) scale(${s * scale})`} />
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
  const stars: [number, number, number, number][] = [
    [90, 26, 1.1, 0.55], [260, 58, 0.8, 0.4], [420, 20, 1.3, 0.6], [610, 44, 0.9, 0.45],
    [790, 16, 1, 0.5], [950, 52, 1.4, 0.65], [1120, 28, 0.9, 0.4], [1290, 60, 1.2, 0.55],
    [1470, 22, 1, 0.5], [700, 90, 0.7, 0.3], [380, 110, 0.8, 0.3],
  ];

  const S = scenes[scene] ?? scenes.premise;

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
          <linearGradient id={`sc2-sky-${scene}`} x1="0" y1="0" x2="0" y2="1">
            {S.sky.map((c, i) => (
              <stop key={i} offset={`${Math.round((i / (S.sky.length - 1)) * 100)}%`} stopColor={c} />
            ))}
          </linearGradient>
          <radialGradient id={`sc2-glow-${scene}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={S.light?.glow ?? "#cdd7d4"} stopOpacity="0.5" />
            <stop offset="55%" stopColor={S.light?.glow ?? "#cdd7d4"} stopOpacity="0.14" />
            <stop offset="100%" stopColor={S.light?.glow ?? "#cdd7d4"} stopOpacity="0" />
          </radialGradient>
          <filter id={`sc2-blur-${scene}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id={`sc2-blur2-${scene}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
          <g id="sc-pine">
            <path d="M-1.4,0 L1.4,0 L1,-9 L-1,-9 Z" />
            <path d="M-10,-4 L10,-4 L0,-36 Z" />
            <path d="M-8.4,-28 L8.4,-28 L0,-56 Z" />
            <path d="M-6.6,-48 L6.6,-48 L0,-74 Z" />
          </g>
          <g id="sc-bird">
            <path d="M-7,0 Q-3.5,-5 0,-1.2 Q3.5,-5 7,0" fill="none" stroke-width="1.6" />
          </g>
        </defs>

        <rect width="1600" height={H} fill={`url(#sc2-sky-${scene})`} />

        {/* light source */}
        {S.light && (
          <>
            <circle cx={S.light.x} cy={S.light.y} r={S.light.r * 3.4} fill={`url(#sc2-glow-${scene})`} />
            <circle cx={S.light.x} cy={S.light.y} r={S.light.r} fill={S.light.core} opacity="0.96" />
            {S.light.r > 30 && (
              <>
                <circle cx={S.light.x - S.light.r * 0.3} cy={S.light.y - S.light.r * 0.2} r={S.light.r * 0.16} fill="#56523f" opacity="0.1" />
                <circle cx={S.light.x + S.light.r * 0.28} cy={S.light.y + S.light.r * 0.3} r={S.light.r * 0.11} fill="#56523f" opacity="0.09" />
              </>
            )}
          </>
        )}

        {stars.map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#dfe6dd" opacity={o} className="wwa-twinkle" style={{ animationDelay: `${(i % 5) * 1.4}s` }} />
        ))}

        {/* ridges back to front */}
        {S.ridges.map((r, i) => (
          <g key={i}>
            <path d={r.d} fill={r.fill} />
            {r.pine && (
              <Pines list={r.pineList ?? []} fill={r.pineFill ?? r.fill} scale={r.pineScale ?? 1} />
            )}
          </g>
        ))}

        {/* mist bands between layers */}
        {S.mist?.map((m, i) => (
          <ellipse
            key={i}
            cx={m.cx}
            cy={m.cy}
            rx={m.rx}
            ry={m.ry}
            fill="#cdd7d4"
            opacity={m.o}
            filter={`url(#sc2-blur2-${scene})`}
            className={i % 2 ? "wwa-mist-b" : "wwa-mist-a"}
          />
        ))}

        {/* birds */}
        {S.birds?.map(([x, y, s], i) => (
          <use key={i} href="#sc-bird" transform={`translate(${x},${y}) scale(${s})`} stroke="#0a120e" opacity="0.55" />
        ))}

        {S.subjects}
      </svg>
    </div>
  );
}

/* ---------- scene definitions ---------- */


const scenes: Record<string, SceneSpec> = {
  premise: {
    label: "A green valley at dusk — meadow, forest, distant peak",
    sky: ["#0a1611", "#10221a", "#173023", "#1e3b2a"],
    light: { x: 1210, y: 118, r: 40, core: "#e9e4cf", glow: "#d8d2ba" },
    ridges: [
      { d: "M0,150 C220,120 380,138 560,124 C740,110 880,140 1060,126 C1240,112 1400,136 1600,122 L1600,300 L0,300 Z", fill: "#26453a" },
      { d: "M0,182 C260,158 460,168 660,158 C860,148 1020,170 1220,158 C1380,149 1520,164 1600,156 L1600,300 L0,300 Z", fill: "#1e3a2c",
        pine: true, pineFill: "#1a3428", pineScale: 0.5,
        pineList: [[80, 190, 0.9], [200, 196, 1.1], [340, 192, 0.8], [500, 198, 1.2], [700, 190, 1], [900, 196, 1.1], [1120, 192, 0.9], [1320, 198, 1.2], [1500, 190, 0.8]] },
      { d: "M0,226 C300,204 520,214 760,204 C1000,194 1180,216 1400,206 C1500,202 1560,206 1600,204 L1600,300 L0,300 Z", fill: "#152a1f" },
      { d: "M0,258 C240,242 480,252 720,244 C960,236 1180,252 1420,242 C1520,238 1580,242 1600,240 L1600,300 L0,300 Z", fill: "#0d1b14" },
    ],
    mist: [
      { cx: 480, cy: 236, rx: 360, ry: 16, o: 0.05 },
      { cx: 1180, cy: 252, rx: 320, ry: 14, o: 0.045 },
    ],
    birds: [[620, 100, 1.1], [660, 108, 0.8], [700, 98, 0.9]],
  },

  emergence: {
    label: "Dawn over a wetland — reeds, water, waking life",
    sky: ["#0d1108", "#141d0e", "#1a2712", "#223316"],
    light: { x: 820, y: 168, r: 34, core: "#f0d9a8", glow: "#e8b05f" },
    ridges: [
      { d: "M0,178 C280,160 540,168 800,158 C1060,148 1300,168 1600,156 L1600,300 L0,300 Z", fill: "#2a3d22" },
      { d: "M0,212 C320,198 600,206 880,196 C1120,188 1360,206 1600,196 L1600,300 L0,300 Z", fill: "#1f3019" },
      { d: "M0,252 C280,240 620,248 900,240 C1180,232 1420,246 1600,238 L1600,300 L0,300 Z", fill: "#152313" },
    ],
    mist: [
      { cx: 520, cy: 226, rx: 400, ry: 14, o: 0.07 },
      { cx: 1220, cy: 244, rx: 320, ry: 12, o: 0.06 },
    ],
    birds: [[1000, 92, 1.3], [1046, 100, 1], [1090, 88, 1.1]],
    subjects: (
      <g>
        {/* heron standing in shallows */}
        <g transform="translate(330,238)" fill="#0e1a10">
          <path d="M0,0 l-2,-8 q-1,-3 1,-6 l1,-9 q0,-2 1,-3 l3,-1 q2,0 2,2 l-1,4 q-1,3 -1,6 l1,8 q0,4 -2,7 Z" />
          <path d="M6,-26 l7,-6 2,2 -7,6 Z" />
          <path d="M15,-32 l5,-2 q2,0 1,2 l-5,3 Z" />
        </g>
        {/* reeds */}
        <g stroke="#3a5244" strokeWidth="2" opacity="0.85">
          {[[130, 262, 14], [152, 268, 18], [176, 260, 12], [1150, 266, 16], [1174, 272, 20], [1198, 262, 13]].map(([x, y, h], i) => (
            <path key={i} d={`M${x},${y} q3,-${h / 2} -2,-${h}`} fill="none" />
          ))}
        </g>
        {/* water glint under dawn */}
        <ellipse cx="820" cy="262" rx="180" ry="8" fill="#e8b05f" opacity="0.08" filter="url(#sc2-blur2-emergence)" />
      </g>
    ) as ReactNode,
  },

  observation: {
    label: "A cold lake under low moon — a watcher on the shore",
    sky: ["#080d14", "#0c1520", "#101c2a", "#142636"],
    light: { x: 500, y: 96, r: 32, core: "#e6e9e4", glow: "#b8c9c4" },
    ridges: [
      { d: "M0,172 C240,148 420,162 640,150 C860,138 1040,164 1260,150 C1440,139 1560,158 1600,150 L1600,300 L0,300 Z", fill: "#1c2f3c" },
      { d: "M0,206 C300,188 560,196 820,188 C1080,180 1320,198 1600,188 L1600,300 L0,300 Z", fill: "#142530" },
      { d: "M0,246 C260,234 540,240 800,234 C1060,228 1300,240 1600,232 L1600,300 L0,300 Z", fill: "#0d1a22" },
    ],
    mist: [{ cx: 900, cy: 236, rx: 420, ry: 14, o: 0.05 }],
    birds: [[1180, 84, 1], [1216, 92, 0.8]],
    subjects: (
      <g>
        {/* lake reflection of moon */}
        <g opacity="0.5">
          {[[490, 252, 26, 3.2], [500, 262, 22, 2.6], [494, 272, 18, 2.2], [502, 282, 14, 1.8]].map(([x, y, w, h], i) => (
            <rect key={i} x={x - w / 2} y={y} width={w} height={h} rx={h / 2} fill="#cfd8cd" opacity={0.5 - i * 0.1} filter="url(#sc2-blur-observation)" />
          ))}
        </g>
        {/* wolf silhouette on shore, head raised, watching */}
        <g transform="translate(1290,242)" fill="#0a141c">
          <path d="M0,8 q-2,-6 2,-9 q-4,-2 -6,-6 q10,-4 14,1 q3,-6 9,-4 q7,2 6,8 q-1,4 -5,5 q3,3 1,5 Z" />
          <path d="M20,-8 l7,-3 1,2 -7,3 Z" />
          <path d="M27,-14 q3,0 3,2 l-3,1 Z" />
          <path d="M4,-6 l-9,1 -2,3 9,-1 Z" opacity="0.7" />
          <path d="M2,8 l-14,2 -1,2 14,-2 Z" opacity="0.7" />
        </g>
      </g>
    ) as ReactNode,
  },

  roadmap: {
    label: "A dark pass between peaks — the road ahead unlit",
    sky: ["#0d0a10", "#120e16", "#181322", "#1e1930"],
    light: { x: 1380, y: 74, r: 26, core: "#dcd6ea", glow: "#c9c2ea" },
    ridges: [
      { d: "M0,120 C160,84 300,108 460,84 C620,60 760,110 920,80 C1080,52 1240,104 1400,74 C1500,58 1570,80 1600,70 L1600,300 L0,300 Z", fill: "#2a2438" },
      { d: "M0,170 C200,140 400,152 600,136 C800,120 1000,152 1200,130 C1360,113 1520,140 1600,128 L1600,300 L0,300 Z", fill: "#201a2c" },
      { d: "M0,214 C240,192 480,200 720,188 C960,176 1200,198 1440,186 C1540,181 1590,188 1600,184 L1600,300 L0,300 Z", fill: "#171220" },
      { d: "M0,252 C300,238 600,244 900,236 C1200,228 1420,240 1600,232 L1600,300 L0,300 Z", fill: "#0e0a14" },
    ],
    subjects: (
      <g>
        {/* the pass: a dim road vanishing between the last ridges */}
        <path d="M760,300 C820,280 830,262 840,252 C850,264 862,282 920,300 Z" fill="#151018" />
        <path d="M838,254 C842,250 848,250 852,254 C848,258 842,258 838,254 Z" fill="#d9a662" opacity="0.5" />
      </g>
    ) as ReactNode,
  },

  idea: {
    label: "Sunrise over the world — the first promise",
    sky: ["#0e1210", "#18201a", "#2a2a20", "#3a3324"],
    light: { x: 800, y: 210, r: 46, core: "#f4d9a0", glow: "#e8b05f" },
    ridges: [
      { d: "M0,196 C220,178 420,186 640,176 C860,166 1060,184 1280,172 C1440,164 1560,178 1600,172 L1600,300 L0,300 Z", fill: "#3a3a2e" },
      { d: "M0,230 C280,216 560,222 840,214 C1120,206 1360,220 1600,212 L1600,300 L0,300 Z", fill: "#2c2c22" },
      { d: "M0,262 C320,252 640,256 960,250 C1280,244 1480,252 1600,248 L1600,300 L0,300 Z", fill: "#1c1c16" },
    ],
    mist: [
      { cx: 420, cy: 246, rx: 380, ry: 12, o: 0.07 },
      { cx: 1220, cy: 256, rx: 300, ry: 11, o: 0.06 },
    ],
    birds: [[540, 128, 1.2], [586, 136, 0.9], [630, 126, 1]],
    subjects: (
      <g>
        {/* sun path on low haze */}
        <ellipse cx="800" cy="238" rx="260" ry="18" fill="#e8b05f" opacity="0.12" filter="url(#sc2-blur2-idea)" />
      </g>
    ) as ReactNode,
  },

  plan: {
    label: "Stone foundation under a quiet sky",
    sky: ["#0d1013", "#121719", "#161d20", "#1a2226"],
    ridges: [
      { d: "M0,190 C300,172 600,180 900,170 C1200,160 1440,176 1600,168 L1600,300 L0,300 Z", fill: "#242e33" },
      { d: "M0,232 C300,220 700,226 1000,218 C1300,210 1480,222 1600,216 L1600,300 L0,300 Z", fill: "#1a2327" },
      { d: "M0,268 C400,260 800,262 1200,258 C1440,255 1580,260 1600,258 L1600,300 L0,300 Z", fill: "#11181b" },
    ],
    subjects: (
      <g>
        {/* laid foundation stones, coursed and level */}
        <g fill="#2c383d" stroke="#141c1f" strokeWidth="1">
          <rect x="560" y="252" width="52" height="12" rx="2" />
          <rect x="618" y="252" width="44" height="12" rx="2" />
          <rect x="668" y="252" width="56" height="12" rx="2" />
          <rect x="586" y="238" width="50" height="12" rx="2" />
          <rect x="642" y="238" width="58" height="12" rx="2" />
        </g>
        {/* a level line with plumb bob */}
        <g stroke="#8fb8c9" strokeWidth="1" opacity="0.6">
          <path d="M600,236 L1000,236" strokeDasharray="4 5" />
          <path d="M800,236 L800,254" />
        </g>
        <path d="M800,254 l-3,6 3,4 3,-4 Z" fill="#8fb8c9" opacity="0.6" />
      </g>
    ) as ReactNode,
  },

  steps: {
    label: "Strata — eras kept in the stone",
    sky: ["#100d0e", "#181314", "#201a1c", "#282022"],
    ridges: [
      { d: "M0,150 C200,124 400,138 600,120 C800,102 960,140 1160,118 C1340,100 1500,134 1600,118 L1600,300 L0,300 Z", fill: "#3a2c2e" },
      { d: "M0,196 C260,176 520,186 780,172 C1040,158 1300,184 1600,168 L1600,300 L0,300 Z", fill: "#2c2224" },
      { d: "M0,236 C300,222 640,228 940,220 C1240,212 1440,224 1600,218 L1600,300 L0,300 Z", fill: "#1e1618" },
      { d: "M0,268 C400,260 900,262 1600,256 L1600,300 L0,300 Z", fill: "#120e0f" },
    ],
    subjects: (
      <g>
        {/* exposed strata lines in the nearest cliff */}
        <g stroke="#4a3a3c" strokeWidth="1.4" opacity="0.7">
          <path d="M60,246 C160,240 260,244 360,240" />
          <path d="M60,254 C160,248 260,252 360,248" />
          <path d="M60,262 C160,256 260,260 360,256" />
        </g>
      </g>
    ) as ReactNode,
  },

  systems: {
    label: "Everything interacts — forest, field, and village light",
    sky: ["#0b100d", "#101812", "#152017", "#1a2819"],
    light: { x: 1290, y: 120, r: 30, core: "#e9e4cf", glow: "#cdd7d4" },
    ridges: [
      { d: "M0,168 C280,152 560,158 840,148 C1120,138 1360,158 1600,146 L1600,300 L0,300 Z", fill: "#24382b" },
      { d: "M0,206 C300,192 600,198 900,188 C1200,178 1420,196 1600,188 L1600,300 L0,300 Z", fill: "#1a2c20" },
      { d: "M0,244 C300,234 600,238 900,232 C1200,226 1420,236 1600,230 L1600,300 L0,300 Z", fill: "#111f16" },
    ],
    birds: [[420, 110, 1], [456, 118, 0.8]],
    subjects: (
      <g>
        {/* field rows catching the light */}
        <g stroke="#3a5244" strokeWidth="1.6" opacity="0.8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${200 + i * 34},268 q4,-4 -2,-9`} fill="none" />
          ))}
        </g>
        {/* a distant village: three warm windows */}
        <g fill="#0d1712">
          <path d="M880,240 l14,-12 14,12 v0 Z" />
          <rect x="878" y="240" width="32" height="14" />
          <path d="M935,244 l10,-9 10,9 Z" />
          <rect x="933" y="244" width="24" height="10" />
        </g>
        <g fill="#ffca85">
          <rect x="886" y="244" width="5" height="6" opacity="0.9" />
          <rect x="898" y="244" width="5" height="6" opacity="0.75" />
          <rect x="938" y="247" width="4" height="5" opacity="0.85" />
        </g>
      </g>
    ) as ReactNode,
  },

  demo: {
    label: "The engine breathing — first light on the test yard",
    sky: ["#0a0e0f", "#0e1516", "#121b1c", "#16211f"],
    ridges: [
      { d: "M0,186 C300,172 700,178 1100,168 C1320,163 1500,172 1600,168 L1600,300 L0,300 Z", fill: "#1e302c" },
      { d: "M0,226 C350,214 750,220 1150,210 C1380,205 1520,212 1600,208 L1600,300 L0,300 Z", fill: "#15221f" },
      { d: "M0,262 C400,254 800,258 1200,252 C1440,248 1580,254 1600,252 L1600,300 L0,300 Z", fill: "#0c1513" },
    ],
    subjects: (
      <g>
        {/* the training yard: crates as bodies on a grid, one lit */}
        <g fill="#131f1b" stroke="#22352c" strokeWidth="1">
          <rect x="700" y="242" width="18" height="18" rx="1" />
          <rect x="724" y="242" width="18" height="18" rx="1" />
          <rect x="712" y="224" width="18" height="18" rx="1" />
          <rect x="762" y="252" width="14" height="14" rx="1" />
          <rect x="782" y="252" width="14" height="14" rx="1" />
        </g>
        {/* ground grid hint */}
        <g stroke="#1a2a24" strokeWidth="1" opacity="0.6">
          <path d="M660,268 L960,268" />
          <path d="M660,276 L960,276" opacity="0.5" />
          <path d="M672,258 L672,276" />
          <path d="M736,258 L736,276" />
          <path d="M800,258 L800,276" />
          <path d="M864,258 L864,276" />
        </g>
        <rect x="712" y="224" width="18" height="18" rx="1" fill="#e8a052" opacity="0.28" />
      </g>
    ) as ReactNode,
  },

  engine: {
    label: "The quiet machinery — moon over moving parts",
    sky: ["#0c0c12", "#11111a", "#15151f", "#191926"],
    light: { x: 430, y: 90, r: 30, core: "#ded8f2", glow: "#9a9ac9" },
    ridges: [
      { d: "M0,178 C300,164 700,170 1100,160 C1320,155 1500,164 1600,160 L1600,300 L0,300 Z", fill: "#232338" },
      { d: "M0,222 C350,210 750,216 1150,206 C1370,201 1520,210 1600,206 L1600,300 L0,300 Z", fill: "#191928" },
      { d: "M0,260 C400,252 800,256 1200,250 C1440,246 1580,252 1600,250 L1600,300 L0,300 Z", fill: "#101018" },
    ],
    subjects: (
      <g>
        {/* a great slow gear train at the horizon */}
        <g stroke="#4a4a6a" fill="none" strokeWidth="2" opacity="0.75">
          <circle cx="760" cy="248" r="20" />
          <circle cx="806" cy="238" r="12" />
          <circle cx="716" cy="240" r="9" />
        </g>
        <g fill="#4a4a6a" opacity="0.7">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="758" y="226" width="4" height="5" transform={`rotate(${i * 30} 760 248)`} />
          ))}
        </g>
        <circle cx="760" cy="248" r="4" fill="#9a9ac9" opacity="0.6" />
      </g>
    ) as ReactNode,
  },

  std: {
    label: "The floor — bedrock under still water",
    sky: ["#0c0f10", "#101518", "#131a1d", "#161e21"],
    ridges: [
      { d: "M0,188 C320,176 680,182 1040,172 C1280,166 1480,176 1600,170 L1600,300 L0,300 Z", fill: "#20292e" },
      { d: "M0,224 C340,214 740,220 1100,212 C1340,207 1520,214 1600,210 L1600,300 L0,300 Z", fill: "#171f22" },
      { d: "M0,258 C400,252 800,254 1200,250 C1440,247 1580,252 1600,250 L1600,300 L0,300 Z", fill: "#0e1417" },
    ],
    subjects: (
      <g>
        {/* hexagonal bedrock lattice */}
        <g stroke="#2c383d" strokeWidth="1.2" fill="none" opacity="0.8">
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => {
              const x = 640 + c * 34 + (r % 2) * 17;
              const y = 252 + r * 12;
              return <path key={`${r}-${c}`} d={`M${x},${y} l17,-6 17,6 -17,6 Z`} />;
            })
          )}
        </g>
      </g>
    ) as ReactNode,
  },

  physics: {
    label: "Bodies in contact — a stack resting in starlight",
    sky: ["#0e0c10", "#141119", "#191622", "#1e1a2c"],
    light: { x: 1120, y: 86, r: 26, core: "#dcd6ea", glow: "#c9a8d8" },
    ridges: [
      { d: "M0,180 C300,168 700,174 1100,164 C1320,159 1500,168 1600,164 L1600,300 L0,300 Z", fill: "#2a2434" },
      { d: "M0,226 C340,216 740,222 1140,214 C1360,209 1520,216 1600,212 L1600,300 L0,300 Z", fill: "#1e1a28" },
      { d: "M0,262 C400,256 800,258 1200,254 C1440,251 1580,256 1600,254 L1600,300 L0,300 Z", fill: "#120f18" },
    ],
    subjects: (
      <g>
        {/* a resting stack of bodies, contact points glowing faint */}
        <g fill="#181422" stroke="#3a3050" strokeWidth="1.2">
          <rect x="880" y="246" width="20" height="16" rx="1.5" />
          <rect x="904" y="246" width="20" height="16" rx="1.5" />
          <rect x="892" y="228" width="20" height="16" rx="1.5" />
        </g>
        <g fill="#c9a8d8" opacity="0.75">
          <circle cx="900" cy="262" r="1.8" />
          <circle cx="924" cy="262" r="1.8" />
          <circle cx="912" cy="244" r="1.8" />
          <circle cx="902" cy="246" r="1.2" opacity="0.5" />
        </g>
        {/* faint gravity lines */}
        <g stroke="#3a3050" strokeWidth="0.8" opacity="0.35" strokeDasharray="2 6">
          <path d="M892,224 L892,206" />
          <path d="M912,206 L912,188" />
        </g>
      </g>
    ) as ReactNode,
  },

  renderer: {
    label: "Light, arranged honestly — a ray through pixel tiles",
    sky: ["#0a0d0f", "#0e1417", "#121a1e", "#16211f"],
    light: { x: 260, y: 92, r: 28, core: "#dfe9e4", glow: "#8fb8c9" },
    ridges: [
      { d: "M0,182 C320,170 720,176 1120,166 C1340,161 1520,170 1600,166 L1600,300 L0,300 Z", fill: "#1e2c33" },
      { d: "M0,222 C360,212 760,218 1160,208 C1380,203 1530,212 1600,208 L1600,300 L0,300 Z", fill: "#141f24" },
      { d: "M0,256 C400,250 800,252 1200,248 C1440,245 1580,250 1600,248 L1600,300 L0,300 Z", fill: "#0b1216" },
    ],
    subjects: (
      <g>
        {/* a screen of tiles, one triangle being filled row by row */}
        <g fill="#13202a" stroke="#1e3240" strokeWidth="1">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={900 + c * 26} y={210 + r * 22} width="24" height="20" rx="1.5" />
            ))
          )}
        </g>
        <g fill="#8fb8c9" opacity="0.5">
          <rect x="952" y="254" width="24" height="20" rx="1.5" />
          <rect x="978" y="254" width="24" height="20" rx="1.5" />
          <rect x="926" y="232" width="24" height="20" rx="1.5" opacity="0.7" />
        </g>
        {/* the ray from the light to the tile */}
        <path d="M292,120 C520,180 760,220 964,262" stroke="#8fb8c9" strokeWidth="1" strokeDasharray="3 7" opacity="0.4" fill="none" />
      </g>
    ) as ReactNode,
  },

  research: {
    label: "The library of kept failures — stars over ordered shelves",
    sky: ["#080a10", "#0b0d16", "#0f1120", "#131528"],
    light: { x: 1360, y: 78, r: 24, core: "#e6e0f4", glow: "#c9c2ea" },
    ridges: [
      { d: "M0,204 C300,194 700,200 1100,190 C1320,185 1500,194 1600,190 L1600,300 L0,300 Z", fill: "#1c1e30" },
      { d: "M0,244 C340,236 740,240 1140,232 C1360,228 1520,236 1600,232 L1600,300 L0,300 Z", fill: "#13141f" },
      { d: "M0,272 C400,266 800,268 1200,264 C1440,261 1580,266 1600,264 L1600,300 L0,300 Z", fill: "#0b0c14" },
    ],
    subjects: (
      <g>
        {/* shelf spines, kept and ordered; one red spine — the failure kept */}
        <g fill="#22243a" stroke="#3a3d5c" strokeWidth="0.8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <rect key={i} x={620 + i * 18} y={226} width="13" height="40" rx="1" />
          ))}
        </g>
        <rect x="674" y="226" width="13" height="40" rx="1" fill="#6a3a3a" stroke="#8a4a4a" strokeWidth="0.8" />
        <g fill="#22243a" stroke="#3a3d5c" strokeWidth="0.8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={660 + i * 16} y={272} width="11" height="28" rx="1" />
          ))}
        </g>
        {/* a candle-lit label on one shelf */}
        <circle cx="614" cy="248" r="2" fill="#c9a8d8" opacity="0.8" />
      </g>
    ) as ReactNode,
  },
};

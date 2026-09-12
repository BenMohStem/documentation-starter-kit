type Scene = {
  sky: [string, string, string];
  far: string;
  mid: string;
  near: string;
  accent: string;
  moon?: { x: number; y: number; r: number };
  sun?: { x: number; y: number; r: number; glow: string };
  label: string;
};

const SCENES: Record<string, Scene> = {
  premise: {
    sky: ["#0b1310", "#132019", "#1d3326"],
    far: "#22352c",
    mid: "#17281f",
    near: "#0d1712",
    accent: "#cdd7d4",
    moon: { x: 1180, y: 120, r: 38 },
    label: "A valley at first light",
  },
  emergence: {
    sky: ["#0d110c", "#182417", "#24361f"],
    far: "#2a4034",
    mid: "#1a2a1d",
    near: "#0f1a12",
    accent: "#9ec49a",
    label: "Life finding its shape",
  },
  observation: {
    sky: ["#0a0f14", "#101a22", "#152433"],
    far: "#1d2f3a",
    mid: "#13202a",
    near: "#0b141b",
    accent: "#8fb8c9",
    moon: { x: 520, y: 100, r: 30 },
    label: "Watching the watcher",
  },
  roadmap: {
    sky: ["#100d12", "#1a141d", "#241a28"],
    far: "#302440",
    mid: "#1f1826",
    near: "#120d16",
    accent: "#c9a8d8",
    label: "The road ahead, unlit",
  },
  idea: {
    sky: ["#0c1012", "#141d1c", "#1a2a26"],
    far: "#243830",
    mid: "#182621",
    near: "#0e1814",
    accent: "#d9a662",
    sun: { x: 800, y: 190, r: 46, glow: "#e8b05f" },
    label: "A world that does not wait",
  },
  plan: {
    sky: ["#0d0f12", "#161a1e", "#1d2428"],
    far: "#28323a",
    mid: "#1a2228",
    near: "#10161a",
    accent: "#b8bcbe",
    label: "Foundation before tower",
  },
  steps: {
    sky: ["#0f0c0d", "#191314", "#221a1c"],
    far: "#3a2c2e",
    mid: "#241c1e",
    near: "#151011",
    accent: "#c48a7a",
    label: "Eras kept in the stone",
  },
  systems: {
    sky: ["#0b0f0d", "#122019", "#182b20"],
    far: "#22352c",
    mid: "#16261d",
    near: "#0d1712",
    accent: "#9ec49a",
    label: "Everything interacts",
  },
  demo: {
    sky: ["#0a0e0f", "#101819", "#16211f"],
    far: "#1e302c",
    mid: "#15221f",
    near: "#0c1513",
    accent: "#d9d3bd",
    label: "The engine, breathing",
  },
  engine: {
    sky: ["#0d0d12", "#15151c", "#1b1b26"],
    far: "#26263a",
    mid: "#1a1a28",
    near: "#101018",
    accent: "#9a9ac9",
    label: "The quiet machinery",
  },
  std: {
    sky: ["#0c0f10", "#12171a", "#181f22"],
    far: "#222e33",
    mid: "#161f23",
    near: "#0d1316",
    accent: "#b8c4c9",
    label: "The floor everything stands on",
  },
  physics: {
    sky: ["#0e0c10", "#171319", "#1f1a22"],
    far: "#2e2534",
    mid: "#201a26",
    near: "#130f16",
    accent: "#c9a8d8",
    label: "Bodies remembering",
  },
  renderer: {
    sky: ["#0a0d0f", "#10161a", "#141d22"],
    far: "#1e2c33",
    mid: "#141f24",
    near: "#0b1216",
    accent: "#8fb8c9",
    label: "Light, arranged honestly",
  },
  research: {
    sky: ["#0a0c12", "#10121a", "#14161f"],
    far: "#20233a",
    mid: "#161826",
    near: "#0d0e16",
    accent: "#c9c2ea",
    label: "The library of kept failures",
  },
};

export default function SceneHeader({
  scene,
  height = 220,
}: {
  scene: keyof typeof SCENES | string;
  height?: number;
}) {
  const s = SCENES[scene] ?? SCENES.premise;
  const stars: [number, number, number, number][] = [
    [120, 40, 1, 0.5], [340, 70, 1.3, 0.6], [560, 30, 0.8, 0.4],
    [780, 60, 1.1, 0.5], [1000, 25, 0.9, 0.45], [1230, 55, 1.4, 0.6],
    [1450, 35, 1, 0.5], [890, 95, 0.8, 0.35], [250, 130, 0.7, 0.3],
  ];
  return (
    <div className="wwa-scene-frame">
      <svg
        className="wwa-scene"
        viewBox="0 0 1600 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ height }}
        role="img"
        aria-label={s.label}
      >
        <defs>
          <linearGradient id={`sc-sky-${scene}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.sky[0]} />
            <stop offset="60%" stopColor={s.sky[1]} />
            <stop offset="100%" stopColor={s.sky[2]} />
          </linearGradient>
          <radialGradient id={`sc-glow-${scene}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={s.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={s.accent} stopOpacity="0" />
          </radialGradient>
          <filter id={`sc-blur-${scene}`}>
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <rect width="1600" height="300" fill={`url(#sc-sky-${scene})`} />
        {stars.map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={s.accent} opacity={o} className="wwa-twinkle" style={{ animationDelay: `${(i % 4) * 1.7}s` }} />
        ))}
        {s.moon && (
          <>
            <circle cx={s.moon.x} cy={s.moon.y} r={s.moon.r * 2.6} fill={`url(#sc-glow-${scene})`} />
            <circle cx={s.moon.x} cy={s.moon.y} r={s.moon.r} fill="#e9e4cf" opacity="0.95" />
          </>
        )}
        {s.sun && (
          <>
            <circle cx={s.sun.x} cy={s.sun.y} r={s.sun.r * 3} fill={`url(#sc-glow-${scene})`} />
            <circle cx={s.sun.x} cy={s.sun.y} r={s.sun.r} fill={s.sun.glow} opacity="0.9" />
          </>
        )}
        <path
          d="M0,190 C200,150 340,165 520,148 C700,131 820,170 1000,152 C1180,134 1300,172 1480,150 C1540,143 1580,150 1600,146 L1600,300 L0,300 Z"
          fill={s.far}
        />
        <path
          d="M0,228 C240,196 380,210 560,198 C740,186 860,215 1040,202 C1220,189 1340,216 1520,200 C1560,197 1590,202 1600,200 L1600,300 L0,300 Z"
          fill={s.mid}
        />
        <path
          d="M0,262 C280,240 440,252 660,244 C880,236 1020,256 1240,246 C1420,238 1540,252 1600,246 L1600,300 L0,300 Z"
          fill={s.near}
        />
        <ellipse cx="500" cy="252" rx="380" ry="18" fill={s.accent} opacity="0.04" filter={`url(#sc-blur-${scene})`} className="wwa-mist-a" />
        <ellipse cx="1150" cy="272" rx="340" ry="16" fill={s.accent} opacity="0.035" filter={`url(#sc-blur-${scene})`} className="wwa-mist-b" />
      </svg>
    </div>
  );
}

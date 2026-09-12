type Card = {
  glyph: string;
  title: string;
  sub: string;
};

export default function GlyphCards({ cards }: { cards: Card[] }) {
  return (
    <div className="wwa-systems">
      {cards.map((c) => (
        <div className="wwa-system wwa-system-static" key={c.title}>
          <span className="wwa-system-glyph"><SceneGlyph kind={c.glyph} /></span>
          <span className="wwa-system-title">{c.title}</span>
          <span className="wwa-system-sub">{c.sub}</span>
        </div>
      ))}
    </div>
  );
}

function SceneGlyph({ kind }: { kind: string }) {
  const common = { viewBox: "0 0 200 92", preserveAspectRatio: "xMidYMid slice" as const };
  if (kind === "wanderer")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#0e1613" />
        <circle cx="160" cy="20" r="8" fill="#ddd8c2" opacity="0.8" />
        <path d="M0,74 C40,64 80,68 120,64 C150,61 180,66 200,63 L200,92 L0,92 Z" fill="#142219" />
        <path d="M78,74 l0,-14 M78,60 l-5,-10 M78,60 l6,-9 M74,52 a4,4 0 1 1 8,0" stroke="#d9d3bd" strokeWidth="2" fill="none" opacity="0.75" />
        <path d="M70,74 l16,0" stroke="#8d6f4a" strokeWidth="3" />
      </svg>
    );
  if (kind === "bear")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#12100d" />
        <path d="M0,78 C60,70 130,74 200,70 L200,92 L0,92 Z" fill="#1c1a14" />
        <path d="M60,78 q2,-10 8,-14 q6,-4 12,0 q10,-2 16,4 q4,5 -2,8 q-16,4 -34,2 Z" fill="#3a3026" />
        <circle cx="92" cy="66" r="1.6" fill="#d9a662" />
        <circle cx="150" cy="30" r="7" fill="#ddd8c2" opacity="0.7" />
      </svg>
    );
  if (kind === "farm")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#11150e" />
        <circle cx="42" cy="24" r="10" fill="#e8b05f" opacity="0.85" />
        <path d="M0,60 C60,52 140,56 200,52 L200,92 L0,92 Z" fill="#1a2414" />
        <path d="M40,62 l0,-8 M52,64 l0,-8 M64,62 l0,-8 M76,64 l0,-8" stroke="#9ec49a" strokeWidth="1.6" />
        <path d="M120,58 l0,-14 M120,44 l-8,-8 M120,48 l-8,-8 M120,48 l8,-8 M120,44 l8,-8" stroke="#5f7161" strokeWidth="1.6" fill="none" />
        <rect x="146" y="46" width="18" height="14" fill="#182414" stroke="#5f7161" strokeWidth="1" />
      </svg>
    );
  if (kind === "city")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#0d1118" />
        <path d="M0,80 L200,80 L200,92 L0,92 Z" fill="#131b22" />
        <path d="M46,80 L46,50 L60,38 L74,50 L74,80 Z M90,80 L90,58 L102,58 L102,80 Z M116,80 L116,42 L136,34 L156,42 L156,80 Z" fill="#0d1319" />
        <rect x="122" y="52" width="6" height="8" fill="#ffca85" opacity="0.9" />
        <rect x="140" y="52" width="6" height="8" fill="#e8a052" opacity="0.7" />
        <rect x="56" y="60" width="6" height="8" fill="#e8a052" opacity="0.8" />
        <circle cx="24" cy="20" r="6" fill="#cfd3bd" opacity="0.5" />
      </svg>
    );
  if (kind === "machine")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#0d120e" />
        <circle cx="52" cy="72" r="10" fill="none" stroke="#9ec49a" strokeWidth="1.6" />
        <path d="M52,62 l0,10 l8,4" stroke="#d9a662" strokeWidth="1.6" fill="none" />
        <circle cx="98" cy="72" r="7" fill="none" stroke="#9ec49a" strokeWidth="1.4" />
        <path d="M62,72 L91,72" stroke="#5f7161" strokeWidth="2" />
        <path d="M110,72 h50 M135,72 v-16" stroke="#5f7161" strokeWidth="2" />
        <rect x="120" y="40" width="30" height="16" fill="#182414" stroke="#5f7161" strokeWidth="1" />
        <path d="M135,40 v-8 l14,-6" stroke="#d9a662" strokeWidth="1.4" fill="none" />
      </svg>
    );
  if (kind === "battle")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#141017" />
        <circle cx="168" cy="22" r="9" fill="#c9a8d8" opacity="0.7" />
        <path d="M0,84 L200,84 L200,92 L0,92 Z" fill="#0d0a10" />
        <path d="M70,84 l4,-16 l4,16 M88,84 l3,-13 l4,13 M104,84 l4,-18 l4,18 M122,84 l3,-12 l4,12" stroke="#2c2233" strokeWidth="2.4" fill="none" />
        <path d="M76,84 l0,-9 M76,75 l-4,-8 M76,75 l5,-7" stroke="#5a4a66" strokeWidth="1.6" fill="none" />
        <path d="M108,84 l0,-10 M108,74 l-4,-9 M108,74 l5,-8 M108,64 l-3,-6" stroke="#5a4a66" strokeWidth="1.6" fill="none" />
        <circle cx="150" cy="60" r="1.3" fill="#e8b05f" opacity="0.7" />
      </svg>
    );
  if (kind === "moon")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#0a0c12" />
        <circle cx="100" cy="46" r="26" fill="#e9e4cf" opacity="0.9" />
        <circle cx="100" cy="46" r="42" fill="#e9e4cf" opacity="0.12" />
        <path d="M0,80 C60,72 140,76 200,72 L200,92 L0,92 Z" fill="#10121a" />
        <path d="M150,78 l12,-4 l2,5 l-12,4 Z M128,82 l10,-3 l2,4 l-10,3 Z" fill="#3a3a52" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect width="200" height="92" fill="#0d120e" />
      <circle cx="100" cy="46" r="16" fill="none" stroke="#9ec49a" strokeWidth="1.6" opacity="0.7" />
      <circle cx="100" cy="46" r="26" fill="none" stroke="#5f7161" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

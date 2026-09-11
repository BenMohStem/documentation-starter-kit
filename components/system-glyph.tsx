export default function SystemGlyph({ kind }: { kind: string }) {
  const common = { viewBox: "0 0 200 92", preserveAspectRatio: "xMidYMid slice" };
  if (kind === "ecology") {
    return (
      <svg className="wwa-glyph" {...common}>
        <defs>
          <linearGradient id="g-e-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e1a14" />
            <stop offset="100%" stopColor="#1a2c20" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#g-e-sky)" />
        <circle cx="168" cy="20" r="9" fill="#ddd8c2" opacity="0.85" />
        <path d="M0,66 C30,56 45,60 70,62 C100,64 120,56 150,60 C170,62 185,58 200,60 L200,92 L0,92 Z" fill="#142219" />
        <path d="M20,70 q4,-5 8,0 M40,73 q5,-6 10,0 M62,70 q4,-5 8,0 M84,74 q5,-6 10,0" stroke="#2a4034" strokeWidth="2" fill="none" />
        <path d="M30,74 q3,4 2,8 M52,76 q3,4 2,8" stroke="#3a5244" strokeWidth="1.6" fill="none" />
        <path d="M0,84 C40,78 80,86 120,80 C160,74 185,84 200,80 L200,92 L0,92 Z" fill="#0d1712" />
        <path d="M14,80 l3,-6 M15,80 l-3,-6 M50,84 l3,-6 M51,84 l-3,-6 M92,81 l3,-6 M93,81 l-3,-6 M140,82 l3,-6 M141,82 l-3,-6" stroke="#9ec49a" strokeWidth="1.4" />
        <circle cx="128" cy="34" r="1.5" fill="#e8b05f" opacity="0.7" />
        <circle cx="176" cy="44" r="1.2" fill="#e8b05f" opacity="0.5" />
      </svg>
    );
  }
  if (kind === "civilization") {
    return (
      <svg className="wwa-glyph" {...common}>
        <defs>
          <linearGradient id="g-c-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10141a" />
            <stop offset="100%" stopColor="#1c2430" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#g-c-sky)" />
        <circle cx="30" cy="18" r="7" fill="#cfd3bd" opacity="0.6" />
        <path d="M0,74 L200,74 L200,92 L0,92 Z" fill="#131b22" />
        <path d="M46,74 L46,52 L58,40 L70,52 L70,74 Z" fill="#0d1319" />
        <path d="M52,40 L58,32 L64,40 Z" fill="#0d1319" />
        <rect x="54" y="58" width="6" height="8" fill="#e8a052" opacity="0.9" />
        <path d="M84,74 L84,58 L96,58 L96,74 Z" fill="#0f151c" />
        <rect x="88" y="63" width="5" height="6" fill="#e8a052" opacity="0.7" />
        <path d="M112,74 L112,46 L130,38 L148,46 L148,74 Z" fill="#0d1319" />
        <rect x="120" y="56" width="6" height="8" fill="#ffca85" opacity="0.95" />
        <rect x="134" y="56" width="6" height="8" fill="#e8a052" opacity="0.6" />
        <path d="M0,82 L200,82" stroke="#182430" strokeWidth="1" />
        <path d="M70,82 L96,82 M112,82 L148,82" stroke="#233042" strokeWidth="3" />
        <circle cx="176" cy="66" r="1.4" fill="#e8b05f" opacity="0.8" />
      </svg>
    );
  }
  if (kind === "engineering") {
    return (
      <svg className="wwa-glyph" {...common}>
        <defs>
          <linearGradient id="g-g-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d120e" />
            <stop offset="100%" stopColor="#181f1a" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#g-g-bg)" />
        <path d="M24,20 h40 v6 h-14 v14 h-12 v-14 h-14 Z" fill="#22352c" />
        <path d="M96,20 h16 v16 h16 v6 h-38 v-6 h6 Z" fill="#22352c" />
        <path d="M40,46 h16 v12 h6 v6 h-28 v-6 h6 Z" fill="#2a4034" />
        <path d="M112,46 h38 v6 h-32 v18 h-6 Z" fill="#22352c" />
        <path d="M70,72 h18 M100,72 h30" stroke="#9ec49a" strokeWidth="1.6" />
        <path d="M70,72 l12,-10 M130,72 l-14,-12" stroke="#9ec49a" strokeWidth="1.2" opacity="0.6" />
        <circle cx="52" cy="72" r="8" fill="none" stroke="#9ec49a" strokeWidth="1.4" />
        <path d="M52,64 v8 l6,4" stroke="#d9a662" strokeWidth="1.6" fill="none" />
        <circle cx="156" cy="52" r="1.4" fill="#e8b05f" />
        <circle cx="168" cy="40" r="1" fill="#e8b05f" opacity="0.6" />
        <circle cx="150" cy="66" r="1" fill="#e8b05f" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg className="wwa-glyph" {...common}>
      <defs>
        <linearGradient id="g-w-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141017" />
          <stop offset="100%" stopColor="#241d26" />
        </linearGradient>
      </defs>
      <rect width="200" height="92" fill="url(#g-w-sky)" />
      <path d="M0,90 L24,52 L48,74 L74,40 L104,80 L200,80 L200,92 Z" fill="#0d0a10" />
      <path d="M74,40 L82,52 L74,56 L66,52 Z" fill="#241d26" />
      <path d="M30,64 q6,-4 12,0 q6,-4 12,0" stroke="#3a2f42" strokeWidth="2" fill="none" />
      <path d="M110,64 l10,-4 M112,60 l10,4" stroke="#5a4a66" strokeWidth="1.6" />
      <path d="M104,80 L104,86 M112,80 L112,86 M120,80 L120,86" stroke="#5a4a66" strokeWidth="2" />
      <path d="M126,70 l14,-5 M128,65 l14,5" stroke="#d9a662" strokeWidth="1.6" opacity="0.8" />
      <circle cx="40" cy="26" r="1.2" fill="#b8a8c2" opacity="0.7" />
      <circle cx="58" cy="16" r="0.9" fill="#b8a8c2" opacity="0.5" />
      <circle cx="86" cy="22" r="1" fill="#b8a8c2" opacity="0.6" />
    </svg>
  );
}

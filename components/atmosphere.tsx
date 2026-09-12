export default function Atmosphere({
  variant = "ridge",
  height = 130,
}: {
  variant?: "ridge" | "mist" | "stars";
  height?: number;
}) {
  const w = 1600;
  const h = 200;
  return (
    <svg
      className="wwa-atmosphere"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ height }}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`atm-sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1411" />
          <stop offset="100%" stopColor="#0c0f0d" />
        </linearGradient>
        <filter id={`atm-blur-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={`url(#atm-sky-${variant})`} />
      {variant === "stars" && (
        <g fill="#dfe6dd">
          {[
            [140, 30, 1, 0.5], [310, 66, 1.4, 0.7], [520, 24, 0.8, 0.4], [760, 58, 1.2, 0.6],
            [990, 34, 0.9, 0.45], [1210, 70, 1.5, 0.65], [1430, 40, 1, 0.5], [880, 100, 1.1, 0.4],
            [420, 120, 0.8, 0.35], [1340, 120, 1.3, 0.5], [220, 150, 0.9, 0.3],
          ].map(([x, y, r, o], i) => (
            <circle key={i} cx={x} cy={y} r={r} opacity={o} className="wwa-twinkle" style={{ animationDelay: `${(i % 5) * 1.3}s` }} />
          ))}
        </g>
      )}
      {variant === "mist" && (
        <g>
          <ellipse cx="400" cy="120" rx="420" ry="30" fill="#cdd7d4" opacity="0.05" filter={`url(#atm-blur-mist)`} className="wwa-mist-a" />
          <ellipse cx="1150" cy="150" rx="380" ry="26" fill="#cdd7d4" opacity="0.045" filter={`url(#atm-blur-mist)`} className="wwa-mist-b" />
        </g>
      )}
      {variant === "ridge" && (
        <g>
          <path
            d={`M0,140 C180,90 300,110 460,96 C620,82 720,120 900,104 C1080,88 1180,124 1360,100 C1470,86 1550,110 ${w},102 L${w},${h} L0,${h} Z`}
            fill="#131f18"
          />
          <path
            d={`M0,166 C220,130 360,148 560,136 C760,124 880,154 1080,140 C1280,126 1440,152 ${w},140 L${w},${h} L0,${h} Z`}
            fill="#0d1712"
          />
          <g fill="#0a120e" opacity="0.9">
            {[
              [90, 168, 0.9], [240, 175, 1.2], [420, 170, 0.8], [610, 178, 1.1],
              [820, 172, 0.9], [1030, 180, 1.3], [1240, 174, 0.9], [1450, 178, 1.2],
            ].map(([x, y, s], i) => (
              <use key={i} href="#wwa-pine" transform={`translate(${x},${y}) scale(${s})`} />
            ))}
          </g>
        </g>
      )}
      <rect width={w} height={h} fill="#0c0f0d" opacity="0" />
    </svg>
  );
}

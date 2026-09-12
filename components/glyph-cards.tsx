type Card = { glyph: string; title: string; sub: string };

export default function GlyphCards({ cards }: { cards: Card[] }) {
  return (
    <div className="wwa-systems">
      {cards.map((c) => (
        <div className="wwa-system wwa-system-static" key={c.title}>
          <span className="wwa-system-glyph">
            <SceneGlyph kind={c.glyph} />
          </span>
          <span className="wwa-system-title">{c.title}</span>
          <span className="wwa-system-sub">{c.sub}</span>
        </div>
      ))}
    </div>
  );
}

/** Detailed mini-illustrations, 200x92, layered and correctly proportioned. */
function SceneGlyph({ kind }: { kind: string }) {
  const common = { viewBox: "0 0 200 92", preserveAspectRatio: "xMidYMid slice" as const };

  if (kind === "wanderer")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gw-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1512" />
            <stop offset="100%" stopColor="#1a2b20" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gw-sky)" />
        <circle cx="166" cy="18" r="8" fill="#ddd8c2" opacity="0.85" />
        <circle cx="166" cy="18" r="14" fill="#ddd8c2" opacity="0.12" />
        <path d="M0,68 C40,58 90,62 130,58 C160,55 185,60 200,57 L200,92 L0,92 Z" fill="#13221a" />
        <path d="M0,80 C60,74 140,78 200,74 L200,92 L0,92 Z" fill="#0d1811" />
        {/* traveler: walking staff, cloak, pack — proportions 7.5 heads */}
        <g fill="#2a2a24">
          <path d="M92,78 l1.5,-9 q0.5,-3 1,-4.5 l3,0 q1,4 1,7 l-1.5,7 Z" />
          <path d="M97,66 q-6,-2 -8,-7 q-2,-4 1,-6 l3,-1 q-2,-4 1,-5 q2,-1 4,2 l2,-2 q3,1 2,5 q4,2 3,7 q-1,4 -4,5 Z" />
          <circle cx="99" cy="42" r="2.6" fill="#3a3630" />
          <path d="M96,40 q3,-2 5,0 l1,3 q-3,-1 -6,-1 Z" fill="#3a3630" />
        </g>
        <path d="M92,80 l4,-14" stroke="#5a4a3a" strokeWidth="1.4" />
        {/* staff top slightly above hand */}
        <path d="M87,58 l-5,4 1,1 5,-4 Z" fill="#2a2a24" />
        {/* footprints behind */}
        <g fill="#0d1811" opacity="0.8">
          <ellipse cx="70" cy="82" rx="2" ry="1" />
          <ellipse cx="60" cy="80" rx="2" ry="1" />
          <ellipse cx="50" cy="78" rx="2" ry="1" />
        </g>
      </svg>
    );

  if (kind === "bear")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#100f0c" />
            <stop offset="100%" stopColor="#1c1a14" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gb-sky)" />
        <circle cx="38" cy="20" r="9" fill="#ddd8c2" opacity="0.7" />
        <path d="M0,74 C50,66 120,70 200,66 L200,92 L0,92 Z" fill="#161410" />
        <path d="M0,84 C70,78 150,82 200,79 L200,92 L0,92 Z" fill="#100e0b" />
        {/* brown bear, correct proportions: massive shoulder hump, small hindquarters, short ears, dished face */}
        <g fill="#3a2e22">
          <path d="M56,74 q-1,-7 3,-11 q-5,-3 -4,-8 q1,-5 6,-6 l5,-3 q4,-1 6,1 q2,-3 6,-2 q5,1 5,5 q-1,3 -3,4 q2,2 1,5 q-1,4 -5,5 q1,3 -1,5 q-3,3 -8,2 q-5,8 -11,3 Z" />
          {/* shoulder hump */}
          <path d="M64,58 q2,-4 6,-3 l6,2 q-4,1 -8,4 Z" />
          {/* ears */}
          <path d="M70,45 l-2,-3 3,-1 1,3 Z" />
          <path d="M77,43 l0,-3 3,0 1,3 Z" />
          {/* snout */}
          <path d="M83,51 l5,1 q2,1 1,2 l-5,0 Z" />
        </g>
        <circle cx="80" cy="48" r="0.9" fill="#d9a662" />
        {/* foreground salmonberry bush the bear is headed for */}
        <g stroke="#2e3d28" strokeWidth="1.6" fill="none">
          <path d="M150,80 q4,-8 10,-10" />
          <path d="M156,80 q2,-6 8,-8" />
          <path d="M162,80 q5,-5 9,-5" />
        </g>
        <g fill="#9ec49a"><circle cx="162" cy="70" r="1.6" /><circle cx="169" cy="75" r="1.3" /><circle cx="172" cy="68" r="1.2" /></g>
      </svg>
    );

  if (kind === "farm")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f1208" />
            <stop offset="100%" stopColor="#1a2310" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gf-sky)" />
        <circle cx="40" cy="18" r="10" fill="#e8b05f" opacity="0.8" />
        <circle cx="40" cy="18" r="18" fill="#e8b05f" opacity="0.1" />
        <path d="M0,58 C50,50 120,54 200,50 L200,92 L0,92 Z" fill="#18241a" />
        <path d="M0,78 C60,72 140,76 200,73 L200,92 L0,92 Z" fill="#101a12" />
        {/* furrows in perspective converging to the farmer */}
        <g stroke="#243626" strokeWidth="1.6" opacity="0.9">
          <path d="M20,92 L88,66" />
          <path d="M50,92 L96,68" />
          <path d="M85,92 L104,70" />
          <path d="M125,92 L112,72" />
          <path d="M165,92 L120,74" />
        </g>
        {/* farmer sowing: seed bag at hip, arm in cast */}
        <g fill="#282620">
          <path d="M88,74 l1,-8 q0,-3 1,-4 l3,0 q1,3 1,6 l-1,7 Z" />
          <circle cx="93" cy="52" r="2.4" fill="#34322c" />
          <path d="M90,50 q3,-2 5,0 l1,3 q-3,-1 -6,-1 Z" fill="#34322c" />
          <path d="M94,56 q-5,-1 -6,-4 q-1,-3 2,-4 l2,0 q2,2 3,4 Z" />
        </g>
        <path d="M96,58 q6,-2 9,1" stroke="#282620" strokeWidth="1.6" fill="none" />
        {/* seeds mid-air */}
        <g fill="#c9b98a"><circle cx="107" cy="59" r="0.8" /><circle cx="111" cy="56" r="0.7" /><circle cx="115" cy="58" r="0.7" /></g>
        {/* fence posts in perspective */}
        <g fill="#1e2c1e">
          <rect x="150" y="60" width="2" height="14" />
          <rect x="168" y="62" width="2" height="12" />
          <rect x="184" y="64" width="2" height="10" />
        </g>
        <path d="M150,64 L186,67 M150,70 L186,72" stroke="#1e2c1e" strokeWidth="1" />
      </svg>
    );

  if (kind === "city")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1016" />
            <stop offset="100%" stopColor="#141d26" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gc-sky)" />
        <circle cx="24" cy="16" r="6" fill="#cfd3bd" opacity="0.5" />
        <path d="M0,72 L200,72 L200,92 L0,92 Z" fill="#0f151c" />
        {/* hillside town in terraces: correct perspective, varied roofs, a wall */}
        <path d="M0,80 C60,68 130,64 200,58 L200,92 L0,92 Z" fill="#131b22" />
        {/* upper terrace — walled compound, tower */}
        <g fill="#0d1319">
          <path d="M118,62 l12,-9 12,9 Z" />
          <rect x="114" y="62" width="28" height="10" />
          <path d="M152,66 l9,-7 9,7 Z" />
          <rect x="149" y="66" width="21" height="8" />
          <rect x="146" y="56" width="4" height="18" />
          <path d="M144,56 l4,-5 4,5 Z" />
        </g>
        {/* lower terrace — houses with varied rooflines */}
        <g fill="#0b1117">
          <path d="M52,74 l9,-7 9,7 Z" />
          <rect x="49" y="74" width="20" height="9" />
          <path d="M78,76 l8,-6 8,6 Z" />
          <rect x="75" y="76" width="18" height="8" />
          <path d="M100,78 l10,-8 10,8 Z" />
          <rect x="96" y="78" width="23" height="8" />
        </g>
        {/* windows: warm light, upper floors sleeping */}
        <g fill="#ffca85">
          <rect x="120" y="64" width="4" height="5" opacity="0.9" />
          <rect x="130" y="64" width="4" height="5" opacity="0.65" />
          <rect x="154" y="68" width="3" height="4" opacity="0.85" />
          <rect x="56" y="76" width="3.6" height="4.4" opacity="0.9" />
          <rect x="80" y="78" width="3.2" height="4" opacity="0.5" />
          <rect x="102" y="80" width="4" height="4.4" opacity="0.9" />
        </g>
        {/* one window going out — the night watch */}
        <rect x="86" y="78" width="3.2" height="4" fill="#e8a052" opacity="0.35" />
        {/* terrace walls */}
        <path d="M44,84 C90,80 150,78 196,72 L196,74 C150,80 90,82 44,86 Z" fill="#1c2630" />
        {/* smoke from a hearth, drifting */}
        <g stroke="#3a4a5c" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M150,52 q2,-4 -1,-7 q-3,-3 0,-6" />
        </g>
      </svg>
    );

  if (kind === "machine")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gm-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d120e" />
            <stop offset="100%" stopColor="#161f18" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gm-sky)" />
        {/* bench with a working mechanism: two meshed gears, connecting rod, flywheel */}
        <g fill="#131b14">
          <rect x="24" y="66" width="152" height="4" rx="1" />
          <rect x="30" y="70" width="4" height="16" />
          <rect x="166" y="70" width="4" height="16" />
        </g>
        {/* large drive gear — 12 teeth, correct meshing */}
        <g transform="translate(64,52)">
          <circle r="16" fill="none" stroke="#5f7161" strokeWidth="2" />
          <circle r="4" fill="none" stroke="#5f7161" strokeWidth="1.5" />
          <g fill="#5f7161">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x="-2" y="-19" width="4" height="5" rx="1" transform={`rotate(${i * 30})`} />
            ))}
          </g>
        </g>
        {/* small pinion meshing at the flank — 8 teeth */}
        <g transform="translate(90,60)">
          <circle r="9" fill="none" stroke="#5f7161" strokeWidth="1.8" />
          <circle r="2.4" fill="none" stroke="#5f7161" strokeWidth="1.2" />
          <g fill="#5f7161">
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x="-1.4" y="-11.4" width="2.8" height="4" rx="0.8" transform={`rotate(${i * 45 + 18})`} />
            ))}
          </g>
        </g>
        {/* connecting rod to a piston block */}
        <path d="M76,66 L112,70 L112,58" fill="none" stroke="#9ec49a" strokeWidth="1.6" />
        <rect x="108" y="50" width="10" height="9" rx="1" fill="none" stroke="#9ec49a" strokeWidth="1.4" />
        {/* flywheel belt */}
        <g stroke="#3a5244" strokeWidth="1.4" fill="none" opacity="0.9">
          <circle cx="148" cy="52" r="12" />
          <path d="M148,66 L148,60" />
        </g>
        <circle cx="148" cy="52" r="2.5" fill="#d9a662" opacity="0.9" />
        {/* hand crank on the big gear */}
        <path d="M56,56 L48,50" stroke="#9ec49a" strokeWidth="1.4" />
        <circle cx="48" cy="50" r="2" fill="none" stroke="#9ec49a" strokeWidth="1.2" />
        {/* measurement: a ruled straightedge beside the bench */}
        <g stroke="#3a5244" strokeWidth="0.8" opacity="0.8">
          <path d="M24,44 L176,44" />
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M${30 + i * 13},44 l0,${i % 2 ? 3 : 5}`} />
          ))}
        </g>
      </svg>
    );

  if (kind === "battle")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gk-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141017" />
            <stop offset="100%" stopColor="#241d26" />
          </linearGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gk-sky)" />
        <circle cx="170" cy="20" r="8" fill="#c9a8d8" opacity="0.7" />
        <path d="M0,84 L200,84 L200,92 L0,92 Z" fill="#0d0a10" />
        {/* two shield walls meeting — correct stance: shields overlapped, spears angled, rear ranks pushing */}
        <g stroke="#2c2233" strokeWidth="2" fill="none">
          {/* left company */}
          <path d="M60,84 v-10 M64,74 l-6,-14 M64,74 l7,-12" />
          <path d="M42,84 v-9 M46,75 l-5,-13 M46,75 l6,-12" />
          <path d="M78,84 v-9 M82,75 l-5,-13 M82,75 l6,-12" />
          {/* right company */}
          <path d="M140,84 v-10 M136,74 l6,-14 M136,74 l-7,-12" />
          <path d="M158,84 v-9 M154,75 l5,-13 M154,75 l-6,-12" />
          <path d="M122,84 v-9 M126,75 l-5,-13 M126,75 l-6,-12" />
        </g>
        {/* overlapped round shields, front rank */}
        <g fill="#241a28" stroke="#3a2c42" strokeWidth="1">
          <circle cx="58" cy="76" r="6" />
          <circle cx="72" cy="77" r="6" />
          <circle cx="86" cy="77" r="6" />
          <circle cx="142" cy="76" r="6" />
          <circle cx="128" cy="77" r="6" />
          <circle cx="114" cy="77" r="6" />
        </g>
        {/* banners: one per company */}
        <g stroke="#5a4a66" strokeWidth="1.2" fill="none">
          <path d="M40,84 V56" />
          <path d="M160,84 V56" />
        </g>
        <path d="M40,56 q8,3 14,0 l0,8 q-8,3 -14,0 Z" fill="#3a2c42" />
        <path d="M160,56 q-8,3 -14,0 l0,8 q8,3 14,0 Z" fill="#3a2c42" />
        {/* a spear mid-flight over the melee */}
        <path d="M96,40 L112,52" stroke="#8d8d85" strokeWidth="1" opacity="0.7" />
        <path d="M112,52 l3,2 -3,1 Z" fill="#8d8d85" opacity="0.7" />
        {/* dust of the clash */}
        <ellipse cx="100" cy="82" rx="26" ry="4" fill="#4a3a52" opacity="0.25" />
      </svg>
    );

  if (kind === "moon")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="gmn-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0c12" />
            <stop offset="100%" stopColor="#10121a" />
          </linearGradient>
          <radialGradient id="gmn-moon" cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#f2edda" />
            <stop offset="70%" stopColor="#ddd8c2" />
            <stop offset="100%" stopColor="#b8b29c" />
          </radialGradient>
        </defs>
        <rect width="200" height="92" fill="url(#gmn-sky)" />
        {/* correct crater arrangement: maria on the upper-left, rays from Tycho bottom */}
        <circle cx="100" cy="42" r="24" fill="url(#gmn-moon)" />
        <g fill="#a8a28c" opacity="0.5">
          <circle cx="92" cy="34" r="5" />
          <circle cx="104" cy="31" r="3" />
          <circle cx="96" cy="46" r="3.4" />
          <circle cx="110" cy="45" r="4.5" />
          <circle cx="86" cy="44" r="2.4" />
        </g>
        <g stroke="#c9c4ae" strokeWidth="0.7" opacity="0.5">
          <path d="M110,45 L126,60 M110,45 L120,64 M110,45 L128,55" />
        </g>
        {/* a climbing contrail from the world below — the machines, someday */}
        <path d="M20,86 C60,80 120,64 176,46" stroke="#8fb8c9" strokeWidth="1" strokeDasharray="2 4" opacity="0.55" fill="none" />
        <path d="M176,46 l6,-2 -4,5 Z" fill="#8fb8c9" opacity="0.7" />
        <path d="M0,84 C50,78 120,72 200,68 L200,92 L0,92 Z" fill="#10121a" />
        {/* launch scaffold on the horizon, tiny against the distance */}
        <g fill="#1c1e30">
          <rect x="30" y="74" width="2" height="8" />
          <rect x="36" y="74" width="2" height="8" />
          <path d="M28,74 L38,70 L38,74 Z" />
        </g>
      </svg>
    );

  if (kind === "wolf")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#0b1216" />
        <circle cx="30" cy="18" r="8" fill="#cfd3bd" opacity="0.6" />
        <path d="M0,76 C60,68 130,72 200,68 L200,92 L0,92 Z" fill="#101a20" />
        {/* gray wolf, head low, tail level, ears forward — tracking gait */}
        <g fill="#33302c" transform="translate(120,66)">
          <path d="M0,10 q-2,-5 2,-7 q-3,-2 -1,-5 q7,-4 12,-1 q2,-3 7,-2 q5,1 5,5 q-1,3 -4,4 q1,2 0,4 q-2,3 -6,2 q-3,5 -9,3 q-2,4 -6,0 Z" />
          <path d="M15,-6 l5,-2 1,2 -5,2 Z" />
          <path d="M21,-11 q3,0 3,2 l-3,1 Z" />
          {/* ears pricked */}
          <path d="M4,-9 l-1,-4 3,1 0,3 Z" />
          <path d="M10,-10 l0,-4 3,2 -1,3 Z" />
        </g>
        {/* paw prints in a line — it has been walking the ridge */}
        <g fill="#0d161b" opacity="0.9">
          {[86, 72, 58, 44].map((x, i) => (
            <g key={i}>
              <ellipse cx={x} cy={80 - i * 1.5} rx="2.4" ry="1.6" />
              <circle cx={x - 1.4} cy={78.4 - i * 1.5} r="0.7" />
              <circle cx={x + 1.4} cy={78.4 - i * 1.5} r="0.7" />
            </g>
          ))}
        </g>
      </svg>
    );

  if (kind === "crow")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#101610" />
        <circle cx="150" cy="18" r="8" fill="#ddd8c2" opacity="0.6" />
        <path d="M0,70 C70,62 140,66 200,62 L200,92 L0,92 Z" fill="#131f14" />
        {/* crow on a birch snag — correct perching anatomy: forward-facing toes, tail as counterbalance */}
        <g fill="#20241f">
          <path d="M96,70 q0,-8 3,-10 q-4,-3 -2,-8 q1,-4 6,-3 q1,-4 5,-3 q4,1 4,5 q1,2 0,3 l5,1 q2,1 1,2 l-5,1 q-1,4 -5,5 q0,4 -3,4 q-4,1 -6,-2 Z" />
          {/* beak, conical with slight curve */}
          <path d="M108,50 l7,1 q2,1 0,2 l-7,-1 Z" />
          {/* tail fanned slightly */}
          <path d="M96,64 l-8,6 2,1 7,-5 Z" />
          {/* wing on far side */}
          <path d="M100,52 q4,-2 6,1 l-4,3 Z" opacity="0.8" />
        </g>
        <circle cx="107" cy="47" r="0.8" fill="#d9a662" />
        {/* the snag: birch with a broken top */}
        <g fill="#1c241c">
          <path d="M96,86 L99,50 L103,50 L106,86 Z" />
          <path d="M98,60 q-4,-3 -6,-1 l1,3 q3,1 5,1 Z" />
        </g>
        <g stroke="#3a4a3c" strokeWidth="0.6" opacity="0.7">
          <path d="M99,58 L100,66 M101,72 L102,78" />
        </g>
        {/* its flock, far off — the friends it will call */}
        <g stroke="#20241f" strokeWidth="1.2" fill="none" opacity="0.7">
          <path d="M40,28 q3,-3 6,0 q3,-3 6,0" />
          <path d="M52,34 q2.4,-2.4 4.8,0 q2.4,-2.4 4.8,0" />
        </g>
      </svg>
    );

  if (kind === "horse")
    return (
      <svg {...common}>
        <rect width="200" height="92" fill="#120f0c" />
        <circle cx="36" cy="16" r="8" fill="#ddd8c2" opacity="0.6" />
        <path d="M0,78 C60,72 140,75 200,71 L200,92 L0,92 Z" fill="#191410" />
        {/* horse at a walk, correct proportions (head ~ body length 2.5x height), rider training it */}
        <g fill="#3a3026" transform="translate(110,56)">
          {/* body */}
          <path d="M-16,10 q-2,-6 2,-9 q-1,-4 3,-5 l14,-1 q5,0 7,4 q3,4 1,8 q-2,5 -8,5 l-12,1 q-5,0 -7,-3 Z" />
          {/* neck arched, head down — being taught to accept the bit */}
          <path d="M0,-4 q2,-8 8,-10 l4,0 q-1,5 -4,8 l-2,4 Z" />
          <path d="M10,-14 l6,-1 1,3 -6,1 Z" />
          {/* mane along the crest */}
          <path d="M2,-6 q3,-3 6,-4 l1,2 q-3,1 -5,3 Z" fill="#2c241c" />
          {/* tail carried low, relaxed */}
          <path d="M-15,4 q-5,4 -4,9 l3,-1 q-1,-4 3,-7 Z" />
          {/* legs: four, correct articulation — this is a walking pose */}
          <path d="M-10,10 l-2,9 2,1 2,-9 Z" />
          <path d="M8,10 l1,9 2,0 1,-9 Z" />
          <path d="M-14,9 l-4,8 2,2 4,-9 Z" opacity="0.85" />
          <path d="M12,9 l3,8 2,-1 -3,-9 Z" opacity="0.85" />
        </g>
        {/* the trainer standing before it, hand raised, lead line slack */}
        <g fill="#28241e">
          <path d="M88,80 l1,-8 q0,-3 1,-4 l3,0 q1,3 1,6 l-1,7 Z" />
          <circle cx="91" cy="58" r="2.4" fill="#34302a" />
          <path d="M88,56 q3,-2 5,0 l1,3 q-3,-1 -6,-1 Z" fill="#34302a" />
        </g>
        <path d="M94,64 q6,-1 10,2" stroke="#28241e" strokeWidth="1.2" fill="none" />
        {/* lead line to the halter */}
        <path d="M97,65 q8,0 14,-6" stroke="#5a4a3a" strokeWidth="0.8" fill="none" opacity="0.8" />
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

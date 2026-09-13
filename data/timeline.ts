export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  body: string;
  kind: "milestone" | "promotion" | "retraction" | "incident" | "rejection" | "founding";
};

export type Era = {
  id: string;
  range: string;
  name: string;
  blurb: string;
  events: TimelineEvent[];
};

/**
 * The timeline — the project's chronology, kept honest. Dates are
 * recorded as the archive gives them; every promotion, retraction,
 * and incident on this spine exists in the ledger or the incident
 * record with its full numbers. The spine is deliberately sparse:
 * only events that changed the project's direction or its rules.
 */
export const eras: Era[] = [
  {
    id: "origins",
    range: "v0.x – 1.0",
    name: "Origins",
    blurb: "Plain C, own standard layer, own build. A triangle, then a window that stayed open.",
    events: [
      {
        id: "0.1",
        date: "2026",
        title: "The founding prompt",
        body: "The master prompt that defines the project: a playable vertical slice of a large-scale sandbox simulation where the player learns by living inside a simulated world. The one law: the world must keep living even when the player does nothing.",
        kind: "founding",
      },
      {
        id: "1.0",
        date: "era 1.0",
        title: "First smoke test",
        body: "A triangle, then a window that stayed open. The Vulkan lab: instance → surface → swapchain → clear → present. Humble on purpose.",
        kind: "milestone",
      },
    ],
  },
  {
    id: "lab",
    range: "1.4 – 1.9",
    name: "The engine lab",
    blurb: "The founding measurements — including the first great lesson, kept forever.",
    events: [
      {
        id: "1.4",
        date: "era 1.4",
        title: "The LOD family begins",
        body: "The benchmark family that would run for eras: full rebuild, legacy indexed (~2.30–3.1× full — a loss), cached indexed (~1.3×), scan (~0.86×), grouped contiguous (~0.41× — the prototype win). First appearance of the law: index indirection costs more than it saves.",
        kind: "milestone",
      },
      {
        id: "1.9",
        date: "era 1.9",
        title: "The batch renderer lesson",
        body: "Batched renderer calls vs per-rect: 9.37× at 64 points decaying to 3.46× at 65,536 — the win is real and it shrinks with scale. The DOD sweep the same era: AoS beat SoA and AoSoA on 1M agents — deliberate anti-slogan evidence, kept.",
        kind: "milestone",
      },
    ],
  },
  {
    id: "terrain",
    range: "2.0 – 2.9",
    name: "No universal winner · The demo",
    blurb: "Broadphase terrain mapped honestly; physics became playable.",
    events: [
      {
        id: "2.0",
        date: "2026-08-12",
        title: "The broadphase terrain map",
        body: "Brute force, uniform grid, sweep-and-prune measured across three workload shapes. Uniform won sparse/coherent; brute force won clustered; full-rebuild SAP never won. Verdict: no universal winner — the standing finding of the whole record.",
        kind: "milestone",
      },
      {
        id: "2.4",
        date: "era 2.4",
        title: "The demo becomes playable",
        body: "96 bodies, 640×360, 120 Hz, mouse-spawn, generated PCM audio — the first playable physics demonstration. The demo becomes the project's permanent entry point.",
        kind: "milestone",
      },
      {
        id: "2.6",
        date: "era 2.6",
        title: "First-person 3D",
        body: "CPU rasterizer, depth buffer, flat shading, real camera input — a first-person 3D slice runs. The renderer discipline is written: contiguous frame packets → visibility → material grouping → advanced lighting only after measurement.",
        kind: "milestone",
      },
    ],
  },
  {
    id: "mechanisms",
    range: "2.10 – 2.52",
    name: "Mechanism lab · The floor",
    blurb: "World mechanisms proven small; the std layer built to 340,375 checks.",
    events: [
      {
        id: "2.13",
        date: "era 2.13",
        title: "Local perception + the spatial grid",
        body: "Local-agent grid speedups 1.75× at 32 agents → 6.65× at 1024: local perception must not be an all-agent scan. The same era measured the shared packed spatial index that would later become the integration win.",
        kind: "promotion",
      },
      {
        id: "2.14",
        date: "era 2.14",
        title: "Division of labor, measured",
        body: "4,096 agents, 4 task types, 600 steps, response-threshold specialization: counts 2608/496/496/496. The social-mechanism lab opens — energy budgets, signal fields, stigmergy — proven small before they grow.",
        kind: "milestone",
      },
      {
        id: "2.21",
        date: "era 2.21",
        title: "The collapsed-cube defect",
        body: "The renderer correctness defect: cube faces collapsed to one triangle (the second triangle reused vertex 0). Caught, fixed, kept. The tile-size matrix followed: 8×8 only 1.09–1.36× better than larger tiles — explicitly not universal.",
        kind: "incident",
      },
      {
        id: "std-r11",
        date: "2026-08-20",
        title: "The std floor's acceptance round",
        body: "340,375 checks, 0 fails, on the Windows/MSYS2 acceptance host. Five real bugs fixed on the way — including the memcpy-literal ghost chase and the itoa truncation that kept LSDs instead of MSDs. The floor is finished.",
        kind: "milestone",
      },
    ],
  },
  {
    id: "integration",
    range: "2.53 – 2.98",
    name: "The integrated world",
    blurb: "One shared spatial sense — the largest integrated win. The engine learns to catch its own errors.",
    events: [
      {
        id: "2.55",
        date: "era 2.55",
        title: "The quantization family + the gather that lost",
        body: "FP16 through NVFP4 measured in consumer kernels. The verdict that stays: BF16 matches FP32 (852,868 vs 853,080 ticks) and everything below it loses — quantization is storage, never compute. The AVX2 FP8 gather (378,790 vs 145,295) is kept as a named negative.",
        kind: "rejection",
      },
      {
        id: "2.67",
        date: "era 2.67",
        title: "The per-pixel oracle promotes the tile raster",
        body: "An independent direct-per-pixel oracle found zero mismatches across sparse, clustered, large-overlap, and coherent scenes at 2,048 and 4,096 triangles. The 8×8 tile raster is promoted to production — by oracle, not by fashion.",
        kind: "promotion",
      },
      {
        id: "2.78",
        date: "era 2.78",
        title: "The adaptive spatial manager is rejected",
        body: "Not for speed — for state integrity. Storage order had coupled to entity identity; candidate sets diverged between layouts. The benchmark never mattered. The lesson becomes doctrine: state integrity gates architecture.",
        kind: "rejection",
      },
      {
        id: "2.79",
        date: "era 2.79",
        title: "The shared spatial layer",
        body: "One spatial layer serving every consumer: median 1.43× speedup with index memory halved (2,097,152 → 1,048,576 bytes) at 131,072 entities. Compound interest on the 2.13 finding.",
        kind: "promotion",
      },
      {
        id: "2.83",
        date: "era 2.83",
        title: "The 28.9× that wasn't",
        body: "Dirty-set broadphase measured 28.9× faster candidate updates at 0% movement — and complete-step ratios at parity (0.90–1.05×) because traversal dominates. Demoted to a data-contract finding. The record keeps the number and refuses the promotion.",
        kind: "retraction",
      },
    ],
  },
  {
    id: "research",
    range: "3.x",
    name: "The research line",
    blurb: "Physics as a research subject. Warm-started contacts, layout management, solver convergence — every promotion gated.",
    events: [
      {
        id: "3.50",
        date: "era 3.50",
        title: "Warm-start replay: 70.98× at zero drift",
        body: "The record's most-cited single result. Contacts that remember their impulses replay 70.98× faster at zero drift (32 cold iterations vs 0 warm, residual 1e-2), decaying honestly with tolerance — 21.97× at 0.01, 13.11× at 0.05, 8.72× at 0.10. Warm starting is physical state initialization, not cached metadata.",
        kind: "promotion",
      },
      {
        id: "3.118",
        date: "era 3.118",
        title: "The K-cache epoch doctrine",
        body: "Cached-K only when geometry/mass epochs prove validity. The doctrine survives to this day; the performance claims do not — the 3.162/3.163 audits (confined working set, mistimed region) and the 3.171 corrected churn benchmark (cached-K median 0.88× — slower) reverse the conclusion. Neither direction promoted.",
        kind: "milestone",
      },
      {
        id: "3.185",
        date: "2026-09-06",
        title: "The retraction that built the noise floor",
        body: "A 1.44× layout promotion, retracted the same session it was made: fresh-process repetition exposed spreads of 59–302 cycles/contact, larger than the effect. Interleaved execution, min-of-K, and the 2× noise-floor rule (D1) are adopted immediately. The claim's death is the record's gain.",
        kind: "retraction",
      },
      {
        id: "3.187",
        date: "2026-09-06",
        title: "The first promotion to survive",
        body: "Cheap-swap on hub topologies: 18–41 cycles/contact effect against noise floors of 4.8–6.7, clearing the 2× bar on two independent runs, oracle green, negative control caught. The first promotion to survive the full gate battery — and it carries its scope with it.",
        kind: "promotion",
      },
      {
        id: "3.189",
        date: "2026-09-06",
        title: "The adaptive selector at 256K bodies",
        body: "The layout selector declines to act on five non-target families (0 rebuilds, 0 swaps) and wins 3.11× on hub topology at 256K bodies — beating every static policy, verified twice. The same session catches its own measurement collision (3.189-1): a battery timed against a busy pinned core, re-run clean.",
        kind: "promotion",
      },
      {
        id: "3.190",
        date: "2026-09-06",
        title: "Four defects caught, zero thresholds tuned",
        body: "The graph-degree probe: tombstone-less deletion (u16 wrap), first-touch cost (548M cycles), degenerate hash (15k-cycle chains), and the record-pair bug that silently corrupted every degree measurement — all caught by gates pre-fix, all kept as the diagnosis trail. Chain promotion extended to 1% churn with the honest 5% boundary recorded.",
        kind: "promotion",
      },
      {
        id: "3.191",
        date: "2026-09-07",
        title: "Pre-registration becomes standing practice",
        body: "Iteration 3.191 is designed before it runs: DESIGN.md with frozen thresholds, hypotheses, and a self-doubt log, dated amendments only — never silent rewrites. The pre-registration practice (§38 provenance) is now how every iteration works.",
        kind: "milestone",
      },
    ],
  },
  {
    id: "next",
    range: "next",
    name: "Unwritten",
    blurb: "The first living systems enter the actual world.",
    events: [],
  },
];

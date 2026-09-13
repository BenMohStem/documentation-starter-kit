export type Thread = {
  id: string;
  name: string;
  blurb: string;
  papers: number;
  targets: string;
  seeds?: { title: string; id: string }[];
  feeds?: string;
};

export const corpusStats = [
  { number: "428", label: "Papers harvested with provenance — sha256, metadata, and extraction state per file.", source: "corpus log" },
  { number: "426", label: "Full texts extracted (UTF-8), spot-checked — 5/5 pass.", source: "corpus log" },
  { number: "6,299", label: "Metadata works across 8 threads; 2,220 ranked high-relevance.", source: "corpus log" },
  { number: "0", label: "Duplicate sha256 hashes — the harvest is clean.", source: "corpus log" },
];

/**
 * The literature corpus — the engine's research library of papers,
 * organized into 8 threads matched to the engine's live problems.
 * Papers are hypotheses; the machine decides. Every note records
 * what the project can reuse, what it must not copy, and the threats
 * to the paper's validity.
 */
export const threads: Thread[] = [
  {
    id: "A",
    name: "Contact & constraint solvers",
    blurb: "Warm starting, shock propagation, stacking, ordering — the solver's own literature.",
    papers: 77,
    targets: "warm start, shock propagation, solver ordering, stacking",
    seeds: [
      { title: "Fast and Feature-Complete Differentiable Physics for Articulated Rigid Bodies with Contact", id: "arXiv:2103.16021" },
      { title: "An Unconditionally Stable First-Order Constraint Solver for Multibody Systems", id: "arXiv:1905.10828" },
      { title: "Tensor Train accelerated solvers for nonsmooth rigid body dynamics", id: "arXiv:1808.02558" },
    ],
    feeds: "the warm-start replay line (era 3.50) and the solver-convergence program",
  },
  {
    id: "B",
    name: "Data layout & cache locality",
    blurb: "Reuse distance, churn, amortized rebuild — the memory-behavior literature behind the layout program.",
    papers: 70,
    targets: "dynamic layout, AoS/SoA/AoSoA, reuse distance",
    seeds: [
      { title: "Memory Hierarchy Sensitive Graph Layout", id: "arXiv:1203.5675" },
      { title: "Beyond Reuse Distance Analysis", id: "arXiv:1401.5024" },
      { title: "Fast Modeling L2 Cache Reuse Distance Histograms", id: "arXiv:1907.05068" },
    ],
    feeds: "the layout-manager program (3.185–3.191): two-level blocking, repair-carry reblock, epochal headroom",
  },
  {
    id: "C",
    name: "SIMD & floating-point numerics",
    blurb: "Bitwise-identical lanes, FMA hazards, reproducible reductions — the numerical contract's literature.",
    papers: 70,
    targets: "deterministic arithmetic, FMA, reproducible reduction",
    seeds: [
      { title: "Impacts of floating-point non-associativity on reproducibility for HPC and deep learning", id: "arXiv:2408.05148" },
      { title: "Precision-aware Deterministic and Probabilistic Error Bounds for Floating Point Summation", id: "arXiv:2203.15928" },
      { title: "Deterministic Inference across Tensor Parallel Sizes", id: "arXiv:2511.17826" },
    ],
    feeds: "the SIMD numerical contract doctrine (the 3.119–3.172 audit chain)",
  },
  {
    id: "D",
    name: "Graph layout & coloring",
    blurb: "Wide-SIMD coloring, body ordering, matrix reordering — the topology literature.",
    papers: 60,
    targets: "graph coloring, sparse reordering, SpMV",
    seeds: [
      { title: "Factorization-in-Loop: Proximal Fill-in Minimization for Sparse Matrix Reordering", id: "arXiv:2511.09093" },
      { title: "Is Sparse Matrix Reordering Effective for SpMV?", id: "arXiv:2506.10356" },
      { title: "Bridging the Gap between Sparse Matrix Reordering and Factorization", id: "arXiv:2605.17339" },
    ],
    feeds: "the no-universal-best finding (3.175–3.184) and the topology families",
  },
  {
    id: "E",
    name: "Broadphase & collision",
    blurb: "SAP, grids, BVH under churn, temporal coherence — the structure literature.",
    papers: 60,
    targets: "broadphase, BVH refit, temporal coherence",
    seeds: [
      { title: "Mochi: Fast & Exact Collision Detection", id: "arXiv:2402.14801" },
      { title: "Efficient n-to-n Collision Detection for Space Debris using 4D AABB Trees", id: "arXiv:1901.10475" },
      { title: "Rethinking Collision Detection on GPU Ray Tracing Architecture", id: "arXiv:2604.23520" },
    ],
    feeds: "the broadphase terrain map (era 2.0) and the BVH refit verdict",
  },
  {
    id: "F",
    name: "Benchmark methodology & integrity",
    blurb: "Measurement pitfalls, statistics, negative controls — the literature of not fooling yourself.",
    papers: 49,
    targets: "measurement stability, statistics, negative controls",
    seeds: [
      { title: "μOpTime: Statically Reducing the Execution Time of Microbenchmark Suites Using Stability Metrics", id: "arXiv:2501.12878" },
      { title: "BENCHIP: Benchmarking Intelligence Processors", id: "arXiv:1710.08315" },
      { title: "Towards effective assessment of steady state performance in Java software", id: "arXiv:2209.15369" },
    ],
    feeds: "the doctrine itself: D1–D8 grew from this thread plus the project's own incidents",
  },
  {
    id: "G",
    name: "Renderer & visibility",
    blurb: "Tiling, occlusion, per-pixel work — the raster literature behind the tile oracle.",
    papers: 20,
    targets: "tile rasterization, occlusion culling, visibility",
    feeds: "the per-pixel oracle promotion (era 2.67) and the tile-size matrix honesty",
  },
  {
    id: "H",
    name: "Determinism & replay",
    blurb: "Fixed-point, lockstep, replay verification — the determinism contract's literature.",
    papers: 20,
    targets: "deterministic simulation, replay, lockstep",
    feeds: "the determinism gates: same inputs, same world, byte for byte",
  },
];

export const corpusLaws = [
  "One arXiv process at a time — two concurrent harvests deadlock (WinError 10060).",
  "OpenAlex is rate-limited (HTTP 429) and parked; retries at 1 request per 3 seconds.",
  "Every PDF carries sha256 + metadata + extraction state — provenance is not optional.",
  "Failures are knowledge: the harvest log keeps them with dates.",
];

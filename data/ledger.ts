import type { WWAStatus } from "@/components/status-badge";

export type LedgerEntry = {
  id: string;
  era: string;
  title: string;
  claim: string;
  status: WWAStatus;
  whatHappened: string;
  why: string;
  scope?: string;
  tags?: string[];
};

/**
 * The evidence ledger — every claim the record has ruled on, with
 * its verdict. Entries are transferred from the project archive era
 * by era, each checked against its source before publication. The
 * statuses are the project's own vocabulary; the vocabulary is
 * defined on the ledger page and never diluted.
 */
export const ledger: LedgerEntry[] = [
  /* ---------- 2.x — broadphase & renderer era ---------- */
  {
    id: "2.0",
    era: "2.0",
    title: "The broadphase terrain map",
    claim: "One broadphase method could serve all workloads.",
    status: "NOT PROMOTED",
    whatHappened: "Brute force, uniform grid, and sweep-and-prune were measured across uniform, clustered, and coherent 1024-body workloads. Uniform grid won sparse/coherent; brute force became competitive on clustered; full-rebuild SAP never won.",
    why: "No universal winner — the standing finding of the whole record, first measured here. The broadphase chooses per workload, or admits it has no claim.",
    tags: ["broadphase"],
  },
  {
    id: "2.13",
    era: "2.13",
    title: "One shared spatial index",
    claim: "One packed spatial structure with consumer masks can replace four independent spatial structures.",
    status: "PROMOTED",
    whatHappened: "An integrated world with physics, perception, audio, and rendering consuming one shared index measured 5.7× against the four-structure world at 1‰ churn (5.3–6.1× across 0.1‰–2.5‰). Direct renderer visibility added 1.04×–1.36× on top.",
    why: "The largest integrated win in the record: one structure, one cost, one truth about what-is-near-what — every consumer reads the same world.",
    tags: ["spatial", "integration"],
  },
  {
    id: "2.19",
    era: "2.19",
    title: "The tile rasterizer",
    claim: "Sorting triangles into screen tiles beats reference rasterization at scale.",
    status: "PROMOTED (SCOPED)",
    whatHappened: "4k-triangle reference 146.7M ticks → tiled 109.6M; large triangles 196.4M → 129.6M. Dirty-cell migration kept 0%-movement updates essentially free (0.00016M vs 3.65M full rebuild). The tile-size matrix later showed 8×8 only 1.09–1.36× over larger tiles — not universal, kept scoped.",
    why: "Promoted after the per-pixel oracle (2.67) found zero mismatches across adversarial scenes. The scope is part of the claim.",
    scope: "Production raster path; tile size 8×8 with measured, not assumed, superiority",
    tags: ["renderer"],
  },
  {
    id: "2.25",
    era: "2.25",
    title: "BVH refit as rebuild replacement",
    claim: "Refitting a BVH to moved bodies is cheaper than rebuilding it.",
    status: "NOT PROMOTED",
    whatHappened: "Refit ranged from 0.68× to 2.75× of rebuild speed: it won on coherent updates (1024 bodies, 5% moved) and lost badly on clustered motion (100% moved).",
    why: "Refit is not a universal replacement — another entry in the no-universal-best doctrine, kept beside its winning case.",
    tags: ["broadphase", "renderer"],
  },
  {
    id: "2.55",
    era: "2.55",
    title: "AVX2 FP8 gather decode",
    claim: "Decoding FP8 through AVX2 gather beats AVX2 BF16 compute.",
    status: "REJECTED",
    whatHappened: "The gather path measured 378,790 ticks against AVX2 BF16's 145,295 — the gather spent more time decoding values than computing on them.",
    why: "Kept as a named negative with its regression: low-precision storage does not license low-precision compute.",
    tags: ["quantization", "simd"],
  },
  {
    id: "2.78",
    era: "2.78",
    title: "The adaptive spatial manager",
    claim: "A spatial manager could switch storage layouts adaptively per workload.",
    status: "REJECTED",
    whatHappened: "The state-integrity gate failed: storage order had coupled to entity identity, and candidate sets diverged between layouts. The benchmark numbers never mattered.",
    why: "State integrity gates architecture. A structure that corrupts the world's state loses regardless of its speed.",
    tags: ["spatial"],
  },
  {
    id: "2.79",
    era: "2.79",
    title: "The shared spatial layer",
    claim: "Sharing one spatial layer across systems halves memory while speeding the frame.",
    status: "PROMOTED",
    whatHappened: "Median 1.43× speedup with index memory halved (2,097,152 → 1,048,576 bytes) at 131,072 entities.",
    why: "Compound interest on the 2.13 finding: one index, measured again, cheaper again.",
    tags: ["spatial", "integration"],
  },
  {
    id: "2.83",
    era: "2.83",
    title: "Dirty-set broadphase speedup",
    claim: "Migration-only candidate updates are 28.9× faster.",
    status: "RESEARCH ONLY",
    whatHappened: "The 28.9× was real — at 0% movement, against a full rebuild. But complete-step ratios landed at 0.90–1.05× because traversal dominates the step. The speed claim was demoted to a data-contract finding.",
    why: "Traversal wins can evaporate in the complete step. The record keeps the number and refuses the promotion.",
    tags: ["broadphase"],
  },
  {
    id: "2.95",
    era: "2.95",
    title: "Low-precision compute",
    claim: "FP8/MXFP8/NVFP4 can replace FP32 in consumer kernels.",
    status: "NOT PROMOTED",
    whatHappened: "Consumer kernel measurements: FP32 853,080 ticks, BF16 852,868 (parity), FP8 1,711,736, MXFP8 2,201,605, NVFP4 1,321,435. Everything below BF16 lost.",
    why: "Quantization is a storage and transport surface, never a compute replacement. The family stays for compression, not arithmetic.",
    tags: ["quantization"],
  },
  {
    id: "2.98",
    era: "2.98",
    title: "Morton order universally",
    claim: "Morton-curve ordering beats row-major storage for spatial traversal.",
    status: "NOT PROMOTED",
    whatHappened: "Morton beat random scatter 1.48× (131,072 particles, exact checksums) — but linked row-major won on uniform and coherent workloads when construction cost was charged. The adaptive rule (max_cell ≥ 24 → consider Morton) stayed research-only.",
    why: "Morton wins where scatter wins. The selector rule is honest; the universal claim is not.",
    tags: ["spatial", "broadphase"],
  },

  /* ---------- 3.x — the physics research line ---------- */
  {
    id: "3.50",
    era: "3.50",
    title: "Warm-started contact replay",
    claim: "Contacts that remember their impulses replay near-instantly at zero drift.",
    status: "PROMOTED",
    whatHappened: "Residual target 1e-2: 32 cold iterations vs 0 warm — 70.98× at zero drift. The ratio decayed honestly with tolerance: 21.97× at 0.01, 13.11× at 0.05, 8.72× at 0.10. The stricter 5×10⁻³ target was not reached in 128 iterations — kept as a negative.",
    why: "Warm starting is physical state initialization, not copying cached metadata. The record's most-cited single result, with its own honest boundary.",
    tags: ["solver", "warm-start"],
  },
  {
    id: "3.118",
    era: "3.118",
    title: "Cached-K epochs",
    claim: "Cached solver matrices (K) survive across frames when geometry holds.",
    status: "RESEARCH ONLY",
    whatHappened: "The epoch doctrine — cached-K only when geometry/mass epochs prove validity — survived. The performance claims did not: corrected working-set (3.162) and timed-region (3.163) audits collapsed the ratios, and the 3.171 corrected churn benchmark measured cached-K slower than recompute (median 0.88×) at all churn rates.",
    why: "Neither direction promoted; the complete persistent pipeline is the real optimization target. The doctrine line and the performance line were separated, honestly.",
    tags: ["solver", "cache"],
  },
  {
    id: "3.185",
    era: "3.185",
    title: "The persistent-trigger layout manager",
    claim: "A 1.44× layout-management win for persistent-trigger repair.",
    status: "RETRACTED",
    whatHappened: "Promoted on single-process median-of-3 numbers. Fresh-process repetition exposed run-to-run spreads of 59–302 cycles/contact — larger than the claimed effect. Retracted the same session.",
    why: "The retraction that built the noise floor: interleaved execution, min-of-K, and the 2× noise-floor rule (D1) were adopted immediately. The claim's death is the record's gain.",
    tags: ["layout", "incident"],
  },
  {
    id: "3.187",
    era: "3.187",
    title: "Cheap-swap on hub topologies",
    claim: "A cheap pull-toward-partner swap wins on hub-and-community contact graphs at low churn.",
    status: "PROMOTED (SCOPED)",
    whatHappened: "Hub topologies, 32K bodies, 0% churn: 18–41 cycles/contact effect against noise floors of 4.8–6.7 — clearing the 2× bar on two independent runs, oracle green, negative control armed and caught.",
    why: "The first promotion to survive the full gate battery — and it carried its scope with it: hub topologies, low churn, nothing else claimed.",
    scope: "Hub/community topologies at low churn; the no-universal doctrine held",
    tags: ["layout"],
  },
  {
    id: "3.189",
    era: "3.189",
    title: "The adaptive layout selector",
    claim: "A stride-sampled topology probe can choose the right layout policy at runtime.",
    status: "PROMOTED (SCOPED)",
    whatHappened: "The selector matched identity on five non-target families (0 rebuilds, 0 swaps — declines to act) and won on its targets: 3.11× at 256K bodies on hub topology (beating every static policy), two independent runs. The 128K hub effect was 4.2×.",
    why: "Conditional-safe: the selector's honesty is the feature. It must earn its layout and decline to act where it has no claim.",
    scope: "Registered scopes: 8K–128K bodies (extended to 256K by verification), churn 0–20%, target families only",
    tags: ["layout", "selector"],
  },
  {
    id: "3.190",
    era: "3.190",
    title: "The graph-degree probe",
    claim: "An order-invariant degree instrument can detect chain topologies and extend the selector's scope to 1% churn.",
    status: "PROMOTED (SCOPED)",
    whatHappened: "Chain at 128K, 1% churn: effect 27.5 vs bar 3.1 (8.8×) on run one, 27.9 vs 4.9 on run two — the 3.189 miss resolved as instrument-bound. Four implementation defects (A1/A4/A5/A7) were caught by the gates before any number was believed, zero thresholds tuned. At 5% churn the chain genuinely dissolves — the selector exits honestly, promotion correctly scoped to 0–1%.",
    why: "The instrument that cannot decay. Its promotion price was measured too: +10–15 cycles never-lose cost, and the mix battery honestly lost to the stateless 3.189 selector.",
    scope: "Chain action at 128K, family model, 0–1% churn, 48-frame horizons",
    tags: ["layout", "selector", "instrument"],
  },
  {
    id: "3.207",
    era: "3.207",
    title: "The retracted accumulation kernel",
    claim: "(retracted) A Gauss-Seidel kernel's convergence measurements.",
    status: "RETRACTED",
    whatHappened: "The earlier kernel did not accumulate projected contact impulse across sweeps — its convergence measurements were invalid. Timing remained usable only as a kernel microbenchmark; the convergence claims were withdrawn.",
    why: "A public retraction in the solver line, kept visible. The corrected accumulation+projection kernel with Fischer–Burmeister residual followed (target ‖φ‖_RMS ≤ 1e-6).",
    tags: ["solver", "incident"],
  },
  {
    id: "3.211",
    era: "3.211",
    title: "Symmetric Gauss-Seidel",
    claim: "SGS converges faster than projected Gauss-Seidel.",
    status: "REJECTED",
    whatHappened: "Chain workload: PGS reached 1.06e-5 residual at ~93 passes; SGS sat at 1.52e-4 at 64 passes and needed ~128 to target. More work per pass, more passes total.",
    why: "Measured and declined, with the numbers. Fewer iterations does not mean a faster solver — T_solution = N_sweeps × T_sweep.",
    tags: ["solver"],
  },
  {
    id: "3.212",
    era: "3.212",
    title: "PSOR relaxation",
    claim: "Over-relaxed projected Gauss-Seidel converges in far fewer passes.",
    status: "CANDIDATE",
    whatHappened: "ω=1.5: 28–31 passes vs ω=1.0's 93–94 on chain workloads — one case fell from 50.4M to 15.4M cycles. Random topologies preferred ω=1.2–1.3. No production promotion: the workload-dependent ω is unsolved, and adaptive PSOR is pre-committed as the next experiment.",
    why: "A stronger lead than the locality heuristics because it attacks the number of expensive sweeps directly — while respecting the exact numerical contract. Candidate, honestly.",
    tags: ["solver"],
  },
];

export const statusOrder: WWAStatus[] = [
  "PROMOTED",
  "PROMOTED (SCOPED)",
  "CANDIDATE",
  "RESEARCH ONLY",
  "NOT PROMOTED",
  "REJECTED",
  "RETRACTED",
];

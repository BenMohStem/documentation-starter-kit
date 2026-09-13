export type Thought = {
  n: number;
  title: string;
  body: string;
  tags: string[];
  source: string;
};

/**
 * The thought database — design principles and hard-won positions,
 * numbered in the order they were settled. Each entry cites where it
 * came from: the founding prompt, a measured iteration, or a kept
 * failure. Nothing here is aspiration that outruns evidence.
 */
export const thoughts: Thought[] = [
  {
    n: 1,
    title: "The world must keep living even when the player does nothing",
    body: "The founding demand. Everything else in the project is downstream of it: a world that pauses is a diorama, not a world. The phrase to beat is the demo arc's last beat — \"the world did not pause while the player was gone.\"",
    tags: ["founding", "world"],
    source: "the founding prompt, §1",
  },
  {
    n: 2,
    title: "Simple rules, faithfully applied — that is the entire bet",
    body: "Emergence is not complexity; it is obedience. A small number of honest rules, applied every frame without exception, produce what no author could place. The danger is always the exception: one scripted convenience and the world stops being trustworthy.",
    tags: ["founding", "emergence"],
    source: "the founding prompt, §35",
  },
  {
    n: 3,
    title: "A machine made from simple rules is a machine that can be understood",
    body: "The player should be able, in principle, to hold the world's logic in mind — the way a farmer understands weather. Prefer simple systems with systemic interaction over clever systems with opaque ones.",
    tags: ["founding", "design"],
    source: "the founding prompt, §1",
  },
  {
    n: 4,
    title: "No universal best — the most repeated finding in the record",
    body: "Every layout, every broadphase, every data structure that was measured across workloads produced the same shape of answer: it wins somewhere and loses somewhere else. The project's promotions therefore always carry their scope. A claim without a scope is not a claim.",
    tags: ["measured", "doctrine"],
    source: "eras 2.0–3.x, standing finding",
  },
  {
    n: 5,
    title: "The instrument is audited before it measures",
    body: "A benchmark is itself an experiment, and it must earn trust the same way: against a known failure. The project once measured \"5% churn\" that was actually 534 of 12,288 contacts — the declared workload never ran. Since then, instrument first, always.",
    tags: ["doctrine", "measured"],
    source: "incident 3.171",
  },
  {
    n: 6,
    title: "A control that cannot fail is not a control",
    body: "Every battery carries a deliberately corrupted run that must be caught. The day the corrupted run passes quietly is the day every other green number stops meaning anything.",
    tags: ["doctrine"],
    source: "gate D6",
  },
  {
    n: 7,
    title: "Noise is a floor, not a nuisance",
    body: "Process-to-process spread once exceeded a claimed 1.44× effect. The promotion was retracted the same session. The correction was not \"try harder\" — it was interleaved execution, min-of-K, and an explicit noise-floor column in every table. Effects must clear 2× the floor, twice.",
    tags: ["doctrine", "measured", "kept-failure"],
    source: "incident 3.185-1",
  },
  {
    n: 8,
    title: "Failures are kept — the same mistake, never twice",
    body: "Retracted results stay in the record, marked, with their story. The negatives are the map: they are how the terrain got learned. A library that only keeps its wins teaches nothing.",
    tags: ["doctrine", "kept-failure"],
    source: "provenance rule, §38",
  },
  {
    n: 9,
    title: "An optimization must pay for its own organization",
    body: "Preparation, remapping, and maintenance costs are charged against the savings, amortized over the horizon that will actually use them. A \"smarter\" structure that scatters memory loses to a simple scan — measured, more than once.",
    tags: ["measured", "doctrine"],
    source: "the economics rule",
  },
  {
    n: 10,
    title: "Organize the data so the cheaper physics is also the cheaper memory traversal",
    body: "The governing rule of the engine's research line. The simulation's cost is dominated by memory traffic — cache lines, prefetch, working sets — not arithmetic. Where a body sits in memory changes how fast the solver can think about it.",
    tags: ["engine", "measured"],
    source: "engine research line, standing rule",
  },
  {
    n: 11,
    title: "Determinism is a design constraint, not a feature",
    body: "Same inputs, same world, byte for byte, on every release. It shapes the numerical contract: fixed operation order, bitwise lane checks, exact-state oracles. The payoff is that knowledge in the game is stable — what you learn about wolves stays true about wolves.",
    tags: ["engine", "design"],
    source: "the determinism gates",
  },
  {
    n: 12,
    title: "Prefer twenty reusable components over two thousand items",
    body: "Content bloat is fake complexity. A smaller set of genuinely interactive parts produces a larger space of real behavior. The judge's test is the same as the player's: can you find an interaction nobody authored?",
    tags: ["founding", "design"],
    source: "the founding prompt, §36",
  },
  {
    n: 13,
    title: "The world is never balanced around player convenience",
    body: "A bear is a bear; it can outrun you. Winter starves the unprepared. Danger is real; so is safety, earned. Convenience purchased with honesty bankrupts the world's trustworthiness.",
    tags: ["founding", "design"],
    source: "the founding prompt, §7–8",
  },
  {
    n: 14,
    title: "Animals are organisms, not props",
    body: "Hunger, fear, aggression, territory, reproduction, memory. A bear behaves like a bear — every time, whether watched or not. The crow that calls its friends is a rule about crows, not a scripted event with a crow skin.",
    tags: ["world", "design"],
    source: "the founding prompt, §7",
  },
  {
    n: 15,
    title: "Noticing is the mechanic",
    body: "No journal explains what the animal wants. No minimap icon over the herb you need. The world keeps its own state and shows it — in tracks, in weather, in behavior, in price. The player who watches carefully knows things the player who rushes cannot.",
    tags: ["world", "design"],
    source: "the no-HUD doctrine, §34",
  },
  {
    n: 16,
    title: "Computers emerge; they are never placed",
    body: "Logic gates plus memory plus clock plus input plus output, assembled by the player who can understand the machine. Never a magical \"computer block.\" The same discipline runs through crafting: ore → smelting → metal, never \"3 rocks + 1 flower.\"",
    tags: ["design", "engineering"],
    source: "the founding prompt, §15–17",
  },
  {
    n: 17,
    title: "Armies march on their stomachs",
    body: "War emerges from grain, roads, tribute, and fear — and armies require food, equipment, horses, money, manpower, and they march. Nothing teleports. A war that cannot be starved is a cutscene with casualties.",
    tags: ["world", "design"],
    source: "the founding prompt, §18–22",
  },
  {
    n: 18,
    title: "Morality is arithmetic applied over time, never a meter",
    body: "A civilization that treats people brutally gains short-term efficiency and eventually suffers rebellion, distrust, and decline. One that protects people develops trust, stability, and innovation. Not good/evil points — consequences with memory.",
    tags: ["world", "design"],
    source: "the founding prompt, §6",
  },
  {
    n: 19,
    title: "The subtle layer stays subtle",
    body: "The world contains a quiet philosophical layer — order, consciousness, morality, the origin of things. It is never preached, never stated, never required. Thoughtful players may wonder; the world never answers for them. That restraint is the design.",
    tags: ["world", "founding"],
    source: "the founding prompt, §6",
  },
  {
    n: 20,
    title: "One shared sense of what-is-near-what",
    body: "Physics, perception, audio, and rendering each need to know what is near what. Building four spatial structures means four costs and four drift paths. One shared spatial index with consumer masks measured 5.7× against the four-structure world at 1‰ churn.",
    tags: ["engine", "measured"],
    source: "era 2.13 integration study",
  },
  {
    n: 21,
    title: "Measure the complete frame, not the flattering function",
    body: "A fast solve that pays for a slow re-sort is a loss. Every promotion is judged on complete-frame accounting — all costs charged, nothing amortized by omission. \"Complete-path cost law\" is how the record phrases it.",
    tags: ["doctrine", "measured"],
    source: "era 3.190, price law",
  },
  {
    n: 22,
    title: "Scalable abstraction must be honest",
    body: "Distant regions simulated statistically, nearby regions per-entity, detail increasing with proximity — by measurement, not by promise. The day LOD is a lie, the world is two games wearing one coat, and the player will find the seam.",
    tags: ["world", "engine"],
    source: "the founding prompt, §9, §27",
  },
  {
    n: 23,
    title: "The engine is not a detour from the idea — it is the idea, taken seriously",
    body: "\"A beautiful world with shallow simulation is NOT the goal... a relatively simple world with astonishing systemic interaction IS.\" Every honest world system the design promises has its real cost in the engine layers below it. Building the floor first is the shortcut.",
    tags: ["founding", "engine"],
    source: "the founding prompt, §36",
  },
  {
    n: 24,
    title: "Prefer independent reference implementations as oracles",
    body: "The strongest checks come from writing the expected answer a second, independent way — a different algorithm, a different data path — and demanding exact agreement. Where the project trusted one implementation to verify itself, it was fooling itself.",
    tags: ["doctrine", "engine"],
    source: "measurement hierarchy, level 2",
  },
];

export const allTags = ["founding", "design", "world", "engine", "measured", "doctrine", "kept-failure", "emergence", "engineering"];

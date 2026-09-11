# World Without Answers — Website

The public evidence site for **World Without Answers (WWA)**: a game
about a world that does not explain itself, built on a from-scratch C
engine measured every step of the way.

This site is organized around the project's core discipline: **every
claim is bound to its measurement**. Promotions, negative results,
retractions, and the doctrine that decides between them are all
published. A visitor should never have to guess what is real.

## Sections

- **World** — the premise, emergence, observation, and roadmap
- **Demo** — what runs today, and the build/validation gates
- **Engine** — std layer, builder, physics, broadphase & locality,
  renderer, quantized numerics
- **Record** — evidence ledger, the doctrine (D1–D8), integrity
  incidents, era timeline
- **Research** — the paper corpus, a full literature-to-engine loop,
  and the use policy

## Status vocabulary

Every claim carries a status label: `FOUNDATION`, `PROMOTED`,
`PROMOTED (SCOPED)`, `CANDIDATE`, `RESEARCH ONLY`, `NOT PROMOTED`,
`REJECTED`, `RETRACTED`, `INVALIDATED`, `SUPERSEDED`.

## Local Development

```bash
npm i        # install dependencies
npm run dev  # development server at localhost:3000
```

## Verification

```bash
npm run build       # production build (all pages static)
npm run typecheck   # TypeScript, strict
```

## Deploy

Deploys automatically to Vercel from `main`.

## License

MIT

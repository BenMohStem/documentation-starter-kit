# World Without Answers — Website

The public evidence site for **World Without Answers (WWA)**: a game
about a world that does not explain itself, built on a from-scratch C
engine measured every step of the way.

This site is organized around the project's core discipline: **every
claim is bound to its measurement**. Promotions, negative results,
retractions, and the doctrine that decides between them are all
published. A visitor should never have to guess what is real.

## The four ways to read the project

- **Timeline** (`/docs/timeline`) — the dated chronology: founding,
  promotions, retractions, incidents, on one spine
- **Ledger** (`/research/ledger`) — every claim with its verdict and
  its scope
- **Thoughts** (`/docs/thoughts`) — the settled positions, numbered
  and sourced
- **Doctrine** (`/research/doctrine`) — the gates a measurement must
  survive, learned one caught mistake at a time

## Sections

- **World** — the premise, emergence, observation, and roadmap
- **Demo** — what runs today, the proof frames, and the build gates
- **Engine** — std layer, physics, renderer
- **Systems** — ecology, economy, engineering, war, science, the Moon
- **Library** (`/research`) — the era shelves and the corpus catalog

## Status vocabulary

Every claim carries a status label: `FOUNDATION`, `PROMOTED`,
`PROMOTED (SCOPED)`, `CANDIDATE`, `RESEARCH ONLY`, `NOT PROMOTED`,
`REJECTED`, `RETRACTED`, `INVALIDATED`, `SUPERSEDED`. The vocabulary
is defined on the ledger page and never diluted.

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

"use client";

import { CSSProperties } from "react";

export type WWAStatus =
  | "FOUNDATION"
  | "PROMOTED"
  | "PROMOTED (SCOPED)"
  | "CANDIDATE"
  | "RESEARCH ONLY"
  | "NOT PROMOTED"
  | "REJECTED"
  | "RETRACTED"
  | "INVALIDATED"
  | "SUPERSEDED";

export const STATUS_MEANING: Record<WWAStatus, string> = {
  FOUNDATION: "Base architecture every other result builds on.",
  PROMOTED: "Survived the full gate battery; part of the engine now.",
  "PROMOTED (SCOPED)": "Survived the gates within its registered scope; the scope is part of the claim.",
  CANDIDATE: "Promising and measured, but not yet promoted.",
  "RESEARCH ONLY": "Valid knowledge that never entered the engine.",
  "NOT PROMOTED": "Measured and declined — a recorded decision, not a failure.",
  REJECTED: "Failed its gate; kept as knowledge.",
  RETRACTED: "Claimed, then withdrawn the same session when a gate caught it.",
  INVALIDATED: "Earlier claim later disproven by a corrected benchmark.",
  SUPERSEDED: "Replaced by a better result; kept for history.",
};

export const STATUS_COLOR: Record<WWAStatus, string> = {
  FOUNDATION: "#9ec49a",
  PROMOTED: "#9ec49a",
  "PROMOTED (SCOPED)": "#9ec49a",
  CANDIDATE: "#d9a662",
  "RESEARCH ONLY": "#b8bcbe",
  "NOT PROMOTED": "#8d8d85",
  REJECTED: "#c48a7a",
  RETRACTED: "#c46a6a",
  INVALIDATED: "#c46a6a",
  SUPERSEDED: "#8d8d85",
};

export default function StatusBadge({ status }: { status: WWAStatus }) {
  const style: CSSProperties = {
    display: "inline-block",
    padding: "0.1rem 0.55rem",
    borderRadius: "999px",
    border: `1px solid ${STATUS_COLOR[status]}`,
    color: STATUS_COLOR[status],
    fontSize: "0.72rem",
    letterSpacing: "0.06em",
    fontFamily: "var(--font-mono, monospace)",
    verticalAlign: "middle",
    background: "transparent",
    whiteSpace: "nowrap",
  };
  return (
    <span style={style} title={STATUS_MEANING[status]}>
      {status}
    </span>
  );
}

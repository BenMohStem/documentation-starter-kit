"use client";

import { useMemo, useState } from "react";
import { ledger, statusOrder } from "@/data/ledger";
import StatusBadge, { STATUS_MEANING } from "@/components/status-badge";
import type { WWAStatus } from "@/components/status-badge";

export default function EvidenceLedger() {
  const [activeStatuses, setActiveStatuses] = useState<WWAStatus[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      activeStatuses.length === 0
        ? ledger
        : ledger.filter((e) => activeStatuses.includes(e.status)),
    [activeStatuses]
  );

  const toggle = (s: WWAStatus) =>
    setActiveStatuses((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <div>
      {/* status filter chips */}
      <div className="wwa-thought-filters" role="group" aria-label="Filter ledger by status">
        <button
          className={`wwa-thought-chip ${activeStatuses.length === 0 ? "wwa-thought-chip-on" : ""}`}
          onClick={() => setActiveStatuses([])}
        >
          all
        </button>
        {statusOrder.map((s) => (
          <button
            key={s}
            className={`wwa-thought-chip ${activeStatuses.includes(s) ? "wwa-thought-chip-on" : ""}`}
            style={activeStatuses.includes(s) ? { borderColor: "var(--wwa-amber)", color: "var(--wwa-amber)" } : undefined}
            onClick={() => toggle(s)}
          >
            {s.toLowerCase()}
          </button>
        ))}
      </div>

      {/* ledger entries */}
      <div className="wwa-ledger">
        {visible.map((e) => {
          const expanded = open === e.id;
          return (
            <div
              key={e.id}
              className={`wwa-ledger-row ${expanded ? "wwa-thought-open" : ""}`}
              onClick={() => setOpen(expanded ? null : e.id)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  setOpen(expanded ? null : e.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
            >
              <div className="wwa-ledger-head">
                <span className="wwa-ledger-id">{e.id}</span>
                <span className="wwa-ledger-title">{e.title}</span>
                <span className="wwa-ledger-badge" onClick={(ev) => ev.stopPropagation()}>
                  <StatusBadge status={e.status} />
                </span>
                <span className="wwa-thought-arrow" aria-hidden>
                  {expanded ? "–" : "+"}
                </span>
              </div>
              <div className={`wwa-thought-body ${expanded ? "" : "wwa-thought-collapsed"}`}>
                <p className="wwa-ledger-claim">
                  <span className="wwa-ledger-claim-label">The claim — </span>
                  {e.claim}
                </p>
                <p className="wwa-thought-text">{e.whatHappened}</p>
                <p className="wwa-ledger-why">
                  <span className="wwa-ledger-claim-label">Why — </span>
                  {e.why}
                </p>
                {e.scope && (
                  <p className="wwa-ledger-scope">
                    <span className="wwa-ledger-claim-label">Scope — </span>
                    {e.scope}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="wwa-quiet-note">No entries carry this status yet.</div>
      )}

      {/* the vocabulary, always visible */}
      <div className="wwa-ledger-vocab">
        <h3 className="wwa-thought-section-title">The vocabulary</h3>
        <p className="wwa-thought-section-blurb">
          Every claim carries exactly one status. The statuses are the
          project's own; they are never mixed or softened.
        </p>
        <div className="wwa-ledger-vocab-grid">
          {(["FOUNDATION", "PROMOTED", "PROMOTED (SCOPED)", "CANDIDATE", "RESEARCH ONLY", "NOT PROMOTED", "REJECTED", "RETRACTED", "INVALIDATED", "SUPERSEDED"] as WWAStatus[]).map((s) => (
            <div key={s} className="wwa-ledger-vocab-entry">
              <StatusBadge status={s} />
              <span className="wwa-ledger-vocab-meaning">{STATUS_MEANING[s]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

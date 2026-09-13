"use client";

import { useMemo, useState } from "react";
import { thoughts, allTags } from "@/data/thoughts";

const TAG_COLORS: Record<string, string> = {
  founding: "var(--wwa-amber)",
  design: "#9ec49a",
  world: "#8fb8c9",
  engine: "#c9a8d8",
  measured: "var(--wwa-amber-soft)",
  doctrine: "#d8c2a0",
  "kept-failure": "#8a4a4a",
  emergence: "#9ec49a",
  engineering: "#8fb8c9",
};

export default function ThoughtsIndex() {
  const [active, setActive] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      active.length === 0
        ? thoughts
        : thoughts.filter((t) => t.tags.some((tag) => active.includes(tag))),
    [active]
  );

  const toggle = (tag: string) =>
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  return (
    <div>
      {/* filter chips */}
      <div className="wwa-thought-filters" role="group" aria-label="Filter thoughts by theme">
        <button
          className={`wwa-thought-chip ${active.length === 0 ? "wwa-thought-chip-on" : ""}`}
          onClick={() => setActive([])}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`wwa-thought-chip ${active.includes(tag) ? "wwa-thought-chip-on" : ""}`}
            style={active.includes(tag) ? { borderColor: TAG_COLORS[tag] ?? "var(--wwa-amber)", color: TAG_COLORS[tag] ?? "var(--wwa-amber)" } : undefined}
            onClick={() => toggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* thought entries */}
      <div className="wwa-thoughts">
        {visible.map((t) => {
          const expanded = open === t.n;
          return (
            <div
              key={t.n}
              className={`wwa-thought ${expanded ? "wwa-thought-open" : ""}`}
              onClick={() => setOpen(expanded ? null : t.n)}
            >
              <div className="wwa-thought-head">
                <span className="wwa-thought-n">{String(t.n).padStart(2, "0")}</span>
                <span className="wwa-thought-title">{t.title}</span>
                <span className="wwa-thought-arrow" aria-hidden>
                  {expanded ? "–" : "+"}
                </span>
              </div>
              <div className={`wwa-thought-body ${expanded ? "" : "wwa-thought-collapsed"}`}>
                <p className="wwa-thought-text">{t.body}</p>
                <div className="wwa-thought-meta">
                  {t.tags.map((tag) => (
                    <span key={tag} className="wwa-thought-tag" style={{ color: TAG_COLORS[tag] ?? "var(--wwa-amber)" }}>
                      {tag}
                    </span>
                  ))}
                  <span className="wwa-thought-source">{t.source}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="wwa-quiet-note">No thoughts carry these tags together yet.</div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { thoughts, allTags, categories } from "@/data/thoughts";
import type { Category } from "@/data/thoughts";

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
  record: "#9fb0a8",
};

const CATEGORY_ORDER: Category[] = ["founding", "doctrine", "engine", "world", "record"];

export default function ThoughtsIndex() {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      activeTags.length === 0
        ? thoughts
        : thoughts.filter((t) => t.tags.some((tag) => activeTags.includes(tag))),
    [activeTags]
  );

  const byCategory = useMemo(() => {
    const map: Record<Category, typeof thoughts> = {
      founding: [],
      doctrine: [],
      engine: [],
      world: [],
      record: [],
    };
    for (const t of visible) map[t.category].push(t);
    return map;
  }, [visible]);

  const toggle = (tag: string) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  return (
    <div>
      {/* tag filters */}
      <div className="wwa-thought-filters" role="group" aria-label="Filter thoughts by theme">
        <button
          className={`wwa-thought-chip ${activeTags.length === 0 ? "wwa-thought-chip-on" : ""}`}
          onClick={() => setActiveTags([])}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`wwa-thought-chip ${activeTags.includes(tag) ? "wwa-thought-chip-on" : ""}`}
            style={
              activeTags.includes(tag)
                ? { borderColor: TAG_COLORS[tag] ?? "var(--wwa-amber)", color: TAG_COLORS[tag] ?? "var(--wwa-amber)" }
                : undefined
            }
            onClick={() => toggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* category sections */}
      {CATEGORY_ORDER.map((cat) => {
        const items = byCategory[cat];
        if (items.length === 0) return null;
        const meta = categories.find((c) => c.id === cat)!;
        return (
          <section key={cat} className="wwa-thought-section">
            <h3 className="wwa-thought-section-title">{meta.label}</h3>
            <p className="wwa-thought-section-blurb">{meta.blurb}</p>
            <div className="wwa-thoughts">
              {items.map((t) => {
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
                      {t.links && t.links.length > 0 && (
                        <div className="wwa-thought-links">
                          {t.links.map((l) => (
                            <a key={l.href} href={l.href} className="wwa-thought-link" onClick={(e) => e.stopPropagation()}>
                              {l.label} →
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {visible.length === 0 && (
        <div className="wwa-quiet-note">No thoughts carry these tags together yet.</div>
      )}
    </div>
  );
}

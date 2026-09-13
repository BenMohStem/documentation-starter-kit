"use client";

import { eras } from "@/data/timeline";
import type { TimelineEvent } from "@/data/timeline";

const KIND_STYLE: Record<TimelineEvent["kind"], { color: string; label: string }> = {
  founding: { color: "var(--wwa-amber)", label: "founding" },
  milestone: { color: "var(--wwa-moonlight)", label: "milestone" },
  promotion: { color: "var(--wwa-pale-green)", label: "promotion" },
  retraction: { color: "#c46a6a", label: "retraction" },
  incident: { color: "#c48a7a", label: "incident" },
  rejection: { color: "var(--wwa-stone)", label: "rejection" },
};

export default function EraTimeline() {
  return (
    <div className="wwa-timeline">
      {eras.map((era) => (
        <section key={era.id} className="wwa-timeline-era">
          <div className="wwa-timeline-era-head">
            <span className="wwa-timeline-era-range">{era.range}</span>
            <span className="wwa-timeline-era-name">{era.name}</span>
          </div>
          <p className="wwa-timeline-era-blurb">{era.blurb}</p>
          {era.events.length === 0 ? (
            <div className="wwa-timeline-event wwa-timeline-event-empty">
              <span className="wwa-timeline-dot" style={{ background: "var(--wwa-stone)" }} />
              <div className="wwa-timeline-event-body">
                <span className="wwa-timeline-event-title">The next entry is not written yet</span>
                <span className="wwa-timeline-event-body-text">
                  It will be added when it is settled — measured, gated, and honest — never before.
                </span>
              </div>
            </div>
          ) : (
            era.events.map((ev) => (
              <div key={ev.id} className="wwa-timeline-event">
                <span
                  className="wwa-timeline-dot"
                  style={{ background: KIND_STYLE[ev.kind].color }}
                  title={KIND_STYLE[ev.kind].label}
                />
                <div className="wwa-timeline-event-body">
                  <div className="wwa-timeline-event-meta">
                    <span className="wwa-timeline-event-date">{ev.date}</span>
                    <span
                      className="wwa-timeline-event-kind"
                      style={{ color: KIND_STYLE[ev.kind].color }}
                    >
                      {KIND_STYLE[ev.kind].label}
                    </span>
                  </div>
                  <span className="wwa-timeline-event-title">{ev.title}</span>
                  <p className="wwa-timeline-event-text">{ev.body}</p>
                </div>
              </div>
            ))
          )}
        </section>
      ))}
    </div>
  );
}

"use client";

import { threads } from "@/data/research-corpus";

export default function ResearchCorpus() {
  return (
    <div className="wwa-corpus">
      {threads.map((t) => (
        <div key={t.id} className="wwa-corpus-thread">
          <div className="wwa-corpus-thread-head">
            <span className="wwa-corpus-thread-id">{t.id}</span>
            <span className="wwa-corpus-thread-name">{t.name}</span>
            <span className="wwa-corpus-thread-count">{t.papers}</span>
          </div>
          <p className="wwa-corpus-thread-blurb">{t.blurb}</p>
          {t.seeds && (
            <ul className="wwa-corpus-seeds">
              {t.seeds.map((s) => (
                <li key={s.id}>
                  <span className="wwa-corpus-seed-title">{s.title}</span>
                  <span className="wwa-corpus-seed-id">{s.id}</span>
                </li>
              ))}
            </ul>
          )}
          {t.feeds && (
            <p className="wwa-corpus-feeds">
              <span className="wwa-ledger-claim-label">Feeds — </span>
              {t.feeds}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";

/**
 * PageHead — the unified page opening: an overline (small caps
 * context), the page title, and an optional lead paragraph. Replaces
 * the raw span hack with one consistent, calmer block.
 */
export default function PageHead({
  overline,
  title,
  lead,
  children,
}: {
  overline?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="wwa-pagehead">
      {overline && <span className="wwa-pagehead-overline">{overline}</span>}
      <h1 className="wwa-pagehead-title">{title}</h1>
      {lead && <p className="wwa-pagehead-lead">{lead}</p>}
      {children}
    </div>
  );
}

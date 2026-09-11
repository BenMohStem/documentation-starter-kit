import StatusBadge, { STATUS_MEANING, STATUS_COLOR } from "@/components/status-badge";
import type { WWAStatus } from "@/components/status-badge";

const ORDER: WWAStatus[] = [
  "FOUNDATION",
  "PROMOTED",
  "CANDIDATE",
  "RESEARCH ONLY",
  "NOT PROMOTED",
  "REJECTED",
  "INVALIDATED",
  "SUPERSEDED",
];

export default function StatusLegend() {
  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        {ORDER.map((s) => (
          <tr key={s}>
            <td>
              <StatusBadge status={s} />
            </td>
            <td>{STATUS_MEANING[s]}</td>
          </tr>
        ))}
      </tbody>
      <style>{`
        td { border-color: ${STATUS_COLOR["RESEARCH ONLY"]}22; }
      `}</style>
    </table>
  );
}

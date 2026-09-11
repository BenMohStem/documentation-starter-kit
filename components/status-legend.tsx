import StatusBadge, { STATUS_MEANING } from "@/components/status-badge";
import type { WWAStatus } from "@/components/status-badge";

const ORDER: WWAStatus[] = [
  "FOUNDATION",
  "PROMOTED",
  "PROMOTED (SCOPED)",
  "CANDIDATE",
  "RESEARCH ONLY",
  "NOT PROMOTED",
  "REJECTED",
  "RETRACTED",
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
    </table>
  );
}

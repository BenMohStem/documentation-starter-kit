import StatusBadge from "@/components/status-badge";
import StatusLegend from "@/components/status-legend";
import FactGrid from "@/components/fact-grid";
import ProofFigure from "@/components/proof-figure";

export const useMDXComponents = (components) => ({
  ...components,
  StatusBadge,
  StatusLegend,
  FactGrid,
  ProofFigure,
});

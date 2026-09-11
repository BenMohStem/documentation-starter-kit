type Fact = {
  number: string;
  label: string;
  source: string;
};

export default function FactGrid({ facts }: { facts: Fact[] }) {
  return (
    <div className="wwa-facts">
      {facts.map((f) => (
        <div className="wwa-fact" key={f.number + f.label}>
          <span className="wwa-fact-number">{f.number}</span>
          <span className="wwa-fact-label">{f.label}</span>
          <span className="wwa-fact-source">{f.source}</span>
        </div>
      ))}
    </div>
  );
}

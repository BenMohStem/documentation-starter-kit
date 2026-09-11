import HeroScene from "@/components/hero-scene";

export default function HomeHero() {
  return (
    <div className="wwa-hero">
      <HeroScene />
      <div className="wwa-hero-title">
        <h1>World Without Answers</h1>
      </div>
      <span className="wwa-hero-scroll">↓</span>
    </div>
  );
}

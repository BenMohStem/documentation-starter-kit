import HomeHero from "@/components/home-hero";
import SystemGlyph from "@/components/system-glyph";
import SceneHeader from "@/components/scene-header";
import GlyphCards from "@/components/glyph-cards";
import Atmosphere from "@/components/atmosphere";
import Reveal from "@/components/reveal";
import FactGrid from "@/components/fact-grid";
import ThoughtsIndex from "@/components/thoughts-index";
import EvidenceLedger from "@/components/evidence-ledger";
import EraTimeline from "@/components/era-timeline";
import ResearchCorpus from "@/components/research-corpus";
import ProofFigure from "@/components/proof-figure";
import Link from "next/link";

export const useMDXComponents = (components) => ({
  ...components,
  HomeHero,
  SystemGlyph,
  SceneHeader,
  GlyphCards,
  Atmosphere,
  Reveal,
  FactGrid,
  ThoughtsIndex,
  EvidenceLedger,
  EraTimeline,
  ResearchCorpus,
  ProofFigure,
  Link,
});

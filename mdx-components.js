import HomeHero from "@/components/home-hero";
import SystemGlyph from "@/components/system-glyph";
import SceneHeader from "@/components/scene-header";
import GlyphCards from "@/components/glyph-cards";
import Atmosphere from "@/components/atmosphere";
import Reveal from "@/components/reveal";
import Link from "next/link";

export const useMDXComponents = (components) => ({
  ...components,
  HomeHero,
  SystemGlyph,
  SceneHeader,
  GlyphCards,
  Atmosphere,
  Reveal,
  Link,
});

import HomeHero from "@/components/home-hero";
import SystemGlyph from "@/components/system-glyph";
import Atmosphere from "@/components/atmosphere";
import Reveal from "@/components/reveal";
import Link from "next/link";

export const useMDXComponents = (components) => ({
  ...components,
  HomeHero,
  SystemGlyph,
  Atmosphere,
  Reveal,
  Link,
});

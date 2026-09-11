import HomeHero from "@/components/home-hero";
import SystemGlyph from "@/components/system-glyph";
import Link from "next/link";

export const useMDXComponents = (components) => ({
  ...components,
  HomeHero,
  SystemGlyph,
  Link,
});

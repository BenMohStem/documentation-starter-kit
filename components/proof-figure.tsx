import { ReactNode } from "react";

export default function ProofFigure({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <figure className="wwa-figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      <figcaption className="wwa-figure-caption">{children}</figcaption>
    </figure>
  );
}

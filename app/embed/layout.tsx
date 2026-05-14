import type { Metadata } from "next";
import { BodyClassEffect } from "./BodyClassEffect";

export const metadata: Metadata = {
  title: "XSS Playground / embed",
  description:
    "Internal security PoC. Not intended for indexing or human navigation.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
};

const EmbedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BodyClassEffect />
      {children}
    </>
  );
};

export default EmbedLayout;

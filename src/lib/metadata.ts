import type { Metadata } from "next";

export const metaTitle = "Design Library — Team Knowledge Base";
export const metaDescription =
  "A shared knowledge base where the design team captures and browses the useful things they read.";
export const canonicalUrl = "https://catalyst.konvert7.com";

export const openGraph: Metadata["openGraph"] = {
  title: metaTitle,
  description: metaDescription,
  type: "website",
  siteName: "Design Library",
  locale: "en_US",
  images: [
    {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
    },
  ],
};

export const twitter: Metadata["twitter"] = {
  title: metaTitle,
  description: metaDescription,
  card: "summary_large_image",
  images: [
    {
      url: "/twitter-image.png",
      width: 1200,
      height: 630,
    },
  ],
};

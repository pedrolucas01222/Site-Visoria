import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/servicos", "/sobre", "/contato", "/politica-de-privacidade"];
  return [
    ...pages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/contato" ? 0.9 : 0.7,
    })),
  ];
}

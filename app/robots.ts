import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.ayadicatering.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/admin/", "/profile/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

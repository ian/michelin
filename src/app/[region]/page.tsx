import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MichelinBookshelf } from "@/components/MichelinBookshelf";
import { RegionHeader } from "@/components/RegionHeader";

export async function generateMetadata({ params }): Promise<Metadata> {
  const regionName =
    params.region.charAt(0).toUpperCase() + params.region.slice(1);

  return {
    title: `${regionName} | The Michelin Project`,
    description: `Explore historic Michelin Guide Red Books from ${regionName}, showcasing the region's culinary heritage and gastronomic excellence.`,
  };
}

async function getAllRegions() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const files = await fs.readdir(contentDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""))
    .sort();
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const files = await fs.readdir(contentDir);

  const regions = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const content = await fs.readFile(path.join(contentDir, file), "utf8");
        const region = file.replace(".md", "");
        return {
          region,
          content,
        };
      })
  );

  return regions.map(({ region }) => ({
    region,
  }));
}

export default async function RegionPage({ params }) {
  const regions = await getAllRegions();
  const currentIndex = regions.indexOf(params.region);
  const prevRegion =
    currentIndex > 0 ? regions[currentIndex - 1] : regions[regions.length - 1];
  const nextRegion =
    currentIndex < regions.length - 1 ? regions[currentIndex + 1] : regions[0];

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    `${params.region}.md`
  );

  try {
    const file = await fs.readFile(filePath, "utf8");

    return (
      <div className="container mx-auto px-4 pb-20">
        <RegionHeader prevRegion={prevRegion} nextRegion={nextRegion} />

        <h1 className="text-4xl font-serif mb-2 capitalize text-center">
          {params.region}
        </h1>
        <MichelinBookshelf content={file} country={params.region} />
      </div>
    );
  } catch {
    notFound();
  }
}

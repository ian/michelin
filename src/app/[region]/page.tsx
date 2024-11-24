import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import MichelinBookshelf from "@/components/MichelinBookshelf";

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
      <div className="container mx-auto px-4">
        <header className="border-b py-4 mb-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <span className="text-lg">←</span>
                <span>Back</span>
              </Link>
              <span className="font-medium">The Michelin Project</span>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/${prevRegion}`}
                className="p-2 text-gray-600 hover:text-gray-900 border rounded hover:bg-gray-50 transition-colors"
              >
                ←
              </Link>
              <Link
                href={`/${nextRegion}`}
                className="p-2 text-gray-600 hover:text-gray-900 border rounded hover:bg-gray-50 transition-colors"
              >
                →
              </Link>
            </div>
          </nav>
        </header>

        <h1 className="text-4xl font-serif mb-2 capitalize text-center">
          {params.region}
        </h1>
        <MichelinBookshelf content={file} />
      </div>
    );
  } catch {
    notFound();
  }
}

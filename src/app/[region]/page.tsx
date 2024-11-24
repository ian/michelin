import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import MichelinBookshelf from "@/components/MichelinBookshelf";

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
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    `${params.region}.md`
  );

  try {
    const file = await fs.readFile(filePath, "utf8");

    return (
      <div className="container mx-auto">
        <div className="flex items-center gap-4 my-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Regions
          </Link>
          <h1 className="text-3xl font-bold">
            <span className="capitalize">{params.region}</span>
          </h1>
        </div>
        <MichelinBookshelf content={file} />
      </div>
    );
  } catch {
    notFound();
  }
}

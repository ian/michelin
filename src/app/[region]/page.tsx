import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import MichelinBookshelf from "@/components/MichelinBookshelf";

interface PageProps {
  params: {
    region: string;
  };
}

export default async function RegionPage({ params }: PageProps) {
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

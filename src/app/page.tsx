import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Michelin Project | Historic Guide Collection",
  description:
    "Explore our comprehensive collection of historic Michelin Guide Red Books, documenting decades of culinary excellence and gastronomic evolution worldwide.",
};

export default async function Page() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const files = await fs.readdir(contentDir);

  const regions = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));

  return (
    <div className="container mx-auto pb-20">
      <h1 className="text-4xl font-serif mb-2 capitalize text-center pt-10">
        The Michelin Project
      </h1>
      <p className="pb-10 pt-5 max-w-xl mx-auto">
        Our mission is to meticulously gather and showcase the complete
        collection of Michelin Guide Red Books, spanning decades of culinary
        excellence and history. Each book represents a unique snapshot of the
        gastronomic landscape of its time, and together, they form a
        comprehensive archive of the evolution of fine dining. Join us on this
        journey as we explore the rich heritage and stories encapsulated within
        these iconic guides.
      </p>
      <div className="grid gap-4">
        {regions.map((region) => (
          <Link
            key={region}
            href={`/${region}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="capitalize">{region}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

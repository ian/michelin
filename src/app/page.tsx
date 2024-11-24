import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

export default async function Page() {
  const contentDir = path.join(process.cwd(), "src", "content");
  const files = await fs.readdir(contentDir);

  const regions = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">Michelin Guide Book Tracker</h1>
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

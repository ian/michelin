import { promises as fs } from "fs";
import path from "path";
import MichelinBookshelf from "@/components/MichelinBookshelf";

export default async function Page() {
  const file = await fs.readFile(
    path.join(process.cwd(), "src", "content", "france.md"),
    "utf8"
  );

  console.log({ file });

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-8">
        Michelin Guide Book Tracker - France
      </h1>
      <MichelinBookshelf content={file} />
    </div>
  );
}

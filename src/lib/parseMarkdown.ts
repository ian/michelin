export interface Book {
  year: number;
  collected: boolean;
  description?: string;
  special?: boolean;
}

export function parseMarkdown(content: string): Book[] {
  const lines = content.split("\n");
  const books: Book[] = [];

  lines.forEach((line) => {
    const match = line.match(/- \[([ x])\] (\d{4}X?)(?: - (.+))?/);
    if (match) {
      books.push({
        year: parseInt(match[2], 10),
        special: match[2].endsWith("X"),
        collected: match[1] === "x",
        description: match[3],
      });
    }
  });

  return books;
}

export interface Book {
  year: number;
  collected: boolean;
  description?: string;
}

export function parseMarkdown(content: string): Book[] {
  const lines = content.split("\n");
  const books: Book[] = [];

  lines.forEach((line) => {
    const match = line.match(/- \[([ x])\] (\d{4})(?: - (.+))?/);
    if (match) {
      books.push({
        year: parseInt(match[2], 10),
        collected: match[1] === "x",
        description: match[3],
      });
    }
  });

  return books;
}

export interface Book {
  year: string;
  collected: boolean;
  description?: string;
}

export function parseMarkdown(content: string): Book[] {
  const lines = content.split('\n');
  const books: Book[] = [];

  lines.forEach(line => {
    const match = line.match(/- \[([ x])\] (\d{4})(?: - (.+))?/);
    if (match) {
      books.push({
        year: match[2],
        collected: match[1] === 'x',
        description: match[3]
      });
    }
  });

  return books;
}


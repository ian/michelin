import React from "react";
import { Book, parseMarkdown } from "../lib/parseMarkdown";
import clsx from "clsx";

interface MichelinBookshelfProps {
  content: string;
}

const MichelinBookshelf: React.FC<MichelinBookshelfProps> = ({ content }) => {
  const books = parseMarkdown(content);
  const firstYear = Number(books[0]?.year);
  const decadeStart = Math.floor(firstYear / 10) * 10;
  const paddingCount = firstYear - decadeStart;
  const paddingSlots = Array.from({ length: paddingCount }, (_, i) => ({
    year: decadeStart + i,
    collected: false,
    description: "",
  }));

  return (
    <div className="flex flex-col gap-2">
      {[...paddingSlots, ...books]
        .reduce((rows, book, index) => {
          const rowIndex = Math.floor(index / 10);
          rows[rowIndex] = rows[rowIndex] || [];
          rows[rowIndex].push(book);
          return rows;
        }, [])
        .map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((book: Book, bookIndex) => (
              <div
                key={`${rowIndex}-${bookIndex}`}
                className="w-10 h-40 relative"
              >
                {book.collected ? (
                  <div
                    className="absolute bottom-0 w-full h-[95%] bg-red-600 rounded-sm shadow-sm flex items-center justify-center"
                    title={book.description}
                  >
                    <span className="text-black font-bold text-xs rotate-90 whitespace-nowrap">
                      {book.year}
                    </span>
                  </div>
                ) : (
                  <div
                    className={clsx(
                      "absolute bottom-0 w-full h-[95%] border border-dashed border-gray-300 rounded-sm flex items-center justify-center",
                      {
                        "opacity-0": book.year >= 1940 && book.year <= 1944,
                      }
                    )}
                  >
                    <span className="text-gray-400 font-bold text-xs rotate-90 whitespace-nowrap">
                      {book.year}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default MichelinBookshelf;

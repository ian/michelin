import React from "react";
import { parseMarkdown } from "../lib/parseMarkdown";
import clsx from "clsx";

interface MichelinBookshelfProps {
  content: string;
}

const MichelinBookshelf: React.FC<MichelinBookshelfProps> = ({ content }) => {
  const books = parseMarkdown(content);
  const firstYear = Number(books[0]?.year);
  const decadeStart = Math.floor(firstYear / 10) * 10;
  const paddingCount = firstYear - decadeStart;
  const paddingSlots = Array.from({ length: paddingCount }, () => ({
    year: null,
    collected: false,
    description: "",
  }));

  return (
    <div className="grid grid-cols-10 gap-1">
      {[...paddingSlots, ...books].map((book, index) => (
        <div key={index} className="w-full h-40 relative">
          {book.collected ? (
            <div
              className="absolute bottom-0 w-full h-[95%] bg-red-600 rounded-sm shadow-sm flex items-center justify-center"
              title={book.description}
            >
              <span className="text-black font-bold text-xl rotate-90 whitespace-nowrap">
                {book.year}
              </span>
            </div>
          ) : (
            <div
              className={clsx(
                "absolute bottom-0 w-full h-[95%] border border-dashed border-gray-300 rounded-sm flex items-center justify-center",
                {
                  "opacity-0":
                    book.year === null ||
                    (book.year >= 1940 && book.year <= 1944),
                }
              )}
            >
              <span className="text-gray-300 font-bold text-xl rotate-90 whitespace-nowrap">
                {book.year}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MichelinBookshelf;

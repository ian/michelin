import React from "react";
import { parseMarkdown } from "../lib/parseMarkdown";

interface MichelinBookshelfProps {
  content: string;
}

const MichelinBookshelf: React.FC<MichelinBookshelfProps> = ({ content }) => {
  const books = parseMarkdown(content);

  return (
    <div className="flex flex-wrap gap-1 p-4">
      {books.map((book, index) => (
        <div key={index} className="w-10 h-40 relative">
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
            <div className="absolute bottom-0 w-full h-[95%] border border-dashed border-gray-300 rounded-sm flex items-center justify-center">
              <span className="text-gray-400 font-bold text-xs rotate-90 whitespace-nowrap">
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

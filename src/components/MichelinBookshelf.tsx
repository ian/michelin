import React from 'react';
import { parseMarkdown, Book } from '../utils/parseMarkdown';

interface MichelinBookshelfProps {
  content: string;
}

const MichelinBookshelf: React.FC<MichelinBookshelfProps> = ({ content }) => {
  const books = parseMarkdown(content);

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {books.map((book, index) => (
        <div key={index} className="w-20 h-80 relative">
          {book.collected ? (
            <div 
              className="absolute bottom-0 w-full h-[95%] bg-red-600 rounded-sm shadow-md flex items-center justify-center"
              title={book.description}
            >
              <span className="text-black font-bold text-lg rotate-90 whitespace-nowrap">
                {book.year}
              </span>
            </div>
          ) : (
            <div className="absolute bottom-0 w-full h-[95%] border-2 border-dashed border-gray-300 rounded-sm flex items-center justify-center">
              <span className="text-gray-400 font-bold text-lg rotate-90 whitespace-nowrap">
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


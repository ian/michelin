import React from "react";
import { Book, parseMarkdown } from "../lib/parseMarkdown";
import clsx from "clsx";
import { cn } from "@/lib/utils";

type Country = 'france' | 'benelux' | 'switzerland' | 'spain' | "portugal" | 'italy' | 'germany' | 'great-britain' | "ireland"

const getBookColors = (country: Country, book: Book): string => {
  const { year, collected } = book;

  const modernColors = cn(
    "bg-[#C1002C] text-[#000]", 
    collected  ? "bg-red-600 text-black" : "bg-transparent  border-2 border-dashed border-opacity-50 bg-opacity-10 border-red-300 text-[#C1002C]"
  )

  switch (country) {
    case 'france':
      if (book.special) {
        // 1939 was a special year printed by the alies for WW2
        return "border-[#AD7746] text-[#AD7746] opacity-50 bg-[#AD7746]/20"
      }

      return modernColors

    case 'benelux':
      if (year <= 1958) {
        return cn(
          'border-countries-benelux bg-countries-benelux',
          collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-benelux"
        )
        
      }
      break;

    case 'great-britain': 
      if (year <= 1930) {
        return cn(
          'border-countries-ireland bg-countries-ireland',
          collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-ireland"
        )
        
      }
      break;      

    case 'ireland':
      if (year <= 1925) {
        return cn(
          'border-countries-ireland bg-countries-ireland',
          collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-ireland"
        )
        
      }
      break;      

    case 'germany':
        if (year <= 1958) {
          return cn(
            'border-countries-germany bg-countries-germany',
            collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-germany"
          )
          
        }
        break;

    case 'portugal':
        if (year <= 1913) {
          return cn(
            'border-countries-portugal bg-countries-portugal',
            collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-portugal"
          )
          
        }
        break;

    case 'spain':
          if (year <= 1958) {
            return cn(
              'border-countries-spain bg-countries-spain',
              collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-spain"
            )
          }
          break;
    
    case 'switzerland':
      if (year < 1932) {
        return cn(
          'border-countries-switzerland bg-countries-switzerland',
          collected ? "text-black" : "bg-transparent border-2 border-dashed border-opacity-50 bg-opacity-10 text-countries-switzerland"
        )
      }
      break;

    
    // Add other countries as needed
  }

  return modernColors;
};

interface MichelinBookshelfProps {
  content: string;
  country: Country;
}

const MichelinBookshelf: React.FC<MichelinBookshelfProps> = ({ content, country }) => {
  const books = parseMarkdown(content);
  const firstYear = Number(books[0]?.year);
  const decadeStart = Math.floor(firstYear / 10) * 10;
  const paddingCount = firstYear - decadeStart;
  const paddingSlots = Array.from({ length: paddingCount }, () => ({
    year: null,
    collected: false,
    description: "",
    special: false,
  }));

  return (
    <div className="grid grid-cols-10 gap-1">
      {[...paddingSlots, ...books].map((book, index) => {
        const className = book.year ? getBookColors(country, book) : null;

        console.log({
          country,
          year: book.year,
          className,
        })

        return (
          <div key={index} className="w-full h-40 relative">
            <div
                className={clsx(
                  "absolute bottom-0 w-full h-[95%] rounded-sm flex items-center justify-center",
                  className,
                  {
                    "border-[#AD7746] text-[#AD7746] opacity-50 bg-[#AD7746]/20":
                      book.special,
                    "opacity-0":
                      book.year === null ||
                      (book.year >= 1940 && book.year <= 1944),
                    
                  },
                )}
                
              >
                <span className=" font-bold text-xl rotate-90 whitespace-nowrap">
                  {book.year}
                </span>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default MichelinBookshelf;

"use client";

import { useEffect } from "react";
import Link from "next/link";

interface RegionHeaderProps {
  prevRegion: string;
  nextRegion: string;
}

export function RegionHeader({ prevRegion, nextRegion }: RegionHeaderProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        window.location.href = `/${prevRegion}`;
      } else if (event.key === "ArrowRight") {
        window.location.href = `/${nextRegion}`;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prevRegion, nextRegion]);

  return (
    <header className="border-b py-4 mb-8">
      <nav className="grid grid-cols-3 items-center">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <span className="text-lg">←</span>
          <span>Back</span>
        </Link>
        <span className="font-medium text-center font-serif">
          The Michelin Project
        </span>
        <div className="flex gap-2 justify-end">
          <Link
            href={`/${prevRegion}`}
            className="p-2 text-gray-600 hover:text-gray-900 border rounded hover:bg-gray-50 transition-colors"
          >
            ←
          </Link>
          <Link
            href={`/${nextRegion}`}
            className="p-2 text-gray-600 hover:text-gray-900 border rounded hover:bg-gray-50 transition-colors"
          >
            →
          </Link>
        </div>
      </nav>
    </header>
  );
}

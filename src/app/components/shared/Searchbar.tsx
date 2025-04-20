"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "@/utils/debounce";

const Searchbar = ({ setResult }: { setResult: (val: string) => void }) => {
  const [text, setText] = useState("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setResult(value);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(text);
  }, [text, debouncedSearch]);

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={20}
        height={20}
        className="object-contain"
      />
      <input
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search people"
        className="flex h-10 w-full rounded-md px-3 py-2 text-sm bg-dark-3 outline-none text-white"
      />
    </div>
  );
};

export default Searchbar;

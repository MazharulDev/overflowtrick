"use client";
import { useGetSearchPostQuery } from "@/redux/post/postApi";
import Image from "next/image";
import { useState } from "react";

const Searchbar = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const { data: searchResult } = useGetSearchPostQuery(result);
  console.log(searchResult);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setResult(text);
  };
  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={20}
        height={20}
        className="object-contain"
      />
      <form onSubmit={handleSubmit}>
        <input
          id="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Search post"
          className="flex h-10 w-full rounded-md px-3 py-2 text-sm bg-dark-3 outline-none text-white"
        />
      </form>
    </div>
  );
};

export default Searchbar;

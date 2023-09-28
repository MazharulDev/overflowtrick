"use client";
import SearchUserPage from "@/app/components/UI/SearchUser";
import Searchbar from "@/app/components/shared/Searchbar";
import { useGetSearchUserQuery } from "@/redux/user/userApi";
import React, { useState } from "react";

const SearchPage = () => {
  const [result, setResult] = useState<string>("");
  const { data: searchResult } = useGetSearchUserQuery(result);
  const searchDataResult = searchResult?.data;

  return (
    <div>
      <h1 className="text-heading3-bold text-white text-left">Search</h1>
      <div className="mt-8">
        <Searchbar setResult={setResult} />
      </div>
      <div className="mt-5">
        <SearchUserPage data={searchDataResult} />
      </div>
    </div>
  );
};

export default SearchPage;

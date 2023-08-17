"use client";

import { useGetAllPostQuery } from "@/redux/post/postApi";
import CreatePost from "../components/card/CreatePost";
import PostCard from "../components/card/PostCard";

export default function Home() {
  const { data } = useGetAllPostQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      {data ? (
        <>
          <p className="border border-slate-900 mt-4"></p>
          <div className="mt-5">
            <CreatePost />
          </div>
          <p className="border border-slate-900 mt-8"></p>
          <div className="mt-5">
            <PostCard data={data?.data} />
          </div>
        </>
      ) : (
        <p className="text-white text-heading2-bold mt-5">Loading...</p>
      )}
    </>
  );
}

"use client";

import CreatePost from "../components/card/CreatePost";
import PostCard from "../components/card/PostCard";

export default function Home() {
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <p className="border border-slate-900 mt-4"></p>
      <div className="mt-5">
        <CreatePost />
      </div>
      <p className="border border-slate-900 mt-8"></p>
      <div className="mt-5">
        <PostCard />
      </div>
    </>
  );
}

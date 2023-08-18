"use client";

import { useGetAllPostQuery } from "@/redux/post/postApi";
import CreatePost from "../components/card/CreatePost";
import PostCard from "../components/card/PostCard";
// import { useSession } from "next-auth/react";
// import { useGetSingleUserQuery } from "@/redux/user/userApi";
// import { redirect } from "next/navigation";

export default function Home() {
  // const { data: session } = useSession();
  // const {
  //   data: userByEmail,
  //   isLoading,
  //   isFetching,
  // } = useGetSingleUserQuery(session?.user?.email);
  // if (isLoading || isFetching) {
  //   return <p>Loading...</p>;
  // } else {
  //   if (session?.user?.email) {
  //     if (!userByEmail?.data?.username) {
  //       redirect("/set-username");
  //     }
  //   }
  // }
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

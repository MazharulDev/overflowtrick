"use client";

import AllPost from "../components/card/AllPost";
import CreatePost from "../components/card/CreatePost";
import { useSession } from "next-auth/react";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { redirect } from "next/navigation";
import { useGetAllPostQuery } from "@/redux/post/postApi";
import LoadingSpinner from "../components/loadingSpinner/Loading";

export default function Home() {
  const { data: session } = useSession();
  const {
    data: userByEmail,
    // isLoading,
    isFetching,
  } = useGetSingleUserQuery(session?.user?.email);
  if (isFetching) {
    return <LoadingSpinner />;
  } else {
    if (session?.user?.email) {
      if (!userByEmail?.data?.username) {
        redirect("/set-username");
      }
    }
  }

  return (
    <>
      <h1 className="text-heading3-bold text-white text-left">Home</h1>
      <>
        <p className="border border-slate-900 mt-4"></p>
        <div className="mt-5">
          <CreatePost />
        </div>
        <p className="border border-slate-900 mt-8"></p>
        <div className="mt-5">
          <AllPost />
        </div>
      </>
    </>
  );
}

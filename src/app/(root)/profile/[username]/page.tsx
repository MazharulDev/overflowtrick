"use client";
import PostCard from "@/app/components/card/PostCard";
import { useGetPostByUsernameQuery } from "@/redux/post/postApi";
import { useGetUserByUsernameQuery } from "@/redux/user/userApi";
import Image from "next/image";
import { ReactNode } from "react";

const DynamicUserProfile = ({
  params,
}: {
  params: {
    username: ReactNode;
    slug: string;
  };
}) => {
  const { data } = useGetUserByUsernameQuery(params?.username);

  return (
    <div>
      <div className="flex justify-between items-center">
        {data?.data?.email ? (
          <div className="flex justify-start items-center gap-5">
            <Image
              className="rounded-full"
              src={data?.data?.image as string}
              width={80}
              height={80}
              alt="profile pic"
            />
            <div className="text-white">
              <h2 className="text-heading3-bold">{data?.data?.name}</h2>
              <p className="text-slate-400">@{data?.data?.username}</p>
            </div>
          </div>
        ) : (
          <p className="text-white text-heading2-bold">Loading...</p>
        )}
      </div>
      {/* <p className="text-white mt-8">Mern stack Developer</p> */}
      <p className="border border-slate-800 mt-12"></p>
      <h3 className="text-white text-heading3-bold mt-5 mb-10">Recent Post</h3>
      <div className="mt-5">
        {data?.data?.posts.length > 0 ? (
          <PostCard data={data?.data} />
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default DynamicUserProfile;

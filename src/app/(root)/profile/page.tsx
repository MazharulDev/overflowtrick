"use client";
import PostCard from "@/app/components/card/PostCard";
import { useGetPostByUsernameQuery } from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { LiaUserEditSolid } from "react-icons/lia";

const ProfilePage = () => {
  const { data: session } = useSession();
  const { data } = useGetSingleUserQuery(session?.user?.email, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        {session?.user?.email ? (
          <div className="flex justify-start items-center gap-5">
            <Image
              className="rounded-full"
              src={session?.user?.image as string}
              width={80}
              height={80}
              alt="profile pic"
            />
            <div className="text-white">
              <h2 className="text-heading3-bold">{session?.user?.name}</h2>
              <p className="text-slate-400">@{data?.data?.username}</p>
            </div>
          </div>
        ) : (
          <p className="text-white text-heading2-bold">Loading...</p>
        )}
        <div className="text-white flex justify-center items-center gap-2 font-bold px-3 py-2 bg-dark-3 hover:bg-dark-2 cursor-pointer rounded-lg duration-100">
          <LiaUserEditSolid className="text-blue text-heading3-bold" />
          <button>Edit</button>
        </div>
      </div>
      {/* <p className="text-white mt-8">Mern stack Developer</p> */}
      <p className="border border-slate-800 mt-12"></p>
      <h3 className="text-white text-heading3-bold mt-5 mb-10">Recent Post</h3>
      <div className="mt-5">
        {data?.data?.posts?.length > 0 ? (
          <PostCard data={data?.data} />
        ) : (
          <p className="text-white">No post found</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

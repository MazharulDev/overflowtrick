"use client";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BiSave } from "react-icons/bi";

const profileEditPage = () => {
  const { data: session } = useSession();
  const { data } = useGetSingleUserQuery(session?.user?.email, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 2000,
  });
  return (
    <div className="flex justify-between items-center">
      {session?.user?.email && data?.data?.email ? (
        <div className="flex justify-start items-center gap-5">
          <Image
            className="rounded-full"
            src={data?.data?.image as string}
            width={80}
            height={80}
            alt="profile pic"
          />
          <div className="text-white">
            <input
              id="text"
              placeholder="Write your name"
              defaultValue={data?.data?.name}
              className="flex h-10 w-full rounded-sm px-3 py-2 text-sm bg-dark-3 outline-none text-white text-heading3-bold"
            />
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <h2>@</h2>
              </span>
              <input
                id="text"
                placeholder="Write your username"
                defaultValue={data?.data?.username}
                className="flex h-10 w-full rounded-sm px-3 mt-2 py-2 text-sm bg-dark-3 outline-none text-slate-400 pl-6"
              />
            </div>

            {/* <h2 className="text-heading3-bold">{data?.data?.name}</h2> */}
            {/* <p className="text-slate-400">@{data?.data?.username}</p> */}
          </div>
        </div>
      ) : (
        <p className="text-white text-heading2-bold">Loading...</p>
      )}
      <button className="text-white flex justify-center items-center gap-2 font-bold px-3 py-2 bg-dark-3 hover:bg-dark-2 cursor-pointer rounded-lg duration-100">
        <BiSave className="text-blue text-heading3-bold" />
        Save
      </button>
    </div>
  );
};

export default profileEditPage;

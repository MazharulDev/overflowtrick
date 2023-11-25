"use client";
import Image from "next/image";
import Link from "next/link";
// import Searchbar from "./Searchbar";
import { signOut, useSession } from "next-auth/react";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { AiOutlineLogout } from "react-icons/ai";
function Topbar() {
  const { data: session } = useSession();
  const { data } = useGetSingleUserQuery(session?.user?.email, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 2000,
  });
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
      </Link>
      {/* <div className="mx-4 md:ml-0 hidden md:block">
        <Searchbar />
      </div> */}
      <div className="flex items-center gap-1">
        {/* ------------------------- */}
        {data?.data?.role === "admin" && (
          <Link className="text-white border rounded-md p-2" href="dashboard">
            Dashboard
          </Link>
        )}
        <Link
          href="/profile"
          className="lg:block hover:bg-slate-900 p-2 rounded-md cursor-pointer"
        >
          {session?.user?.email && (
            <div className="flex justify-start items-center gap-4 text-white">
              <Image
                className="rounded-full"
                src={data?.data?.image as string}
                alt="logout"
                width={40}
                height={40}
              />
              <p className="text-body-bold hidden lg:block">
                {data?.data?.name}
              </p>
            </div>
          )}
        </Link>
        <div
          onClick={() => signOut()}
          className="flex cursor-pointer md:hidden rounded-md"
        >
          <div className="flex justify-center items-center text-white gap-2 p-2">
            <h5 className="">Logout</h5>
            <AiOutlineLogout />
          </div>
        </div>
        {/* ------------------------ */}
      </div>
    </nav>
  );
}

export default Topbar;

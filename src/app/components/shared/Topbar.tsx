"use client";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useSession } from "next-auth/react";
function Topbar() {
  const { data: session } = useSession();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        {/* <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Overflowtrick
        </p> */}
      </Link>
      <div className="mx-4 md:ml-0 hidden md:block">
        <Searchbar />
      </div>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          {/* <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn> */}
          <div className="flex cursor-pointer">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* ------------------------- */}
        <div className="hidden lg:block">
          {session?.user?.email && (
            <div className="flex justify-start items-center gap-4 text-white">
              <Image
                className="rounded-full"
                src={session?.user?.image as string}
                alt="logout"
                width={40}
                height={40}
              />
              <p className="text-body-bold">{session?.user?.name}</p>
            </div>
          )}
        </div>
        {/* ------------------------ */}
      </div>
    </nav>
  );
}

export default Topbar;

"use client";
import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="text-white">
      <h2>Profile page</h2>
      <p>{session?.user?.name}</p>

      {/* <Image
        src={session?.user?.image}
        width={28}
        height={28}
        alt="profile pic"
      /> */}
    </div>
  );
};

export default ProfilePage;

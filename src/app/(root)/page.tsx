"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      {session?.user ? (
        <div>
          <button className="bg-blue p-2 text-white" onClick={() => signOut()}>
            Logout
          </button>
          <p className="text-white">{session?.user?.name}</p>
        </div>
      ) : (
        <div>
          <div
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/",
              })
            }
            className="flex justify-center items-center gap-4 bg-slate-800 hover:bg-slate-900 p-3 rounded-lg text-white mb-4 cursor-pointer"
          >
            <h2>Sign in with Google</h2>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div className="bg-dark-1 h-screen flex justify-center items-center text-white">
      <div className="bg-dark-4 w-[30rem] h-[30rem] rounded-3xl">
        <div className="px-8">
          <div className="py-8">
            <Image
              className="bg-dark-1"
              src="/assets/logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
          </div>
          <div>
            <h2 className="text-heading3-bold ">Sign in</h2>
            <p>To continue to Overflowtrick</p>
          </div>
          <div
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000",
              })
            }
            className="mt-10 flex justify-start items-center gap-3 p-3 border border-gray-300 hover:bg-dark-3 cursor-pointer rounded-lg duration-100 "
          >
            <FcGoogle className="text-heading3-bold" />
            <button>Continue with Google</button>
          </div>
          <div className="mt-3 flex justify-start items-center gap-3 p-3 border border-gray-300 hover:bg-dark-3 cursor-pointer rounded-lg duration-100">
            <FaGithub className="text-heading3-bold" />
            <button>Continue with Github</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

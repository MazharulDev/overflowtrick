"use client";
import Image from "next/image";
import { BsGoogle } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/app/components/loadingSpinner/Loading";

const SignInPage = () => {
  const handleLoginWithGoogle = () => {
    signIn("google");
  };

  const { data: session } = useSession();

  const { data, isLoading, isFetching } = useGetSingleUserQuery(
    session?.user?.email
  );
  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  } else {
    if (session?.user?.email) {
      if (data?.data?.username) {
        redirect("/");
      } else {
        redirect("/set-username");
      }
    }
  }

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
            onClick={() => handleLoginWithGoogle()}
            className="mt-10 flex justify-start items-center gap-3 p-3 border border-gray-300 hover:bg-dark-3 cursor-pointer rounded-lg duration-100 "
          >
            <BsGoogle className="text-heading3-bold" />
            <button>Continue with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

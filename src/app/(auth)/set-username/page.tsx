"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePostUserMutation } from "@/redux/user/userApi";
type Inputs = {
  username: string;
  password: string;
};

const SetUsernamePage = () => {
  const router = useRouter();
  const [postUser] = usePostUserMutation();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const options = {
      data: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        username: data?.username?.toLocaleLowerCase()?.replace(/\s/g, ""),
        password: data?.username?.toLocaleLowerCase()?.replace(/\s/g, ""),
      },
    };
    if (session?.user) {
      postUser(options);
      router.push("/");
    }
  };

  return (
    <div className="bg-dark-1 h-screen flex justify-center items-center">
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
          <div className="text-white">
            <h2 className="text-heading3-bold ">Set username</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-start items-center gap-2 mt-10">
              <p className="text-white text-heading3-bold">@</p>
              <input
                {...register("username", { required: true })}
                className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
                type="text"
                placeholder="username"
              />
            </div>
            <div className="mt-5 flex justify-end items-center">
              <input
                type="submit"
                className="text-white bg-blue hover:bg-dark-3 duration-150 px-3 py-2 rounded-lg cursor-pointer"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetUsernamePage;

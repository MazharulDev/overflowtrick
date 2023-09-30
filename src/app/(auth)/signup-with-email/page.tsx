"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type loginInput = {
  name: string;
  email: string;
  username: string;
  password: string;
  repassword: string;
};

const signupWithEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInput>();
  const onSubmit: SubmitHandler<loginInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-dark-1 h-screen flex justify-center items-center text-white">
      <div className="bg-dark-4 w-[40rem] h-[31rem] rounded-3xl">
        <div className="px-4">
          <div className="py-4">
            <Image
              className="bg-dark-1"
              src="/assets/logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <p className="text-white mb-2">Full name</p>
              <input
                {...register("name", { required: true })}
                className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
                type="text"
                placeholder="Enter full name"
              />
            </div>
            <div className="mt-4">
              <p className="text-white mb-2">Email</p>
              <input
                {...register("email", { required: true })}
                className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
                type="email"
                placeholder="Enter Email address"
              />
            </div>
            <div className="mt-4">
              <p className="text-white mb-2">Username</p>
              <input
                {...register("username", { required: true })}
                className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
                type="text"
                placeholder="Enter unique username"
              />
            </div>
            <div className=" mt-4">
              <p className="text-white mb-2">Password</p>
              <input
                {...register("password", { required: true })}
                className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div className="mt-5 flex justify-end items-center">
              <input
                type="submit"
                value="Sign Up"
                className="text-white bg-blue hover:bg-dark-3 duration-150 px-3 py-2 rounded-lg cursor-pointer"
              ></input>
            </div>
          </form>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link href="login-with-email" className="text-blue">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signupWithEmail;

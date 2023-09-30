"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type loginInput = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const LoginWithEmail = () => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <p className="text-white mb-2">Email</p>
              <input
                {...register("email", { required: true })}
                className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
                type="email"
                placeholder="Enter Email address"
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
                value="Login"
                className="text-white bg-blue hover:bg-dark-3 duration-150 px-3 py-2 rounded-lg cursor-pointer"
              ></input>
            </div>
          </form>
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link href="signup-with-email" className="text-blue">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithEmail;

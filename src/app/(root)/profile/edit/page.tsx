"use client";
import LoadingSpinner from "@/app/components/loadingSpinner/Loading";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  username: string;
  bio: string;
};

const profileEditPage = () => {
  const [updateUser] = useUpdateUserMutation();
  const { data: session } = useSession();
  const router = useRouter();
  const { data } = useGetSingleUserQuery(session?.user?.email, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 2000,
  });
  const userId = data?.data?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const userData = {
        name: data.name,
        username: data.username,
        bio: data.bio,
      };
      const res: any = await updateUser({ userId, userData });
      if (res?.data?.success === true) {
        toast.success("Updated profile successfully");
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("name", { required: true })}
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
                  {...register("username", { required: true })}
                  id="text"
                  placeholder="Write your username"
                  defaultValue={data?.data?.username}
                  className="flex h-10 w-full rounded-sm px-3 mt-2 py-2 text-sm bg-dark-3 outline-none text-slate-400 pl-6"
                />
              </div>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
        <div>
          <input
            type="submit"
            value="Save"
            className="text-white gap-2 font-bold px-3 py-2 bg-dark-3 hover:bg-dark-2 rounded-lg duration-100 cursor-pointer"
          />
        </div>
      </div>
      <input
        {...register("bio")}
        id="text"
        placeholder="Write you bio"
        defaultValue={data?.data?.bio}
        className="flex h-10 w-full rounded-sm px-3 py-2 text-sm bg-dark-3 outline-none text-white mt-8"
      />
    </form>
  );
};

export default profileEditPage;

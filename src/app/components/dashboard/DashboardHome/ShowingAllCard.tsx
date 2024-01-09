"use client";
import { useGetUserQuery } from "@/redux/user/userApi";
import ShowingCard from "../UI/ShowingCard";
import { useGetAllPostQuery } from "@/redux/post/postApi";
import { IUser } from "@/interfaces/author";
import LoadingSpinner from "../../loadingSpinner/Loading";

const ShowingAllCard = () => {
  const { data: users } = useGetUserQuery(undefined);
  const { data: posts, isLoading } = useGetAllPostQuery(undefined);
  const admin = users?.data?.filter((user: IUser) => user?.role === "admin");

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="grid grid-cols-3">
      <ShowingCard text="Users" number={users?.meta?.total} />
      <ShowingCard text="Posts" number={posts?.meta?.total} />
      <ShowingCard text="Admins" number={admin?.length} />
    </div>
  );
};

export default ShowingAllCard;

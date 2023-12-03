"use client";

import UserManagementCard from "@/app/components/card/UserManagementCard";
import { IUser } from "@/interfaces/author";
import { useGetUserQuery } from "@/redux/user/userApi";

const UserManagement = () => {
  const { data: users } = useGetUserQuery(undefined);
  return (
    <div>
      <h2 className="text-heading1-bold text-white">User management </h2>
      <div className="mt-7 flex w-full flex-col gap-8">
        {users?.data?.map((user: IUser) => (
          <UserManagementCard person={user} />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

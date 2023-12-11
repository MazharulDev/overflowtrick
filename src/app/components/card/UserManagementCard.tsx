"use client";
import { useDeleteUserByIdMutation } from "@/redux/user/userApi";
import Image from "next/image";
import Link from "next/link";

const UserManagementCard = ({ person }: any) => {
  const [deleteUserById] = useDeleteUserByIdMutation();
  const handleDeleteUser = (id: string) => {
    // deleteUserById(id);
    console.log(id);
  };
  return (
    <Link
      href={`/profile/${person?.username}`}
      className="hover:bg-slate-800 p-2 rounded-md cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <Image
            className="rounded-full"
            src={person?.image}
            width={45}
            height={45}
            alt="profile pic"
          />
          {/* <img className="w-10 h-10 rounded-full" src={person?.image} alt="" /> */}
          <div className="text-white">
            <p>{person?.name}</p>
            <p>@{person?.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            {person?.role === "user" ? (
              <div>
                <button className="text-white px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-t rounded-md">
                  Make admin
                </button>
              </div>
            ) : (
              <div>
                <button
                  disabled
                  className="text-white px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded-md"
                >
                  Admin
                </button>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => handleDeleteUser(person?._id)}
              className="text-white px-2 bg-red-500 rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserManagementCard;

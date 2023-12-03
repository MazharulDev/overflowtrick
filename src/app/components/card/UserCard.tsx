import Image from "next/image";
import Link from "next/link";

const UserCardPage = ({ person }: any) => {
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
      </div>
    </Link>
  );
};

export default UserCardPage;

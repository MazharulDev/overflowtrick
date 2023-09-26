import Image from "next/image";
import Link from "next/link";

const UserCardPage = ({ person }: any) => {
  return (
    <Link
      href={`/profile/${person?.username}`}
      className="hover:bg-slate-800 p-2 rounded-md cursor-pointer"
    >
      <div className="flex justify-start items-center gap-5">
        <Image
          className="rounded-full"
          src={person?.image}
          width={45}
          height={45}
          alt="profile pic"
        />
        <div className="text-white">
          <p>{person?.name}</p>
          <p>@{person?.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCardPage;

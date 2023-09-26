"use client";
import { IUser } from "@/interfaces/author";
import { useGetUserQuery } from "@/redux/user/userApi";
import UserCardPage from "../card/UserCard";

const RightSidebar = () => {
  const { data: users } = useGetUserQuery(undefined);

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested for you</h3>
        <div className="mt-7 flex w-[250px] flex-col gap-8">
          {users?.data?.length > 0 ? (
            <>
              {users?.data?.slice(0, 3).map((person: IUser) => (
                <UserCardPage key={person.id} person={person} />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-slate-600">
          Copyright &copy; 2023 overflowtrick <br /> Developed By{" "}
          <a
            className="text-green-700 hover:underline"
            href="https://mdmazharulislam-dev.web.app/"
          >
            Md Mazharul Islam
          </a>
        </h2>
      </div>
    </section>
  );
};

export default RightSidebar;

import { IUser } from "@/interfaces/author";
import UserCardPage from "./UserCard";

const SearchUserPage = ({ data }: any) => {
  return (
    <div>
      <div className="mt-7 flex w-full flex-col gap-8">
        {data?.length > 0 ? (
          <>
            {data?.slice(0, 5)?.map((person: IUser) => (
              <UserCardPage person={person} />
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No users yet</p>
        )}
      </div>
    </div>
  );
};

export default SearchUserPage;

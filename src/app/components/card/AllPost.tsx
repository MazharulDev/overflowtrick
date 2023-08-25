import { IPost } from "@/interfaces/post";
import { useGetAllPostQuery } from "@/redux/post/postApi";
import Image from "next/image";
import Link from "next/link";
import PostActionPage from "./PostAction";
import TimeAgo from "../dateAdd/TimeAgo";

const AllPost = () => {
  const { data } = useGetAllPostQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  return (
    <div className="text-white">
      {data?.data.length > 0 ? (
        <>
          {data?.data?.map((postData: IPost) => (
            <div
              key={postData.id}
              className="mb-5 bg-slate-950 p-5 rounded-2xl"
            >
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1">
                  <Image
                    className="rounded-full"
                    src={postData?.author?.image}
                    width={30}
                    height={30}
                    alt="profile pic"
                  />
                </div>
                <div className="text-white col-span-11">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/profile/${postData?.author?.username}`}
                        className="text-small-medium cursor-pointer hover:underline"
                      >
                        {postData?.author?.name}
                      </Link>
                      <p className="text-slate-600">
                        @{postData?.author?.username}
                      </p>
                      <p>-</p>
                      <TimeAgo createdAt={postData?.createdAt} />
                    </div>
                  </div>
                  <p className="mt-3 cursor-pointer">{postData?.text}</p>
                  <PostActionPage data={postData} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
};

export default AllPost;

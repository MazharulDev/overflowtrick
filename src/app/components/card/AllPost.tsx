import { IPost } from "@/interfaces/post";
import { useGetAllPostQuery } from "@/redux/post/postApi";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";

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
              <div className="flex justify-start items-start gap-5">
                <Image
                  className="rounded-full"
                  src={postData?.image as string}
                  width={30}
                  height={30}
                  alt="profile pic"
                />
                <div className="text-white">
                  <div className="flex justify-start items-center gap-2">
                    <Link
                      href={`/profile/${postData?.username}`}
                      className="text-small-medium cursor-pointer hover:underline"
                    >
                      {postData?.name}
                    </Link>
                    <p className="text-slate-600">@{postData?.username}</p>
                  </div>
                  <p className="mt-3">{postData?.post}</p>
                  <div className="text-white flex justify-start items-center gap-8 mt-4 text-heading4-medium">
                    <BiLike />
                    <AiOutlineComment />
                    <RiShareForward2Fill />
                  </div>
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

import { IPost } from "@/interfaces/post";
import { useGetAllPostQuery } from "@/redux/post/postApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { RiShareForward2Fill, RiDeleteBin6Line } from "react-icons/ri";

const AllPost = () => {
  const { data: session } = useSession();
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
              <div className="grid grid-cols-12">
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
                    </div>
                    {/* {session?.user?.email === postData.author.email && (
                      <div className="text-heading4-medium text-red-600">
                        <RiDeleteBin6Line />
                      </div>
                    )} */}
                  </div>
                  <p className="mt-3">{postData?.text}</p>
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

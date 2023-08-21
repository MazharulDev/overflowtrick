import { IPost } from "@/interfaces/post";
import {
  useGetAllPostQuery,
  useToggleLikeMutation,
} from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";

const AllPost = () => {
  const { data: session } = useSession();
  const { data: user } = useGetSingleUserQuery(session?.user?.email);
  const { data } = useGetAllPostQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [toggleLike] = useToggleLikeMutation();
  const handleLike = (postId: string, userId: string) => {
    toggleLike({ postId, userId });
  };
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
                  </div>
                  <p className="mt-3 cursor-pointer">{postData?.text}</p>
                  <div className="text-white flex justify-start items-center gap-8 mt-4 text-heading4-medium">
                    <div className="flex justify-start items-center gap-1">
                      {postData?.like?.find(
                        (e: any) => e?.id === user?.data?.id
                      ) ? (
                        <div
                          className="cursor-pointer text-green-500 hover:text-white"
                          onClick={() =>
                            handleLike(postData?.id, user?.data?._id)
                          }
                        >
                          <BiSolidLike />
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer hover:text-green-500"
                          onClick={() =>
                            handleLike(postData?.id, user?.data?._id)
                          }
                        >
                          <BiLike />
                        </div>
                      )}
                      <div>
                        {postData?.like?.length ? (
                          <p className="text-small-regular">
                            ({postData?.like?.length})
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/post/${postData?.id}`}
                      className="cursor-pointer hover:text-green-500"
                    >
                      <AiOutlineComment />
                    </Link>
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

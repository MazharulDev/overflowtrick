"use client";
import CommentCardPage from "@/app/components/card/CommentCard";
import CreateCommentPage from "@/app/components/card/CreateComment";
import TimeAgo from "@/app/components/dateAdd/TimeAgo";
import LoadingSpinner from "@/app/components/loadingSpinner/Loading";
import {
  useGetPostByIdQuery,
  useToggleLikeMutation,
} from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";

const singlePostPage = ({
  params,
}: {
  params: {
    postId: ReactNode;
    slug: string;
  };
}) => {
  const { data: session } = useSession();
  const { data: user } = useGetSingleUserQuery(session?.user?.email);
  const { data: postData, refetch } = useGetPostByIdQuery(params?.postId);
  const [toggleLike] = useToggleLikeMutation();

  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    if (postData?.data?.like) {
      setLikes(postData.data.like.map((like: any) => like.id));
    }
  }, [postData]);

  const handleLike = (postId: string, userId: string) => {
    const alreadyLiked = likes.includes(userId);

    if (alreadyLiked) {
      setLikes((prev) => prev.filter((id) => id !== userId));
    } else {
      setLikes((prev) => [...prev, userId]);
    }

    toggleLike({ postId, userId }).then(() => {
      refetch(); 
    });
  };

  return (
    <div>
      <h1 className="text-heading3-bold text-white text-left mb-5">Post</h1>
      {postData?.data?.author?.email ? (
        <div className="mb-5 bg-slate-950 p-5 rounded-2xl">
          <div className="grid grid-cols-12">
            <div className="col-span-1">
              <Image
                className="rounded-full"
                src={postData?.data?.author?.image}
                width={30}
                height={30}
                alt="profile pic"
              />
            </div>
            <div className="text-white col-span-11">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <Link
                    href={`/profile/${postData?.data?.author?.username}`}
                    className="text-small-medium cursor-pointer hover:underline"
                  >
                    {postData?.data?.author?.name}
                  </Link>
                  <p className="text-slate-600">
                    @{postData?.data?.author?.username}
                  </p>
                  <p>-</p>
                  <TimeAgo createdAt={postData?.data?.createdAt} />
                </div>
              </div>

              <p className="mt-3 cursor-pointer">{postData?.data?.text}</p>

              <div className="text-white flex justify-start items-center gap-8 mt-4 text-heading4-medium">
                <div className="flex justify-start items-center gap-1">
                  {likes.includes(user?.data?._id) ? (
                    <div
                      className="cursor-pointer text-green-500 hover:text-white shadow-lg transform active:scale-75 transition-transform"
                      onClick={() =>
                        handleLike(postData?.data?.id, user?.data?._id)
                      }
                    >
                      <BiSolidLike />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:text-green-500 shadow-lg transform active:scale-75 transition-transform"
                      onClick={() =>
                        handleLike(postData?.data?.id, user?.data?._id)
                      }
                    >
                      <BiLike />
                    </div>
                  )}
                  <p className="text-small-regular">({likes.length})</p>
                </div>

                <div className="flex justify-start items-center gap-2">
                  {postData?.data?.comments?.length > 0 ? (
                    <div className="cursor-pointer text-green-500">
                      <AiOutlineComment />
                    </div>
                  ) : (
                    <div className="cursor-pointer hover:text-green-500">
                      <AiOutlineComment />
                    </div>
                  )}
                  {postData?.data?.comments?.length ? (
                    <p className="text-small-regular">{`(${postData?.data?.comments?.length})`}</p>
                  ) : null}
                </div>

                <RiShareForward2Fill />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}

      <CreateCommentPage postId={params?.postId} />

      <div className="mt-5">
        <CommentCardPage comments={postData?.data?.comments} />
      </div>
    </div>
  );
};

export default singlePostPage;

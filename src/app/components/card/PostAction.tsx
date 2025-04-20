"use client";
import { useToggleLikeMutation } from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";

const PostActionPage = ({ data }: any) => {
  const { data: session } = useSession();
  const { data: user } = useGetSingleUserQuery(session?.user?.email);
  const [toggleLike] = useToggleLikeMutation();

  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    if (data?.like) {
      setLikes(data.like.map((like: any) => like.id));
    }
  }, [data]);

  const handleLike = async (postId: string, userId: string) => {
    const alreadyLiked = likes.includes(userId);

    if (alreadyLiked) {
      setLikes((prev) => prev.filter((id) => id !== userId));
    } else {
      setLikes((prev) => [...prev, userId]);
    }

    await toggleLike({ postId, userId });
  };

  return (
    <div className="text-white flex justify-start items-center gap-8 mt-4 text-heading4-medium">
      <div className="flex justify-start items-center gap-1">
        {likes.includes(user?.data?._id) ? (
          <div
            className="cursor-pointer text-green-500 hover:text-white shadow-lg transform active:scale-75 transition-transform"
            onClick={() => handleLike(data?.id, user?.data?._id)}
          >
            <BiSolidLike />
          </div>
        ) : (
          <div
            className="cursor-pointer hover:text-green-500 shadow-lg transform active:scale-75 transition-transform"
            onClick={() => handleLike(data?.id, user?.data?._id)}
          >
            <BiLike />
          </div>
        )}
        <p className="text-small-regular">({likes.length})</p>
      </div>

      <div className="flex justify-start items-center gap-2">
        <Link
          href={`/post/${data?.id}`}
          className={`cursor-pointer ${
            data?.comments?.length > 0 ? "text-green-500" : "hover:text-green-500"
          }`}
        >
          <AiOutlineComment />
        </Link>
        {data?.comments?.length ? (
          <p className="text-small-regular">{`(${data?.comments?.length})`}</p>
        ) : null}
      </div>

      <div className="cursor-pointer">
        <RiShareForward2Fill />
      </div>
    </div>
  );
};

export default PostActionPage;

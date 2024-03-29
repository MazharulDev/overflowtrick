"use client";
import { useToggleLikeMutation } from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";

const PostActionPage = ({ data }: any) => {
  const { data: session } = useSession();
  const { data: user } = useGetSingleUserQuery(session?.user?.email);
  const [toggleLike] = useToggleLikeMutation();
  const handleLike = (postId: string, userId: string) => {
    toggleLike({ postId, userId });
  };
  return (
    <div className="text-white flex justify-start items-center gap-8 mt-4 text-heading4-medium">
      <div className="flex justify-start items-center gap-1">
        {data?.like?.find((e: any) => e?.id === user?.data?.id) ? (
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
        <div>
          {data?.like?.length ? (
            <p className="text-small-regular">({data?.like?.length})</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-start items-center gap-2">
        {data?.comments?.length > 0 ? (
          <Link
            href={`/post/${data?.id}`}
            className="cursor-pointer text-green-500"
          >
            <AiOutlineComment />
          </Link>
        ) : (
          <Link
            href={`/post/${data?.id}`}
            className="cursor-pointer hover:text-green-500"
          >
            <AiOutlineComment />
          </Link>
        )}
        {data?.comments?.length ? (
          <p className="text-small-regular">{`(${data?.comments?.length})`}</p>
        ) : (
          ""
        )}
      </div>
      <div className="cursor-pointer">
        <RiShareForward2Fill />
      </div>
    </div>
  );
};

export default PostActionPage;

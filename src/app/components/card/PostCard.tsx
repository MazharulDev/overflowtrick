import { IPost } from "@/interfaces/post";
import {
  useDeletePostByIdMutation,
  useGetPostsByIdQuery,
} from "@/redux/post/postApi";
import { useGetUserByUsernameQuery } from "@/redux/user/userApi";

import Image from "next/image";
import Link from "next/link";
import PostActionPage from "./PostAction";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import TimeAgo from "../dateAdd/TimeAgo";

interface IProps {
  id: string;
  username: string;
}

const PostCard = ({ id, username }: IProps) => {
  const { data: session } = useSession();
  const { data } = useGetPostsByIdQuery(id);
  const { data: postAuthor } = useGetUserByUsernameQuery(username);
  const [deletePostById, { isError }] = useDeletePostByIdMutation();
  const handleDeletePost = (id: string) => {
    deletePostById({ id });
    if (isError) {
      toast.error("Someting went wrong..");
    } else {
      toast.success("Post deleted successfully");
    }
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
                    src={postAuthor?.data?.image}
                    width={30}
                    height={30}
                    alt="profile pic"
                  />
                </div>
                <div className="text-white col-span-11">
                  <div className="flex justify-between items-start">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center gap-2">
                        <Link
                          href={`/profile/${postAuthor?.data?.username}`}
                          className="text-small-medium cursor-pointer hover:underline"
                        >
                          {postAuthor?.data?.name}
                        </Link>
                        <p className="text-slate-600">
                          @{postAuthor?.data?.username}
                        </p>

                        <p>-</p>
                        <TimeAgo createdAt={postData?.createdAt} />
                      </div>
                    </div>
                    {postAuthor?.data?.email === session?.user?.email && (
                      <div
                        onClick={() => handleDeletePost(postData.id)}
                        className="text-heading4-medium text-red-500 hover:text-red-600 cursor-pointer"
                      >
                        <AiOutlineDelete />
                      </div>
                    )}
                  </div>
                  <p className="mt-3">{postData?.text}</p>
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

export default PostCard;

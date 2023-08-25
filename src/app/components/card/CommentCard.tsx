import { ICommnets } from "@/interfaces/comment";
import { useDeleteCommentByIdMutation } from "@/redux/comment/commentApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import TimeAgo from "../dateAdd/TimeAgo";

interface IProps {
  comments: ICommnets[];
}

const CommentCardPage = ({ comments }: IProps) => {
  const { data: session } = useSession();
  const [deleteCommentById, { isSuccess }] = useDeleteCommentByIdMutation();

  const handleDeleteComment = (id: string) => {
    deleteCommentById({ id });
    if (isSuccess) {
      toast.success("Comment delete successfully");
    }
  };
  return (
    <div className="text-white">
      {comments?.map((comment) => (
        <div className="mt-5 bg-slate-950 p-3 rounded-lg" key={comment._id}>
          <div className="grid grid-cols-12">
            <div className="col-span-1">
              <Image
                className="rounded-full"
                src={comment?.author?.image}
                width={30}
                height={30}
                alt="profile pic"
              />
            </div>
            <div className="text-white col-span-11">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <p className="">{comment?.author?.name}</p>
                  <p className="text-slate-600">@{comment?.author?.username}</p>
                  <p>-</p>
                  <TimeAgo createdAt={comment?.createdAt} />
                </div>

                {comment?.author?.email === session?.user?.email && (
                  <div
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-heading4-medium text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <AiOutlineDelete />
                  </div>
                )}
              </div>
              <p className="mt-3">{comment?.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentCardPage;

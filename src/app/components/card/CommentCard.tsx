import { ICommnets } from "@/interfaces/comment";
import Image from "next/image";

interface IProps {
  comments: ICommnets[];
}

const CommentCardPage = ({ comments }: IProps) => {
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
              <div className="flex justify-start items-center gap-2">
                <p className="">{comment?.author?.name}</p>
                <p className="text-slate-600">@{comment?.author?.username}</p>
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

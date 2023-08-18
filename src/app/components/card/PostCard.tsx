import { IPost } from "@/interfaces/post";
import Image from "next/image";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";

interface IProps {
  data: IPost[];
}

const PostCard = ({ data }: IProps) => {
  return (
    <div className="text-white">
      {data?.map((postData: IPost) => (
        <div key={postData.id} className="mb-5 bg-slate-950 p-5 rounded-2xl">
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
                <h2 className="text-small-medium">{postData?.name}</h2>
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

          {/* <p className="border border-slate-800 mt-4"></p> */}
        </div>
      ))}
    </div>
  );
};

export default PostCard;

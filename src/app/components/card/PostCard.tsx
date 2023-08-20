import { IPost } from "@/interfaces/post";
import { useDeletePostByIdMutation } from "@/redux/post/postApi";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { RiShareForward2Fill, RiDeleteBin6Line } from "react-icons/ri";

interface IProps {
  data: {
    _id: string;
    name: string;
    image: string;
    username: string;
    likes: [];
    comments: number;
    posts: IPost[];
  };
}

const PostCard = ({ data }: IProps) => {
  const [deletePostById] = useDeletePostByIdMutation();
  const handleDelete = (id: string) => {
    deletePostById({ id });
    toast.success("Delete post successfully");
  };
  return (
    <div className="text-white">
      {data?.posts?.map((postData: IPost) => (
        <div key={postData.id} className="mb-5 bg-slate-950 p-5 rounded-2xl">
          <div className="grid grid-cols-12">
            <div className="col-span-1">
              <Image
                className="rounded-full"
                src={data?.image as string}
                width={30}
                height={30}
                alt="profile pic"
              />
            </div>
            <div className="text-white col-span-11">
              <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                  <h2 className="text-small-medium">{data?.name}</h2>
                  <p className="text-slate-600">@{data?.username}</p>
                </div>
                <div
                  onClick={() => handleDelete(postData.id)}
                  className="text-heading4-medium text-red-600 cursor-pointer hover:text-red-700"
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
              <p className="mt-3">{postData?.text}</p>
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

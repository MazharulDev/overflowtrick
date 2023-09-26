import { useCreatePostMutation } from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../loadingSpinner/Loading";

interface iPost {
  post: string;
  name: string;
  username: string;
  image: string;
}

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const { data: session } = useSession();
  const { data, isLoading, isFetching } = useGetSingleUserQuery(
    session?.user?.email
  );
  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }
  const [val, setVal] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [val]);

  const onChange = (e: any) => {
    setVal(e.target.value);
  };
  const postData = {
    data: {
      text: val,
      author: data?.data?._id,
    },
  };
  const handleSubmit = () => {
    createPost(postData);
    toast.success("Post is submitted");
    setVal("");
  };
  return (
    <div>
      <div className="flex justify-start items-start gap-4">
        {session?.user && (
          <Image
            className="rounded-full col-span-1"
            src={data?.data?.image as string}
            width={50}
            height={50}
            alt="profile pic"
          />
        )}
        {session?.user?.name && (
          <textarea
            ref={textAreaRef}
            value={val}
            onChange={onChange}
            rows={1}
            className="outline-none bg-dark-1 text-white col-span-4 w-full mt-5 resize-none"
            placeholder={`What's on your mind, ${data?.data?.name}?`}
          ></textarea>
        )}
      </div>
      <div className="mt-5 flex justify-end">
        {val.length > 2 ? (
          <button
            onClick={handleSubmit}
            className="text-white bg-blue px-3 py-2 rounded-lg"
          >
            Post
          </button>
        ) : (
          <button
            disabled
            className="text-white bg-sky-950 px-3 py-2 rounded-lg"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;

import { useCreateCommentMutation } from "@/redux/comment/commentApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

interface IParams {
  postId: ReactNode;
}

const CreateCommentPage = ({ postId }: IParams) => {
  const { data: session } = useSession();
  const { data } = useGetSingleUserQuery(session?.user?.email);
  const [createComment] = useCreateCommentMutation();
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
  const commentData = {
    text: val,
    author: data?.data?._id,
    postId: postId,
  };

  const handleSubmit = () => {
    createComment({ commentData });
    setVal("");
  };
  return (
    <div className="border-y py-3 border-slate-600">
      <div className="flex justify-start items-start gap-4 mt-3">
        {session?.user && (
          <Image
            className="rounded-full col-span-1"
            src={session?.user?.image as string}
            width={25}
            height={25}
            alt="profile pic"
          />
        )}
        <textarea
          ref={textAreaRef}
          value={val}
          onChange={onChange}
          rows={1}
          className="outline-none bg-dark-1 text-white col-span-4 w-full mt-1  resize-none text-small-regular"
          placeholder="Post your reply"
        ></textarea>
      </div>
      <div className="mt-2 flex justify-end">
        {val.length > 0 ? (
          <button
            onClick={handleSubmit}
            className="text-white bg-blue px-2 py-1 rounded-lg text-small-regular"
          >
            Reply
          </button>
        ) : (
          <button
            disabled
            className="text-white bg-sky-950 px-2 py-1 rounded-lg text-small-regular"
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCommentPage;

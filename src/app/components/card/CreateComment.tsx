"use client";
import { useCreateCommentMutation } from "@/redux/comment/commentApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface IParams {
  postId: ReactNode;
  onNewComment?: (comment: any) => void;
}

const CreateCommentPage = ({ postId, onNewComment }: IParams) => {
  const { data: session } = useSession();
  const { data: userData } = useGetSingleUserQuery(session?.user?.email);
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [val, setVal] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  useEffect(resizeTextArea, [val]);

  const onChange = (e: any) => {
    setVal(e.target.value);
  };

  const handleSubmit = async () => {
    if (!val || !userData?.data?._id) return;

    const commentData = {
      text: val,
      author: userData?.data?._id,
      postId: postId,
    };

    try {
      const res: any = await createComment({ commentData }).unwrap();

      if (onNewComment) {
        onNewComment(res.data);
      }

      toast.success("Reply added");
      setVal("");
    } catch (err) {
      toast.error("Something went wrong!");
    }
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
          className="outline-none bg-dark-1 text-white col-span-4 w-full mt-1 resize-none text-small-regular"
          placeholder="Post your reply"
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={val.length === 0 || isLoading}
          className={`text-white px-2 py-1 rounded-lg text-small-regular ${
            val.length > 0 ? "bg-blue" : "bg-sky-950"
          }`}
        >
          {isLoading ? "Posting..." : "Reply"}
        </button>
      </div>
    </div>
  );
};

export default CreateCommentPage;

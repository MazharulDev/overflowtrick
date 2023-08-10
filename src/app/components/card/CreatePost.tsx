import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CreatePost = () => {
  const { data: session } = useSession();
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
  return (
    <div>
      <div className="flex justify-start items-start gap-4">
        <Image
          className="rounded-full col-span-1"
          src={session?.user?.image as string}
          width={50}
          height={50}
          alt="profile pic"
        />
        <textarea
          ref={textAreaRef}
          value={val}
          onChange={onChange}
          rows={1}
          className="outline-none bg-dark-1 text-white col-span-4 w-full mt-5 resize-none"
          placeholder="What is happening?!"
        ></textarea>
      </div>
      <div className="mt-5 flex justify-end">
        <button className="text-white bg-blue px-3 py-2 rounded-lg">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

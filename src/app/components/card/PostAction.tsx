"use client";
import { useToggleLikeMutation } from "@/redux/post/postApi";
import { useGetSingleUserQuery } from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { RiShareForward2Fill } from "react-icons/ri";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { BsCheck2 } from "react-icons/bs";

const PostActionPage = ({ data }: any) => {
  const { data: session } = useSession();
  const { data: user } = useGetSingleUserQuery(session?.user?.email);
  const [toggleLike] = useToggleLikeMutation();
  const [likes, setLikes] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [copied, setCopied] = useState(false);



  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${data?.id}`;

  useEffect(() => {
    if (data?.like) {
      setLikes(data.like.map((like: any) => like.id));
    }
  }, [data]);

  const handleLike = async (postId: string, userId: string) => {
    const alreadyLiked = likes.includes(userId);

    if (alreadyLiked) {
      setLikes((prev) => prev.filter((id) => id !== userId));
    } else {
      setLikes((prev) => [...prev, userId]);
    }

    await toggleLike({ postId, userId });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  

  return (
    <>
      <div className="text-white flex justify-start items-center gap-8 mt-4 text-heading4-medium">
        {/* Like */}
        <div className="flex justify-start items-center gap-1">
          {likes.includes(user?.data?._id) ? (
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
          <p className="text-small-regular">{likes?.length>0 &&(likes.length)}</p>
        </div>

        {/* Comment */}
        <div className="flex justify-start items-center gap-2">
          <Link
            href={`/post/${data?.id}`}
            className={`cursor-pointer ${
              data?.comments?.length > 0 ? "text-green-500" : "hover:text-green-500"
            }`}
          >
            <AiOutlineComment />
          </Link>
          {data?.comments?.length ? (
            <p className="text-small-regular">{`${data?.comments?.length}`}</p>
          ) : null}
        </div>

        {/* Share */}
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          <RiShareForward2Fill />
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-[#1f2937] p-6 rounded-xl text-white w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-white"
            >
              ×
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center">Share this post</h3>

            <div className="flex gap-2 items-center mb-4">
              <input
                readOnly
                value={postUrl}
                className="flex-1 bg-dark-3 px-3 py-2 rounded-md text-sm text-white border border-gray-600 outline-none"
              />
              <button
                onClick={copyLink}
                className={`text-sm ${
                  copied ? "px-0" : "bg-blue-600 hover:bg-blue-700"
                } px-3 py-1 rounded-md transition-colors`}
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <BsCheck2 className="text-white" /> Copied!
                  </span>
                ) : (
                  "Copy"
                )}
              </button>

            </div>

            <div className="flex justify-center gap-6 mt-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-3xl"
              >
                <FaFacebook />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-500 text-3xl"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default PostActionPage;

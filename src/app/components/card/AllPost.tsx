import { IPost } from "@/interfaces/post";
import { useGetAllPostQuery } from "@/redux/post/postApi";
import Image from "next/image";
import Link from "next/link";
import PostActionPage from "./PostAction";
import TimeAgo from "../dateAdd/TimeAgo";
import { useState, useEffect, useRef } from "react";
import PostSkeleton from "../loader/PostSkeleton";

const AllPost = () => {
  const [page, setPage] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loadingRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetAllPostQuery(page, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllPosts(data.data);
      } else {
        setAllPosts(prevPosts => [...prevPosts, ...data.data]);
      }
      if (data.data.length < 20 || (data.meta && page * 20 >= data.meta.total)) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, page]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, isLoading]);

  return (
    <div className="text-white">
      {isLoading && page === 1 ? (
        <PostSkeleton />
      ) : allPosts.length > 0 ? (
        <>
          {allPosts.map((postData: IPost) => (
            <div key={postData.id} className="mb-5 bg-slate-950 p-5 rounded-2xl">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1">
                  <Image
                    className="rounded-full"
                    src={postData?.author?.image}
                    width={30}
                    height={30}
                    alt="profile pic"
                  />
                </div>
                <div className="text-white col-span-11">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                      <Link
                        href={`/profile/${postData?.author?.username}`}
                        className="text-small-medium cursor-pointer hover:underline"
                      >
                        {postData?.author?.name}
                      </Link>
                      <p className="text-slate-600">@{postData?.author?.username}</p>
                      <p>-</p>
                      <TimeAgo createdAt={postData?.createdAt} />
                    </div>
                  </div>
                  <p className="mt-3 cursor-pointer">{postData?.text}</p>
                  <PostActionPage data={postData} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No post found</p>
      )}
      

      <div ref={loadingRef} className="mt-5 mb-8 flex justify-center">
        {isLoading && page > 1 && (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-400">Loading more posts...</p>
          </div>
        )}
        {!hasMore && allPosts.length > 0 && (
          <p className="text-gray-400">No more posts to load</p>
        )}
      </div>
    </div>
  );
};

export default AllPost;
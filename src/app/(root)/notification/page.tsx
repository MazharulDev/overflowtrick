"use client";
import {
  useGetCommnetNotificationQuery,
  useGetSingleUserQuery,
} from "@/redux/user/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotificationPage = () => {
  const { data: session } = useSession();
  const { data: userByEmail } = useGetSingleUserQuery(session?.user?.email);
  const { data: notifications } = useGetCommnetNotificationQuery(
    userByEmail?.data?._id
  );
  return (
    <div>
      <h1 className="text-heading3-bold text-white text-left">Notification</h1>

      <section className="mt-10 flex flex-col gap-5">
        {notifications?.data?.length > 0 ? (
          <>
            {notifications?.data?.map((notification: any) => (
              <Link
                key={notification?._id}
                href={`/post/${notification?.postId}`}
              >
                <article className="activity-card">
                  <Image
                    src={notification?.author?.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {notification?.author?.name}
                    </span>{" "}
                    comment your post
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No notification yet</p>
        )}
      </section>
    </div>
  );
};

export default NotificationPage;

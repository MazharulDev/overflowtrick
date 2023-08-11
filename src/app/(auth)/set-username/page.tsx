import Image from "next/image";
import React from "react";

const SetUsernamePage = () => {
  return (
    <div className="bg-dark-1 h-screen flex justify-center items-center">
      <div className="bg-dark-4 w-[30rem] h-[30rem] rounded-3xl">
        <div className="px-8">
          <div className="py-8">
            <Image
              className="bg-dark-1"
              src="/assets/logo.svg"
              alt="logo"
              width={28}
              height={28}
            />
          </div>
          <div className="text-white">
            <h2 className="text-heading3-bold ">Set username</h2>
          </div>
          <div className="flex justify-start items-center gap-2 mt-10">
            <p className="text-white text-heading3-bold">@</p>
            <input
              className="px-2 py-3 rounded-md  w-full bg-dark-2 focus:outline-none text-white"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="mt-5 flex justify-end items-center">
            <button className="text-white bg-blue hover:bg-dark-3 duration-150 px-3 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUsernamePage;

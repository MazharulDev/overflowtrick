import Image from "next/image";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={20}
        height={20}
        className="object-contain"
      />
      <input
        id="text"
        placeholder="Search post"
        className="flex h-10 w-full rounded-md px-3 py-2 text-sm bg-dark-3 outline-none text-white"
      />
    </div>
  );
};

export default Searchbar;

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

interface IProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  length: number;
}

const Pagination = ({ page, setPage, length }: IProps) => {
  const router = useRouter();
  const totalPage = Math.ceil(length / 20);

  const handlePrev = () => {
    setPage(page - 1);
    router.push("/");
  };

  const handleNext = () => {
    setPage(page + 1);
    router.push("/");
  };

  return (
    <div>
      <div className="flex justify-between items-center px-1">
        {page <= 1 ? (
          <div className="flex justify-center items-center gap-3 text-slate-400 ">
            <BsArrowLeft />
            <button>Previous</button>
          </div>
        ) : (
          <div
            onClick={handlePrev}
            className="flex justify-center items-center gap-3 hover:text-slate-400 cursor-pointer"
          >
            <BsArrowLeft />
            <button>Previous</button>
          </div>
        )}
        {page >= totalPage ? (
          <div className="flex justify-center items-center gap-3 text-slate-400">
            <button>Next</button>
            <BsArrowRight />
          </div>
        ) : (
          <div
            onClick={handleNext}
            className="flex justify-center items-center gap-3 hover:text-slate-400 cursor-pointer"
          >
            <button>Next</button>
            <BsArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;

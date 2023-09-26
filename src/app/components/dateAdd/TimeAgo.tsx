import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";

interface IProps {
  createdAt: number;
}

const TimeAgo = ({ createdAt }: IProps) => {
  // Calculate the time difference in days
  const createdAtDate: any = new Date(createdAt);
  const currentDate: any = new Date();
  const daysPassed = Math.floor(
    (currentDate - createdAtDate) / (1000 * 60 * 60 * 24)
  );
  return (
    <div>
      <p className="text-subtle-medium text-slate-500">
        {daysPassed >= 3
          ? format(createdAtDate, "dd LLL yyyy")
          : formatDistanceToNow(createdAtDate, { addSuffix: true })}
      </p>
    </div>
  );
};

export default TimeAgo;

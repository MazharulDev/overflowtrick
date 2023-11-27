type IProps = {
  text: string;
  number: string;
};

const ShowingCard = ({ text, number }: IProps) => {
  return (
    <div className="bg-white w-56 rounded-md cursor-pointer">
      <div className="p-5">
        <p className="text-heading4-medium text-center">{text}</p>
        <h3 className="text-center text-heading1-bold">{number}</h3>
      </div>
    </div>
  );
};

export default ShowingCard;

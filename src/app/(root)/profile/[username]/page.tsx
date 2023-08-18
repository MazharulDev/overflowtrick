import { ReactNode } from "react";

interface IParams {
  username: string;
}
const DynamicUserProfile = ({
  params,
}: {
  params: {
    username: ReactNode;
    slug: string;
  };
}) => {
  console.log(params);
  return (
    <div>
      <h2 className="text-white">THis is profile {params?.username}</h2>
    </div>
  );
};

export default DynamicUserProfile;

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-2 md:py-2 md:px-4 lg:p-4 md:border-b-2 border-light-4">
      <Button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:bg-light-2"
      >
        <img
          src="/assets/icons/back.svg"
          alt="back"
          className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
        />
        <p className="ml-2 text-[16px] md:text-[18px] lg:text-[20px] font-normal">
          Back
        </p>
      </Button>
    </div>
  );
};

export default GoBack;

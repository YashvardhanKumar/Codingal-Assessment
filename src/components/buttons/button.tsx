import { FC } from "react";

type ButtonProps = {
  isSubmit?: boolean;
  handleClick: () => void;
  text: string;
};

const Button: FC<ButtonProps> = ({ handleClick, text, isSubmit = false }) => {
  return (
    <button
      onClick={handleClick}
      type={isSubmit ? "submit" : "button"}
      className="bg-[#f05641] text-white p-2 px-9 rounded-md cursor-pointer transition-opacity ease-in delay-200 opacity-100 hover:opacity-65"
    >
      {text}
    </button>
  );
};

export default Button;

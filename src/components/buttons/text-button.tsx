import { FC } from 'react'

type ButtonProps = {
    handleClick: () => void;
    text: string;
}

const TextButton: FC<ButtonProps> = ({handleClick, text}) => {
  return (
    <button
        onClick={handleClick}
        className="bg-transparent text-black sm:p-2 sm:px-9 p-2 px-7 rounded-md cursor-pointer transition ease-in delay-50 hover:bg-gray-100"
      >
        {text}
      </button>
  )
}

export default TextButton
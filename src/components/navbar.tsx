import { FC, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { LuMenu, LuX } from "react-icons/lu";
import { motion } from "framer-motion";
import Button from "./buttons/button";
import { Modal } from "./modal";
import { Link } from "react-router-dom";

interface NavItemsProps {
  handleClick: () => void;
  formattedTime: string;
}

const NavItems: FC<NavItemsProps> = ({ handleClick, formattedTime }) => {
  return (

      <div className="flex max-md:flex-col items-center justify-center w-full gap-3">
        <Link
          to={"/posts"}
          className="text-gray-600 text-lg underline underline-offset-2"
        >
          Posts
        </Link>
        <Link
          to={"/passengers"}
          className="text-gray-600 text-lg underline underline-offset-2"
        >
          Passengers
        </Link>


      <div className="flex items-center justify-center w-full gap-5 flex-wrap">
        <div className="max-md:hidden h-full w-[2px] bg-gray-300" />
        <div className="font-medium text-gray-600 text-lg">{formattedTime}</div>
        <Button handleClick={handleClick} text="End Class" />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [seconds, setSeconds] = useState(10 * 60);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const [others, setOthers] = useState<string | null>(null);
  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      if (isTimerStopped) {
        setIsModalOpen(false);
        setIsTimerStopped(false);
        clearInterval(timer);
        return;
      }
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleEndClass = () => {
    setIsTimerStopped(true);
    setIsModalOpen(false);
  };
  return (
    <>
      <Link to={"/"}>
      <div className="flex bg-white w-full h-16 top-0 justify-between fixed px-3 border-b-2 border-gray-300">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12">
            <img src={logo} className="rounded-md" />
          </div>
          <div className="max-md:hidden h-full w-[2px] bg-gray-300" />
          <div className="max-md:hidden font-semibold text-lg text-gray-600">
            Trial Lesson [Grade 1-3]
          </div>
          <div className="md:hidden font-semibold text-xl text-gray-600">
            Codingal
          </div>
        </div>
        <div className="flex items-center gap-5 px-3 max-md:hidden">
          <NavItems
            handleClick={() => setIsModalOpen(true)}
            formattedTime={formatTime(seconds)}
          />
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <LuX size={32} /> : <LuMenu size={32} />}
        </button>
      </div>
      </Link>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        exit={{
          height: !isMenuOpen ? "auto" : 0,
          opacity: !isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        className="md:hidden flex flex-wrap justify-center items-center bg-white p-4 shadow-lg mt-16 overflow-hidden"
      >
        <NavItems
          handleClick={() => setIsModalOpen(true)}
          formattedTime={formatTime(seconds)}
        />
      </motion.div>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        others={others}
        setOthers={setOthers}
        handleEndclass={handleEndClass}
      />
    </>
  );
};

export default Navbar;

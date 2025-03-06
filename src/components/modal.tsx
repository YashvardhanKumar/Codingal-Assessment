import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import Button from "./buttons/button";
import TextButton from "./buttons/text-button";
import { motion } from "framer-motion";
import { RadioButton } from "./buttons/radiobutton";
import { GrClose } from "react-icons/gr";
export interface Option {
  id: string;
  label: string;
  parent: string | null;
}
const options: Option[] = [
  { id: "completed", label: "Class completed", parent: null },
  { id: "interrupted", label: "Class interrupted/aborted", parent: null },
  {
    id: "student_no_show",
    label: "Student didn't show up for the class.",
    parent: "interrupted",
  },
  {
    id: "no_interest",
    label: "Student didn't show any interest.",
    parent: "interrupted",
  },
  {
    id: "student_disconnected",
    label: "Student got disconnected.",
    parent: "interrupted",
  },
  {
    id: "self_disconnected",
    label: "I got disconnected.",
    parent: "interrupted",
  },
  { id: "other", label: "Other reason", parent: "interrupted" },
];
const optionMapper: Record<string, string> = {
  completed: "Class completed",
  interrupted: "Class interrupted/aborted",
  student_no_show: "Student didn't show up for the class.",
  no_interest: "Student didn't show any interest.",
  student_disconnected: "Student got disconnected.",
  self_disconnected: "I got disconnected.",
  other: "Other reason",
};

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  others: string | null;
  setOthers: Dispatch<SetStateAction<string | null>>;
  handleEndclass: () => void;
};

export const Modal: FC<ModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  others,
  setOthers,
  handleEndclass,
}) => {
  const [path, setPath] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if(path.length || path.includes("others") && others && !others.length) setError(null);

  }, [path, others])
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!path.length) {
      setError("Please select a reason!");
      return;
    }
    if (path.includes("other") && (!others || !others.length)) {
      setError("Please write a reason!");
      return;
    }
    handleEndclass();
    let markedOption = optionMapper[path[path.length - 1]];
    console.log({ others, option: markedOption });
  };
  return (
    <form onSubmit={handleSubmit}>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg w-fit flex flex-col m-6"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-3 top-0 right-0 bg-red self-end"
            >
              <GrClose size={18} />
            </button>
            <h2 className="text-xl font-bold mb-2">
              Select a reason to end the class
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col p-4"
            >
              <RadioButton
                options={options}
                depth={0}
                path={path}
                setPath={setPath}
              />
              {
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: path.includes("other") == true ? "auto" : 0,
                    opacity: path.includes("other") == true ? 1 : 0,
                  }}
                  exit={{
                    height: !path.includes("other") == true ? "auto" : 0,
                    opacity: !path.includes("other") == true ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col p-2"
                >
                  <textarea
                    rows={4}
                    className=" resize-none outline-none border rounded-md p-3"
                    placeholder="Type Here"
                    value={others ?? ""}
                    onChange={(e) => setOthers(e.target.value)}
                  />
                </motion.div>
              }
            </motion.div>

            <div className="flex gap-3">
              <Button handleClick={() => {}} text="End Class" isSubmit />
              <TextButton
                handleClick={() => setIsModalOpen(false)}
                text="Cancel"
              />
            </div>
            {error != null && <div className="text-red-400 mt-2">{error}</div>}
          </motion.div>
        </div>
      )}
    </form>
  );
};

import { LuCheck } from "react-icons/lu";
import { Option } from "../modal";
import { Dispatch, FC, SetStateAction } from "react";
import { motion } from "framer-motion";

interface RadioButtonProps {
  options: Option[];
  parent?: string | null;
  depth: number;
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
}

export const RadioButton: FC<RadioButtonProps> = ({
  options,
  path,
  setPath,
  parent = null,
  depth = 0,
}) => {
  const handleChange = (id: string) => {
    let pth = path;
    if (pth.length > depth) {
      pth[depth] = id;
      pth = pth.slice(0, depth + 1);
    } else if (pth.length == depth) {
      pth.push(id);
    }
    setPath(() => [...pth]);
  };

  const checkChecked = (id: string) => {
    if (path.length <= depth) return false;
    return path[depth] === id;
  };
  return (
    <>
      {options
        .filter((option) => option.parent === parent)
        .map((option) => (
          <div key={option.id} className={option.parent ? "ml-6" : ""}>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={option.id}
                checked={checkChecked(option.id)}
                onChange={(e) => handleChange(e.target.value)}
                className="hidden"
                
              />
              <div
                className={`w-5 h-5 flex shrink-0 items-center justify-center border-2 rounded-full transition-all ${
                  checkChecked(option.id)
                    ? "bg-red-500 border-red-500"
                    : "border-gray-400"
                }`}
              >
                {checkChecked(option.id) && (
                  <LuCheck className="text-white w-4 h-4" />
                )}
              </div>
              <span className="text-gray-700">{option.label}</span>
            </label>
            <motion.div
              className="flex flex-col p-1 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: checkChecked(option.id) ? "auto" : 0,
                opacity: checkChecked(option.id) ? 1 : 0,
              }}
              exit={{
                height: !checkChecked(option.id) ? "auto" : 0,
                opacity: !checkChecked(option.id) ? 1 : 0,
              }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <RadioButton
                options={options}
                parent={option.id}
                depth={depth + 1}
                path={path}
                setPath={setPath}
              />
            </motion.div>
          </div>
        ))}
    </>
  );
};

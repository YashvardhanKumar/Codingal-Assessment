import { useNavigate } from "react-router";
import Button from "./components/buttons/button";
import { BiInfoCircle } from "react-icons/bi";

const First = () => {
  const nav = useNavigate();
  return (
    <div className="flex p-5 max-sm:text-xs w-full h-screen flex-col justify-center items-center text-xl gap-3">
      <div>
        Submitted by: <code>Yashvardhan Kumar</code>
      </div>
      <div className="text-lg">
        Final year student at <b>IIIT Gwalior</b>
      </div>
      <div className="flex gap-3">
        <Button
          text="See Posts"
          handleClick={() => {
            nav("/posts");
          }}
        />
        <Button
          text="See Passengers"
          handleClick={() => {
            nav("/passengers");
          }}
        />
      </div>
      <div className="text-lg flex items-center gap-3">
        <BiInfoCircle />
        <div className="max-sm:text-sm">
          I used JSON placeholder API:{" "}
          <code className="text-[#f05641]">
            <a href="https://jsonplaceholder.typicode.com/users">GET /users</a>
          </code>{" "}
          for passengers as the other link was down
        </div>
      </div>
    </div>
  );
};

export default First;

import { GrCircleAlert } from "react-icons/gr";

const alertContainer =
  "flex flex-col gap-2 items-center sm:w-[80%] w-[100%] p-3 text-center bg-alertContainer m-2 rounded-md shadow-xl sm:text-base text-sm";

export default function ErrorMessage({ errorMessage }) {
  return (
    <div className={alertContainer}>
      <GrCircleAlert className="text-alertFont sm:text-2xl text-xl" />
      <p className="text-alertFont">{errorMessage}</p>
    </div>
  );
}

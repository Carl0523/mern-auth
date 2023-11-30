import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import CustomButton from "../components/CustomButton";

export default function LandingPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center mx-auto mt-48 text-center text-white">
      <h1 className="text-5xl leading-[4rem] font-bold">
        Locate and navigate{" "}
        <span className="sm:block">your classrooms easily</span>
      </h1>
      <p className="font-extralight">The best app for your college life</p>
      <div className="flex gap-3 mt-3">
        <Link to="/login" className="hover:scale-105">
          <CustomButton
            text="Login"
            width={36}
            border={true}
            icon={<MdLogin className="text-2xl" />}
          />
        </Link>

        <Link to="register" className="hover:scale-105">
          <CustomButton
            text="Sign Up"
            width={36}
            textColor="black"
            bgColor="white"
            icon={<BsFillPersonPlusFill className="text-2xl" />}
          />
        </Link>
      </div>
    </div>
  );
}

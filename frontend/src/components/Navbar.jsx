import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { logo } from "../assets";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import CustomButton from "./CustomButton";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth) ?? {};

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try
    {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/")
    } catch(error)
    {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-between fixed z-10 items-center px-6 py-3 top-0  text-white">
      <Link to={userInfo ? "/home" : "/"}>
        {/* 1. The logo svg and name */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
          <div className="sm:flex border-l-2 border-white h-8 hidden" />
          <p className="sm:flex text-[18px] font-bold hidden">MERN AUTH</p>
        </div>
      </Link>

      {/* 2. The navigation items */}
      <ul className="list-none flex items-center gap-4">
        {/* If user already login, display logout button. Otherwise: Login and register buttons */}
        {userInfo ? (
          <>
            <li className="hover:scale-105">
              <Link to="/profile">
                <CustomButton
                  text="Profile"
                  textColor="black"
                  bgColor="white"
                  icon={<IoPersonCircleSharp className="text-2xl" />}
                />
              </Link>
            </li>
            <li className="hover:scale-105">
              <CustomButton
                text="Logout"
                border={true}
                onClickHandler={logoutHandler}
                icon={<MdLogout className="text-2xl" />}
              />
            </li>
          </>
        ) : (
          // Login and sign up buttons
          <>
            <li className="hover:scale-105">
              <Link to="/login">
                <CustomButton
                  text="Login"
                  border={true}
                  icon={<MdLogin className="text-2xl" />}
                />
              </Link>
            </li>
            <li className="hover:scale-105">
              <Link to="/register">
                <CustomButton
                  text="Sign Up"
                  textColor="black"
                  bgColor="white"
                  icon={<BsFillPersonPlusFill className="text-2xl" />}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

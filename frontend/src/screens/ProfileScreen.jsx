import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileImage } from "../assets";
import { setCredentials } from "../slices/authSlice";
import { logout } from "../slices/authSlice";
import { useUpdateMutation } from "../slices/usersApiSlice";
import ErrorMessage from "../components/ErrorMessage";

const inputContainer = "flex flex-col sm:w-[80%] w-[100%] gap-1";
const labelStyle = "md:text-lg sm:text-base text-sm";
const inputStyle =
  "w-full px-4 py-2 rounded-md bg-input placeholder:text-placeholder md:text-lg sm:text-base text-sm";
const submitButton =
  "sm:w-[80%] w-[100%] bg-secondaryButton text-white mt-4 p-3 rounded-md shadow-button hover:bg-secondaryButtonHover active:shadow-none duration-75 col-span-2";
const alertContainer =
  "flex flex-col gap-2 items-center sm:w-[80%] w-[100%] p-3 text-center bg-alertContainer m-2 rounded-md shadow-xl sm:text-base text-sm";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth) ?? {};

  const [updateProfile, { isLoading }] = useUpdateMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setDisplayError(true);
      return;
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      setDisplayError(false);
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col w-4/5 mx-auto mt-32 mb-5 items-center text-font">
      {/* 1. The avatar, name, and email */}
      <div className="flex gap-3 justify-center items-center mb-3">
        {/* 1a. The avatar */}
        <div className="w-[100px] h-[100px] bg-white rounded-full overflow-hidden">
          <img src={profileImage} alt="profile image" />
        </div>

        {/* 1b. The name and email */}
        <div className="flex flex-col gap-1 cursor-default">
          <h1 className="font-bold text-xl">{userInfo.name}</h1>
          <p className="text-sm">{userInfo.email}</p>
        </div>
      </div>

      {displayError && (
        <ErrorMessage errorMessage="Password does not matched!" />
      )}
      {/* The form section */}
      <form
        onSubmit={submitHandler}
        className="grid grid-rows-3 grid-cols-2 w-full place-items-center gap-x-3 gap-y-10 m-10"
      >
        {/* a. First input container: NAME */}
        <div className={inputContainer}>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Please enter your name"
            className={inputStyle}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* b. Second input container: EMAIL */}
        <div className={inputContainer}>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Please enter your email"
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* c. Third input container: PASSWORD */}
        <div className={inputContainer}>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* d. Fourth input container: CONFIRM PASSWORD */}
        <div className={inputContainer}>
          <label htmlFor="confirmPassword" className={labelStyle}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            className={inputStyle}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* e. Submit button */}
        <button className={submitButton}>Update</button>
      </form>
    </div>
  );
}

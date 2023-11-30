import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormCard from "../components/FormCard";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { GrCircleAlert } from "react-icons/gr";
import ErrorMessage from "../components/ErrorMessage";

const inputContainer = "flex flex-col sm:w-[80%] w-[100%] gap-1";
const labelStyle = "md:text-lg sm:text-base text-sm";
const inputStyle =
  "w-full px-4 py-2 rounded-md bg-input placeholder:text-placeholder md:text-lg sm:text-base text-sm";
const submitButton =
  "sm:w-[80%] w-[100%] bg-white mt-4 p-3 text-black rounded-md shadow-button hover:bg-whiteButtonHover active:shadow-none duration-75 md:text-lg sm:text-base text-sm";
const registerButton =
  "sm:w-[80%] w-[100%] bg-secondaryButton text-white p-3 rounded-md hover:scale-105 md:text-lg sm:text-base text-sm";
const alertContainer =
  "flex flex-col gap-2 items-center sm:w-[80%] w-[100%] p-3 text-center bg-alertContainer m-2 rounded-md shadow-xl sm:text-base text-sm";



export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);


  const navigate = useNavigate(); //Assign a navigate function to variable navigate;
  //Assign a dispatch function to variable dispatch which allow us to dispatch new actions to the store
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth) ?? {};

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      setShowError(false);
      navigate("/home");
    } catch (err) {
      setShowError(true);
      console.log(err?.data?.message || err.error);
    }
  };
  return (
    <FormCard>
      {/* 1. Header text */}
      <h1 className="text-font text-center md:text-4xl sm:text-3xl text-2xl mb-5">
        Welcome back.{" "}
        <span className="sm:block inline-block">Please login in</span>
      </h1>

      {/* Optional: alert message */}
      {showError && (
        <ErrorMessage errorMessage="We weren't able to log you in. The email or password you entered was
        incorrect."/>
      )}

      {/* 2. Login Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center gap-4 text-font w-full"
      >
        {/* a. First input container */}
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

        {/* b. Second input container */}
        <div className={inputContainer}>
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter Password"
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* c. Submit button */}
        <button className={submitButton}>{isLoading ? "Loading..." : "Submit"}</button>
      </form>

      {/* 3. Register section */}
      <div className="w-full flex flex-col items-center gap-1 text-font mt-6">
        <h1 className="md:text-lg sm:text-base text-sm">
          Don't have an account?
        </h1>
        <Link to="/register" className="w-full text-center">
          <button className={registerButton}>REGISTER AS A NEW USER</button>
        </Link>
      </div>
    </FormCard>
  );
}

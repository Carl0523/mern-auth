import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import FormCard from "../components/FormCard";
import { setCredentials } from "../slices/authSlice";
import ErrorMessage from "../components/ErrorMessage";

const inputContainer = "flex flex-col sm:w-[80%] w-[100%] gap-1";
const labelStyle = "md:text-lg sm:text-base text-sm";
const inputStyle =
  "w-full px-4 py-2 rounded-md bg-input placeholder:text-placeholder md:text-lg sm:text-base text-sm";
const submitButton =
  "sm:w-[80%] w-[100%] bg-secondaryButton text-white mt-4 p-3 rounded-md shadow-button hover:bg-secondaryButtonHover active:shadow-none duration-75";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault(); //Prevent the default behavior of browser: Loading

    // Check the consistence of the password
    if (password !== confirmPassword) {
      setErrorMessage("Entered password does not matched"); //Show error message if password does not matched
      return;
    }
    try {
      //Sending request to the backend
      const res = await register({ name, email, password }).unwrap();
      //Store the user info to local storage
      dispatch(setCredentials(res));
      setShowError(false);
      navigate("/home"); //Navigate to the home page
    } catch (err) {
      setErrorMessage("Make sure you have fill out everything!");
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <FormCard>
      {/* 1. Header text */}
      <h1 className="text-font text-center md:text-4xl sm:text-3xl text-2xl my-7">
        Create Your Account
      </h1>

      {/* Optional: alert message */}
      {errorMessage.length !== 0 && (
        <ErrorMessage errorMessage={errorMessage} />
      )}

      {/* 2. Login Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full justify-center items-center gap-3 text-font"
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
        <button className={submitButton}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>

      {/* 3. Login section: User already have account */}
      <div className="w-full flex flex-col items-center gap-1 text-font mt-4 sm:text-lg text-sm">
        <h1>
          Already have an account?{" "}
          <Link to="/login" className="text-center text-orange-500">
            Login in
          </Link>
        </h1>
      </div>
    </FormCard>
  );
}

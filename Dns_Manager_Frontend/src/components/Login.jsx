import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import Input from "./Input";
import Button from "./Button";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      // Here you would handle authentication using your preferred method/service
      // For demonstration purposes, let's assume authentication is successful
      const userData = {
        /* Replace this with actual user data */
      };
      dispatch(authLogin(userData));
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again."); // Replace this with appropriate error handling
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-10">
      <div className="mx-auto w-full max-w-lg  p-10 ">
        <h2 className="text-start text-2xl font-bold leading-tight">
          Sign in 
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className="mt-8">
          <div className="space-y-5">
            <Input
              placeholder="Enter your email"
              type="email"
              ref={emailRef}
              className="bg-gray-100 shadow-md rounded-lg"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              className="bg-gray-100 shadow-md rounded-lg"
            />
            <Button
              type="button"
              className="w-full bg-blue-500 shadow-md rounded-lg"
              onClick={handleLogin}
            >
              Sign in
            </Button>
          </div>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apost have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "./Input"; // Import custom Input component
import Button from "./Button"; // Import custom Button component

function Signup() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Simulate account creation process (replace with actual API call)
      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }
      // Simulate successful account creation
      alert("Account created successfully!");

      // Clear form fields after successful submission
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="mx-auto w-full max-w-lg p-10">
        <h2 className="text-start text-2xl mb-4 font-bold leading-tight">Register</h2>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="text"
              id="name"
              ref={nameRef}
              placeholder="Enter your full name"
              required
              className=" bg-gray-100 shadow-md rounded-lg"
            />
            <Input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
              className="bg-gray-100 shadow-md rounded-lg"
            />
            <Input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter your password"
              required
              className="bg-gray-100 shadow-md rounded-lg"
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 shadow-md rounded-lg"
            >
              Create Account
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
          
        </p>
      </div>
    </div>
  );
}

export default Signup;

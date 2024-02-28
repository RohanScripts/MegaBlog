import React from "react";
import { useForm } from "react-hook-form";
import authservice from "../appwrite/Auth";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as sliceLogin } from "../store/authSlice";

function SignUpForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const session = await authservice.createAccount(data);
      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) {
          dispatch(sliceLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              type="text"
              placeholder="enter your full name here..."
              {...register("name", {
                required: true,
              })}
            ></Input>
            <Input
              label="Email: "
              placeholder="enter your email here..."
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "enter valid email address...",
                },
              })}
            ></Input>
            <Input
              label="Password: "
              type="password"
              placeholder="enter your password here..."
              {...register("password", {
                required: true,
              })}
            ></Input>
            <Button>Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;

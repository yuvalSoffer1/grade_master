import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginPayload } from "../../models/AuthPayloads";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import StyledButton from "../../components/ui/StyledButton";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Entered value does not match email format",
      },
    },
    password: {
      required: "Password is required",
    },
  };

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success("Logined Successfully");
    } catch (error) {
      toast.error("Incorrect Email or Password!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center  lg:h-89dvh xl:min-h-92dvh">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300  shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="user@email.com"
              {...register("email", validationRules.email)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="your password"
              {...register("password", validationRules.password)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <StyledButton buttonType="submit" text="Login" width="100%" />
        </form>
        <p className="text-center pt-2">
          Not registered yet?
          <Link to="/register" className=" ml-1 text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

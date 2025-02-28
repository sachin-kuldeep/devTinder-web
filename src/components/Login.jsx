import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <div className="relative w-full max-w-xs my-6">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative w-full max-w-xs my-6">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=" "
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                  >
                    Last Name
                  </label>
                </div>
              </>
            )}
            <div className="relative w-full max-w-xs my-6">
              <input
                type="text"
                id="email"
                value={emailId}
                className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
              >
                Email ID
              </label>
            </div>

            <div className="relative w-full max-w-xs my-6">
              <input
                type="text"
                id="password"
                value={password}
                className="block px-2.5 pb-2.5 pt-4 w-full  bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
              >
                Password
              </label>
            </div>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
          <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2 hover:text-indigo-500"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Already a User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

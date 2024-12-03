import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { authActions } from '../store/auth';

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // For error message
  const [showAlert, setShowAlert] = useState(false); // To control visibility of the alert box

  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        setError("All fields are required!");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000); // Close the alert box after 4 seconds
      } else {
        const response = await axios.post(
          "https://mern-task-manager-dvwg.onrender.com/api/v1/login",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      setError(error.response.data.message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000); // Close the alert box after 4 seconds
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-gray-900">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-white mb-8">YOUR TASK MANAGER</h1>

      {/* Error alert box */}
      {showAlert && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-red-600 text-white text-center font-semibold z-50 shadow-lg rounded-lg opacity-90 transition-all duration-500 ease-in-out"
          style={{
            top: showAlert ? "10px" : "-50px", // Slide in from top
            opacity: showAlert ? "1" : "0", // Fade in
          }}
        >
          {error}
        </div>
      )}

      <div className="p-8 w-96 rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 shadow-xl">
        <div className="text-3xl font-semibold text-white text-center mb-6">Sign In</div>

        {/* Input Fields with Styling */}
        <input
          autoComplete="off"
          type="text"
          placeholder="Username"
          name="username"
          className="bg-black px-6 py-3 my-3 w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300 ease-in-out text-lg"
          onChange={change}
          value={Data.username}
        />
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          name="password"
          className="bg-black px-6 py-3 my-3 w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300 ease-in-out text-lg"
          onChange={change}
          value={Data.password}
        />

        <div className="w-full flex items-center justify-between mt-6">
          <button
            className="bg-black text-lg font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-300 w-full"
            onClick={submit}
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/signup" className="text-teal-300 hover:text-teal-200 text-sm">
            Not having an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

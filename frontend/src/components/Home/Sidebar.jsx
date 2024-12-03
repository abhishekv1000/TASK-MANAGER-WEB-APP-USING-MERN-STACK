import React, { useEffect, useState } from "react";   
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes size={20} />, // smaller icon size
      link: "/",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant size={20} />, // smaller icon size
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble size={20} />, // smaller icon size
      link: "/completedTasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <TbNotebookOff size={20} />, // smaller icon size
      link: "/incompletedTasks",
    },
  ];

  const [Data, setData] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // For mobile toggle

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://mern-task-manager-dvwg.onrender.com/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div
        className={`p-4 w-80 bg-white rounded-lg shadow-lg flex flex-col justify-between fixed top-0 left-0 h-full lg:w-80 lg:flex-col lg:static lg:h-auto transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* User Info Section */}
        {Data && (
          <div className="p-3 mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg text-center text-xs">
            <h2 className="text-lg font-semibold text-white">{Data.username}</h2>
            <h4 className="text-xs text-gray-200">{Data.email}</h4>
            <hr className="my-2 border-gray-500" />
          </div>
        )}

        {/* Sidebar Links */}
        <div className="flex-grow">
          {data.map((items, i) => (
            <Link
              to={items.link}
              key={i}
              className="my-3 flex items-center p-3 text-sm rounded bg-gradient-to-r from-gray-800 to-gray-600 text-white hover:bg-gradient-to-l hover:from-gray-700 hover:to-gray-500 transition-all duration-300"
            >
              {items.icon} &nbsp; {items.title}
            </Link>
          ))}
        </div>

        {/* Log Out Button */}
        <div className="mt-4">
          <button
            className="bg-gradient-to-r from-red-600 to-red-800 w-full p-3 rounded text-white hover:from-red-700 hover:to-red-900 transition duration-300 text-sm"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close" : "Open"} Sidebar
      </button>
    </div>
  );
};

export default Sidebar;

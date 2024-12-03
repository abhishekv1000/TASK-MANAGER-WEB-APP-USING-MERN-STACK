import React from "react";
import Sidebar from "../components/Home/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen gap-4 bg-[#121212] p-6"> {/* Dark Background */}
      {/* Sidebar Section */}
      <div className="w-1/5 p-4 rounded-lg shadow-lg flex flex-col justify-between text-white">
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-600 text-white"> {/* Dark content area */}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

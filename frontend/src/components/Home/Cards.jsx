import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://mern-task-manager-dvwg.onrender.com/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `https://mern-task-manager-dvwg.onrender.com/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://mern-task-manager-dvwg.onrender.com/api/v2/delete-task/${id}`, {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold text-white truncate">{items.title}</h3>
              <p className="text-gray-300 my-2 text-sm">{items.desc}</p>
            </div>
            <div className="mt-4 flex flex-wrap justify-between items-center">
              <button
                className={`${
                  items.complete === false
                    ? "bg-gradient-to-r from-red-500 to-red-700"
                    : "bg-gradient-to-r from-green-500 to-green-700"
                } px-4 py-2 rounded text-white text-sm transition duration-300 hover:bg-opacity-80 w-full sm:w-auto`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "Incomplete"}
              </button>
              <div className="text-white p-2 text-xl flex justify-around mt-2 sm:mt-0 w-full sm:w-auto">
                <button onClick={() => handleImportantTask(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home !== "false" && (
                  <button
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-6 shadow-md hover:scale-105 transition duration-300 w-full sm:w-auto"
        >
          <IoIosAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-2">Add tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;

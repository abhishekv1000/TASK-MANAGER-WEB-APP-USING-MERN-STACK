import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

function AllTasks() {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

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
    <>
      <div className="min-h-screen min-w-[50vh] bg-gray-100 relative">

        {/* Add Task Button */}
        <div className="w-full flex justify-end px-4 py-2 lg:hidden">
          <button
            onClick={() => setInputDiv("fixed")}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition duration-300"
          >
            <IoIosAddCircle className="text-4xl" />
          </button>
        </div>

        {/* Cards Display */}
        {Data && (
          <div className="p-4">
            <Cards
              home={"true"}
              setInputDiv={setInputDiv}
              data={Data.tasks}
              setUpdatedData={setUpdatedData}
            />
          </div>
        )}
      </div>

      {/* Input Data Form (Modal) */}
      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
}

export default AllTasks;

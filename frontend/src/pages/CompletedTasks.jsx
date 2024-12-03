import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const CompletedTasks = () => {
  const [Data, setData] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://mern-task-manager-dvwg.onrender.com/api/v2/get-complete-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  }, []); // Added dependency array to prevent continuous fetching

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Completed Tasks</h1>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default CompletedTasks;

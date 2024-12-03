import React, { useEffect, useState } from 'react';
import Cards from '../components/Home/Cards';
import axios from "axios";

function IncompletedTasks() {
  const [Data, setData] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://mern-task-manager-dvwg.onrender.com/api/v2/get-incomplete-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  }, []); // Added dependency array to prevent continuous fetching

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Incomplete Tasks</h1>
      <Cards home={"false"} data={Data} />
    </div>
  );
}

export default IncompletedTasks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Animals = () => {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setAnimals(response.data); // assuming response.data is the array of animals
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${id}`)
      .then((response) => {
        setAnimals((prevAnimal) =>
          prevAnimal.filter((animal) => animal._id !== id)
        );
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=' flex flex-col justify-center items-center bg-gray-100'>
      <h1 className='text-4xl font-bold mb-4'>Animals Directory</h1>
      <div className='flex justify-end mb-4'>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
          <Link to='/add'>Add Animal</Link>
        </button>
      </div>
      <div className='overflow-x-auto w-full'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>S.No</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Species</th>
              <th className='px-4 py-2'>Option</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
              <tr key={animal._id} className='bg-white shadow-md p-3 mb-2'>
                <td className='px-4 py-2'>{index + 1}</td>
                <td className='px-4 py-2'>{animal.name}</td>
                <td className='px-4 py-2'>{animal.species}</td>
                <td className='px-4 py-2'>
                  <div className='flex gap-2 justify-center items-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
                      <Link to={`/edit/` + animal._id}>Update</Link>
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                      onClick={() => handleDelete(animal._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Animals;

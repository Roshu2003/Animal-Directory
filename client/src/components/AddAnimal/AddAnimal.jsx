import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AddAnimal() {
  const [newAnimal, setNewAnimal] = useState({ name: "", species: "" });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`http://localhost:8000/api/create`, newAnimal)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => console.log(error));

    setNewAnimal({ name: "", species: "" });
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewAnimal({ ...newAnimal, [name]: value });
    console.log(newAnimal);
  };
  return (
    <div className='flex justify-center items-center h-[30rem] mt-4'>
      <div className='w-full max-w-md p-4 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Add Animal</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              name='name'
              value={newAnimal.name}
              onChange={inputHandler}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='species'
            >
              Species:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='species'
              type='text'
              name='species'
              value={newAnimal.species}
              onChange={inputHandler}
            />
          </div>
          <button
            className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Add Animal
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAnimal;

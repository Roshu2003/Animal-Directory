import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function UpdateAnimal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState({ name: "", species: "" });
  const navigate = useNavigate();

  // Fetch the animal data based on the ID
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setAnimal(response.data);
      })
      .catch((error) => {
        console.error("Error fetching animal: ", error);
        toast.error("Error fetching animal data", { position: "top-center" });
      });
  }, [id]);

  // Handle form input changes
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setAnimal({ ...animal, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/update/${id}`, animal)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-center" });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating animal: ", error);
        toast.error("Error updating animal", { position: "top-center" });
      });
  };

  return (
    <div className='flex justify-center items-center h-[30rem] mt-4'>
      <div className='w-full max-w-md p-4 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold mb-4'>Update Animal</h2>
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
              value={animal.name}
              onChange={inputChangeHandler}
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
              value={animal.species}
              onChange={inputChangeHandler}
            />
          </div>
          <button
            className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Update Animal
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAnimal;

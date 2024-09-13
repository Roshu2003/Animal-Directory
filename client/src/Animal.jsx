// Import React
import React from "react";
import Button from "react-bootstrap/Button";
// Define the Animal component
const Animal = ({ animal, onUpdate, onDelete }) => {
  return (
    <div className='bg-orange-400  items-center h-[3rem] flex justify-between p-3'>
      <h2>{animal.name}</h2>
      <p className='ml-[110px]'>{animal.species}</p>
      <div className='flex gap-2'>
        <Button
          variant='primary'
          onClick={() => {
            console.log("update");
            onUpdate(animal.id);
          }}
        >
          Update
        </Button>
        <Button
          variant='danger'
          onClick={() => {
            console.log("delet");
            onDelete(animal.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Animal;

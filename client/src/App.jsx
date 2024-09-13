import React from "react";
import "./App.css";
import Animals from "./Animals";
import AddAnimal from "./components/addAnimal/AddAnimal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateAnimal from "./components/UpdateAnimal/UpdateAnimal";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      // element: "home page",
      element: <Animals />,
    },
    {
      path: "/add",
      element: <AddAnimal />,
    },
    {
      path: "/edit/:id",
      element: <UpdateAnimal />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;

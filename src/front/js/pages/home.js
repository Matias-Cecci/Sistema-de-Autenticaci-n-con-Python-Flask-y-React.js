import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Home = () => {
  const navigate = useNavigate();

  const { store, actions } = useContext(Context);
  const [pet, setPet] = useState({
    name: "",
    age: "",
    breed: "",
    sterilized: false,
  });
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getCurrentUserPets();
  }, []);

  const createPet = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(pet),
    });
    if (response.ok) getCurrentUserPets();
  };

  const getCurrentUserPets = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/pets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setPets(data.results);
  };

  return (
    <div className="container mt-4">
      {store.currentUserEmail ? (
        <>{navigate("/myHome")}</>
      ) : (
        "Please Register or Login"
      )}
    </div>
  );
};

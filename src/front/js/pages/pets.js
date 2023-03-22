import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Pets = () => {
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
        <>
          <div className="col-sm-6 border p-2">
            <h2 className="text-center m-3">Add your Pets! </h2>
            {Object.keys(pet).map((key, i) => {
              if (typeof pet[key] != "boolean") {
                return (
                  <div className="row my-3">
                    <label className="col-sm-2 col-form-label " htmlFor={key}>
                      {key}:{" "}
                    </label>
                    <div className="col-sm-10">
                      <input
                        placeholder={key}
                        key={i}
                        name={key}
                        defaultValue={pet[key]}
                        onChange={(e) =>
                          setPet({ ...pet, [key]: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="row my-3">
                    <label className="col-sm-2 col-form-label" htmlFor={key}>
                      {key}:{" "}
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="checkbox"
                        key={i}
                        name={key}
                        checked={pet[key]}
                        onChange={(e) =>
                          setPet({ ...pet, [key]: e.target.checked })
                        }
                      ></input>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="text-center mt-2 p-3 ">
            <button className="btn btn-primary" onClick={() => createPet()}>
              Add Pet
            </button>
          </div>

          <div className="row mt-5 border rounded">
            {pets.map((x) => {
              return (
                <div key={x.id} className="card" style={{ width: "18rem" }}>
                  <img
                    src="https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text">Name: {x.name}</p>
                    <p className="card-text">Age: {x.age}</p>
                    <p className="card-text">Breed: {x.breed}</p>
                    <p className="card-text">
                      Sterilized:
                      <input
                        type="checkbox"
                        className="card-text mx-2"
                        disabled
                        checked={x.sterilized}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        "Please Register or Login"
      )}
    </div>
  );
};

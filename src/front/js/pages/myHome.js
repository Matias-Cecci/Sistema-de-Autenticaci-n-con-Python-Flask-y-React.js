import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const MyHome = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container mt-4">
      {store.currentUserEmail ? (
        <>
          <h2>Bienvenido: {store.currentUserEmail}</h2>

          <div className="card rounded mt-5" style={{ width: "18rem" }}>
            <img
              src="https://cdn.pixabay.com/photo/2021/01/02/23/55/dog-5883275_960_720.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title mt-2">Mis Mascotas</h5>
              <p className="card-text">Agregue sus mascotas a su perfil</p>
              <Link to="/pets">
                <button className="btn btn-warning mt-2">ir a Mascotas</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        "Please Register or Login"
      )}
    </div>
  );
};

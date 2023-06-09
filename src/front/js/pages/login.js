import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const sendLoginCredential = async () => {
    const response = await fetch(process.env.BACKEND_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      await actions.getCurrentUserEmail();
      navigate("/myHome");
    } else {
      setError(true);
    }
  };

  return (
    <div className="col-md-6 mx-auto">
      <div className="login-card row border p-0 my-5 ">
        <div className="col-md-6 col-sm-12 login-der justify-content-center">
          <h2 className="text-center m-3 fs-1 justify-content-center">
            <i className="fa-solid fa-circle-user my-3 icono-login"></i>
          </h2>
          <div className="d-grid my-3 justify-content-center gap-2">
            <div className=" form-floating ">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setError(false);
                  setEmail(e.target.value);
                }}
              ></input>
              <label htmlFor="email">
                {" "}
                <i className="fa-solid fa-envelope"></i> Email
              </label>
            </div>
            <div className="col form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);
                }}
              ></input>
              <label htmlFor="password">
                <i className="fa-solid fa-lock"></i> Password
              </label>
            </div>
            <div className="d-grid text-center mt-3">
              <button
                className="btn btn-primary btn-lg rounded-pill "
                onClick={() => sendLoginCredential()}
              >
                Login
              </button>
              {error ? (
                <p className="alert alert-warning rounded mt-2">
                  Error en crendenciales
                </p>
              ) : null}
            </div>
            <div className="mt-3 ">
              <p className="text-end">Forgot your password?</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 login-foto d-none d-md-block"></div>
      </div>
    </div>
  );
};

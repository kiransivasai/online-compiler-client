import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../UserContext";
import "./Login.scss";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setEmailError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      console.log("Test");
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <form onSubmit={submitHandler} autoComplete="off">
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}
        <Button type="submit" className="btn btn__login">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

import { Button } from "@material-ui/core";
import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import "./Signup.scss";
import { Redirect } from "react-router-dom";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setNameError("");
    setEmailError("");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ name, email, password, userType }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setNameError(data.errors.name);
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
    <div className="signup">
      <form autoComplete="off" onSubmit={submitHandler}>
        <h1>Signup</h1>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <div className="error">{nameError}</div>}
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
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        {passwordError && <div className="error">{passwordError}</div>}
        <Button type="submit" className="btn btn__signup">
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;

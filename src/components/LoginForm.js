import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import classes from "../styles/Form.module.css";
import Button from "./Button";
import TextInput from "./TextInput";
const LoginForm = () => {
  const { loginUser, error, loading } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleOnChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    const newUser = { ...user };
    newUser[field] = value;
    setUser({ ...newUser });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    loginUser(user.email, user.password, history);
  };

  return (
    <form
      style={{ height: "500px" }}
      className={classes.form}
      onSubmit={handleFormSubmit}
    >
      <TextInput
        type="email"
        placeholder="Enter email"
        value={user.email}
        required
        name="email"
        onChange={handleOnChange}
      >
        alternate_email
      </TextInput>
      <TextInput
        type="password"
        placeholder="Enter password"
        value={user.password}
        required
        name="password"
        onChange={handleOnChange}
      >
        lock
      </TextInput>
      <Button type="submit" disabled={loading}>
        <span>Login</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Sign up</Link> instead.
      </div>
    </form>
  );
};

export default LoginForm;

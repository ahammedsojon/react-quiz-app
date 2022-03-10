import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../hooks/useAuth";
import classes from "../styles/Form.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import TextInput from "./TextInput";
const SignupFrom = () => {
  const { signupUser, loading, error, setError } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
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
    if (user.password !== user.confirmPassword) {
      return setError("Password doesn't match");
    }
    signupUser(user.email, user.password, user.name, history);
  };
  return (
    <form
      style={{ height: "500px" }}
      className={classes.form}
      onSubmit={handleFormSubmit}
    >
      <TextInput
        type="text"
        placeholder="Enter name"
        required
        name="name"
        onChange={handleOnChange}
      >
        person
      </TextInput>
      <TextInput
        type="email"
        placeholder="Enter email"
        required
        name="email"
        onChange={handleOnChange}
      >
        alternate_email
      </TextInput>
      <TextInput
        type="password"
        placeholder="Enter password"
        required
        name="password"
        onChange={handleOnChange}
      >
        lock
      </TextInput>
      <TextInput
        type="password"
        placeholder="Confirm password"
        required
        name="confirmPassword"
        onChange={handleOnChange}
      >
        lock_clock
      </TextInput>
      <Checkbox text="I agree to the Terms &amp; Conditions" required />
      <Button type="submit" disabled={loading}>
        <span>Sign up</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </form>
  );
};

export default SignupFrom;

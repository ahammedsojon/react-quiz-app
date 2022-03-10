import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import classes from "../styles/Account.module.css";
const Account = () => {
  const { currentUser, logoutUser } = useAuth();
  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser?.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logoutUser}
          >
            {" "}
            logout{" "}
          </span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
};

export default Account;

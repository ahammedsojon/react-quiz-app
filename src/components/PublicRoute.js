import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PublicRoute = ({ component: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return true;
  }
  return !currentUser ? (
    <>
      <Route {...rest}>{(props) => <Component {...props} />}</Route>
    </>
  ) : (
    <>
      <Redirect to="/" />
    </>
  );
};

export default PublicRoute;

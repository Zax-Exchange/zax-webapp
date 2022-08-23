import { ReactElement, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const LoggedOutRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }

  return children;
};

export default LoggedOutRoute;

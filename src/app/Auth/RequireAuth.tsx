import { ReactElement, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React from "react";

const RequireAuth = ({
  children,
  isAllowed,
}: {
  children: ReactElement;
  isAllowed: boolean | undefined;
}) => {
  const { user } = useContext(AuthContext);

  // if vendor/customer is trying to access customer/vendor routes
  if (isAllowed === false) {
    return <Navigate to="/" replace={true} />;
  }

  // if logged out user trying to access logged in routes
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default RequireAuth;

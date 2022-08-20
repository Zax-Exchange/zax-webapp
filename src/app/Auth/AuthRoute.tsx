import RequireAuth from "./RequireAuth";
import { Route } from "react-router-dom";
import { ReactElement } from "react";
import React from "react";

const AuthRoute = ({
  element,
  path,
}: {
  element: ReactElement;
  path: string;
}) => {
  return <Route path="/" element={element} />;
  return <Route path={path} element={<RequireAuth>{element}</RequireAuth>} />;
};

export default AuthRoute;

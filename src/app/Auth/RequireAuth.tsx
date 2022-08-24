import { ReactElement, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  matchRoutes,
  Navigate,
  RouteMatch,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React from "react";

const ZAX_LOGGED_IN_ROUTES = [
  { path: "*" },
  { path: "/" },
  { path: "profile" },
  { path: "settings" },
  { path: "customer-projects" },
  { path: "customer-search-results" },
  { path: "/customer-project-detail/:projectId" },
  { path: "/create-project" },
  { path: "/vendor-projects" },
  { path: "/vendor-search-results" },
  { path: "/search-project-detail/:projectId" },
  { path: "/vendor-project-detail/:projectId" },
];

const RequireAuth = ({
  children,
  isAllowed,
}: {
  children: ReactElement;
  isAllowed: boolean | undefined;
}) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const routes = matchRoutes(ZAX_LOGGED_IN_ROUTES, location);
  const currentRoute = routes![0].route.path;

  // allow access for only logged-in and allowed users
  // this prevents customers/vendors from accessing vendors/customers routes
  if (user && isAllowed) {
    // special case when logged-in user trying to access arbitary route
    if (currentRoute === "*") {
      return <Navigate to="/" replace={true} />;
    }
    return children;
  }

  // if logged out user trying to access logged in routes
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Navigate to="/" replace={true} />;
};

export default RequireAuth;

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
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
  VENDOR_ROUTES,
} from "../constants/loggedInRoutes";

const ZAX_LOGGED_IN_ROUTES = [
  { path: GENERAL_ROUTES.ARBITRARY },
  { path: GENERAL_ROUTES.HOME },
  { path: GENERAL_ROUTES.PROFILE },
  { path: GENERAL_ROUTES.SETTINGS },
  { path: CUSTOMER_ROUTES.PROJECTS },
  { path: CUSTOMER_ROUTES.SEARCH_RESULTS },
  { path: CUSTOMER_ROUTES.PROJECT_DETAIL },
  { path: CUSTOMER_ROUTES.GUIDED_CREATE_PROJECT },
  { path: CUSTOMER_ROUTES.ADVANCED_CREATE_PROJECT },
  { path: CUSTOMER_ROUTES.VENDOR_PROFILE },
  { path: VENDOR_ROUTES.PROJECTS },
  { path: VENDOR_ROUTES.SEARCH_RESULTS },
  { path: VENDOR_ROUTES.SEARCH_PROJECT_DETAIL },
  { path: VENDOR_ROUTES.PROJECT_DETAIL },
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

    if (currentRoute === GENERAL_ROUTES.ARBITRARY) {
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

// @ts-nocheck
import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";
import { EVENT_ACTION, EVENT_CATEGORY } from "../analytics/constants";
import { LoggedInUser } from "../generated/graphql";
import ReactGA from "react-ga4";

/**
 * user {
 *  id
 *  companyId
 *  isVendor
 *  power
 *  status
 *  name
 *  email
 * }
 */
type SessionState = {
  user: LoggedInUser | null;
};
const initialState = {
  user: null,
};

if (sessionStorage.getItem("token")) {
  const decoded = jwtDecode(sessionStorage.getItem("token")!) as any;

  if (decoded.exp * 1000 < Date.now()) {
    sessionStorage.removeItem("token");
  } else {
    initialState.user = decoded;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
} as {
  user: LoggedInUser | null;
  login: (data: LoggedInUser) => void;
  logout: () => void;
});

const authReducer = (
  state: SessionState,
  action: { type: string; payload: LoggedInUser | null }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: LoggedInUser) => {
    sessionStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    ReactGA.event({
      action: EVENT_ACTION.LOGOUT,
      category: EVENT_CATEGORY.USER_SESSION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

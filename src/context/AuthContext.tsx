// @ts-nocheck
import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";
import { EVENT_ACTION, EVENT_CATEGORY } from "../analytics/constants";
import { LoggedInUser } from "../generated/graphql";
import ReactGA from "react-ga4";
import { BroadcastChannel } from "broadcast-channel";

type SessionState = {
  user: LoggedInUser | null;
};
const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decoded = jwtDecode(localStorage.getItem("token")!) as any;

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
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
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
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

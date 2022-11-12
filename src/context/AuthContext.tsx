// @ts-nocheck
import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";
import { LoggedInUser } from "../generated/graphql";
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

// TODO: fix all typings in this file
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

const authReducer = (state: SessionState, action: any) => {
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

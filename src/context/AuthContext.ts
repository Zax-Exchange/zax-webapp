import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";
/**
 * user {
 *  id
 *  companyId
 *  isVendor
 *  isAdmin
 *  isActive
 *  name
 *  email
 * }
 */
const initialState = {
  user: null
}

if (sessionStorage.getItem("token")) {
  const decoded = jwtDecode(sessionStorage.getItem("token"));

  if (decoded.exp * 1000 < Date.now()) {
    sessionStorage.removeItem("token");
  } else {
    initialState.user = decoded;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {}
});

const authReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      }
    case "LOGOUT":
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = userData => {
    sessionStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  }

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  return <AuthContext.Provider 
    value={{
      user: state.user,
      login,
      logout
    }}
    {...props}
  />
}

export {
  AuthContext,
  AuthProvider
}
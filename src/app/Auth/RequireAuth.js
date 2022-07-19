import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  return user ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth;
import RequireAuth from "./RequireAuth"
import { Route } from "react-router-dom";

const AuthRoute = ({ element, path }) => {
  console.log("@@@")
  return <Route path="/" element={element}/>
  return <Route 
    path={path} 
    element={<RequireAuth>{element}</RequireAuth>}
  />;
}

export default AuthRoute;
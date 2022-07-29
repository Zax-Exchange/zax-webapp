import { Container } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.isAdmin;

  return (
    <Container>
      Settings PAGE

      
    </Container>
  )
};

export default Settings
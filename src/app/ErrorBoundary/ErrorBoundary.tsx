import { 
  Container,
  Typography,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorFallback = ({error, resetErrorBoundary}) => {
  const navigate = useNavigate();

  const reset = () => {
    navigate("/")
    resetErrorBoundary();
  }
  return <Container role="alert">
    <Typography variant="h5">Something went wrong!</Typography>

    <Button onClick={reset}>Try again</Button>
  </Container>
}

export default ErrorFallback;
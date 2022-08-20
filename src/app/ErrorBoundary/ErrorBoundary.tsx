import { Container, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: () => void;
}) => {
  const navigate = useNavigate();

  const reset = () => {
    navigate("/");
    resetErrorBoundary();
  };
  return (
    <Container role="alert">
      <Typography variant="h5">Something went wrong!</Typography>

      <Button onClick={reset}>Try again</Button>
    </Container>
  );
};

export default ErrorFallback;

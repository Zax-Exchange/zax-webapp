import { Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetAllPlans } from "../hooks/planHooks";
import FullScreenLoading from "../Utils/Loading";


const ChangePlan = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);

  const {
    getAllPlansData,
    getAllPlansError,
    getAllPlansLoading,
    getAllPlansRefetch
  } = useGetAllPlans(user.isVendor);
  
  useEffect(() => {
    if (getAllPlansError) {
    setSnackbar({
      severity: "error",
      message: "Something went wrong. Please try again later."
    })
    setSnackbarOpen(true);
  }
  }, [getAllPlansError]);

  if (getAllPlansLoading) {
    return <FullScreenLoading />
  }

  if (getAllPlansError) {
    return null;
  }

  return <Container>
    {
      getAllPlansData &&
      getAllPlansData.getAllPlans &&
      getAllPlansData.getAllPlans.map((plan) => {
        return <Typography>{plan.name}</Typography>
      })
    }
  </Container>
}

export default ChangePlan;
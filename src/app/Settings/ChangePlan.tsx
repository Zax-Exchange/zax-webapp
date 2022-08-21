import { Container, Typography } from "@mui/material";
import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetAllPlansQuery } from "../../generated/graphql";
import FullScreenLoading from "../Utils/Loading";


const ChangePlan = ({
  // setSnackbar,
  // setSnackbarOpen
}) => {
  const { user } = useContext(AuthContext);

  const {
    data: getAllPlansData,
    error: getAllPlansError,
    loading: getAllPlansLoading,
    refetch: getAllPlansRefetch
  } = useGetAllPlansQuery({
    variables: {
      isVendor: user!.isVendor
    }
  });
  
  useEffect(() => {
    if (getAllPlansError) {
    // setSnackbar({
    //   severity: "error",
    //   message: "Something went wrong. Please try again later."
    // })
    // setSnackbarOpen(true);
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
        return <Typography>{plan?.tier}</Typography>
      })
    }
  </Container>
}

export default ChangePlan;
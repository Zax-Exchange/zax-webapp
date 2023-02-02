import { Container, Typography } from "@mui/material";
import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetAllPlansQuery } from "../gql/get/company/company.generated";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";

// not used for now
/** ADMIN VIEW */
const ChangePlan = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getAllPlansData,
    error: getAllPlansError,
    loading: getAllPlansLoading,
  } = useGetAllPlansQuery({
    variables: {
      data: {
        isVendor: user!.isVendor,
      },
    },
  });

  useEffect(() => {
    if (getAllPlansError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getAllPlansError]);

  if (getAllPlansLoading) {
    return <FullScreenLoading />;
  }

  if (getAllPlansError) {
    return null;
  }

  return (
    <Container>
      {getAllPlansData &&
        getAllPlansData.getAllPlans &&
        getAllPlansData.getAllPlans.map((plan) => {
          return <Typography>{plan?.tier}</Typography>;
        })}
    </Container>
  );
};

export default ChangePlan;

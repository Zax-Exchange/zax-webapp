import { Container, List, Typography, TypographyProps } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";

// not used for now
/** ADMIN VIEW */
const CurrentPlan = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  return null;
};

export default CurrentPlan;

import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";


export const ShrinkTextField = styled((props) => {
  return <TextField {...props} InputLabelProps={{shrink: true}}/>
})({});
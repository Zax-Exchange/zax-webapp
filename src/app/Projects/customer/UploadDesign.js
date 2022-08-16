import React, { useEffect, useState } from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadProjectDesign(file: $file)
  }
`;

export default function UploadDesign({
  setProjectData,
  setSnackbar,
  setSnackbarOpen,
}) {
  const [mutate, { error, loading, data }] = useMutation(MUTATION);

  useEffect(() => {
    // server error
    if (error) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
    // upload success
    if (data) {
      setSnackbar({
        severity: "success",
        message: "Project design uploaded successfully.",
      });
      setSnackbarOpen(true);
    }
  }, [error, data]);

  const onUpload = async ({ target: { files } }) => {
    const file = files[0];

    if (file.type === "application/pdf") {
      const { data } = await mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      });

      setProjectData((projectData) => ({
        ...projectData,
        designId: data.uploadProjectDesign,
      }));
    } else {
      // invalid file type
      setSnackbar({
        severity: "error",
        message: "File type is not supported. Please upload pdf only.",
      });
      setSnackbarOpen(true);
    }
  };

  return (
    <IconButton variant="contained" component="label">
      <input hidden type="file" onChange={onUpload} accept=".pdf" />
      {loading && <CircularProgress />}
      {!loading && <CloudUploadIcon />}
    </IconButton>
  );
}

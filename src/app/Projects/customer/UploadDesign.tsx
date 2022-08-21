import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ProjectData } from "./CreateProject";
import { useUploadProjectDesignMutation } from "../../../generated/graphql";



export type File = {
  uri: string;
  filename: string;
  mimetype: string;
  encoding: string;
  type: string;
};
type Target = {
  files: FileList | null;
};
export default function UploadDesign({
  setProjectData,
}: // setSnackbar,
// setSnackbarOpen,
{
  setProjectData: React.Dispatch<React.SetStateAction<ProjectData>>;
}) {
  const [mutate, { error, loading, data }] = useUploadProjectDesignMutation()

  useEffect(() => {
    // server error
    if (error) {
      // setSnackbar({
      //   severity: "error",
      //   message: "Something went wrong. Please try again later.",
      // });
      // setSnackbarOpen(true);
    }
    // upload success
    if (data) {
      // setSnackbar({
      //   severity: "success",
      //   message: "Project design uploaded successfully.",
      // });
      // setSnackbarOpen(true);
    }
  }, [error, data]);

  const onUpload = async ({ target }: { target: Target }) => {
    if (!target.files) return;

    const file = target.files[0];

    if (file.type === "application/pdf") {
      mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      }).then(data => {
        setProjectData((projectData) => ({
          ...projectData,
          designId: data.data!.uploadProjectDesign!
        }));
      })

    } else {
      // invalid file type
      // setSnackbar({
      //   severity: "error",
      //   message: "File type is not supported. Please upload pdf only.",
      // });
      // setSnackbarOpen(true);
    }
  };

  return (
    <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
      <input hidden type="file" onChange={onUpload} accept=".pdf" />
      {loading && <CircularProgress />}
      {!loading && <CloudUploadIcon />}
      <Typography>Upload design</Typography>
    </IconButton>
  );
}

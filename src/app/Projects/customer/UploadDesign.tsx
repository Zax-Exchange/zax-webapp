import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useUploadProjectDesignMutation } from "../../gql/create/project/project.generated";
import { CreateProjectInput } from "../../../generated/graphql";
import { useIntl } from "react-intl";

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
}: {
  setProjectData: React.Dispatch<React.SetStateAction<CreateProjectInput>>;
}) {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadProjectDesignMutation();

  useEffect(() => {
    // server error
    if (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
    // upload success
    if (data) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.customer.createProject.upload.success",
        }),
      });
      setSnackbarOpen(true);
    }
  }, [error, data]);

  const onUpload = async ({ target }: { target: Target }) => {
    if (!target.files) return;

    const file = target.files[0];

    if (file.type === "application/pdf") {
      mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      }).then((data) => {
        setProjectData((projectData) => ({
          ...projectData,
          designId: data.data!.uploadProjectDesign!.designId,
        }));
      });
    } else {
      // invalid file type
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({
          id: "app.customer.createProject.upload.fileTypeError",
        }),
      });
      setSnackbarOpen(true);
    }
  };

  const renderFileDetail = () => {
    return (
      <Box>
        <Link
          href={data?.uploadProjectDesign.url}
          target="_blank"
          rel="noopener"
        >
          {data?.uploadProjectDesign.filename}
        </Link>
      </Box>
    );
  };
  return (
    <>
      {renderFileDetail()}
      <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
        <input hidden type="file" onChange={onUpload} accept=".pdf" />
        {loading && <CircularProgress />}
        {!loading && <CloudUploadIcon />}
        <Typography>
          {intl.formatMessage({
            id: "app.customer.createProject.uploadDesign",
          })}
        </Typography>
      </IconButton>
    </>
  );
}

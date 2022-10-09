import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  UploadProjectDesignMutation,
  useUploadProjectDesignMutation,
} from "../../gql/create/project/project.generated";
import {
  CreateProjectComponentInput,
  CreateProjectInput,
  ProjectDesign,
} from "../../../generated/graphql";
import { useIntl } from "react-intl";
import { useDeleteProjectDesignMutation } from "../../gql/delete/project/project.generated";
import { GuidedCreateSetComponentData } from "./createProject/guided/GuidedCreateProject";

export type File = {
  uri: string;
  filename: string;
  mimetype: string;
  encoding: string;
  type: string;
};
type Target = {
  files: FileList | null;
  value: any;
};
export default function UploadDesign({
  setComponentData,
  parentSetDesign,
}: {
  setComponentData:
    | GuidedCreateSetComponentData
    | React.Dispatch<React.SetStateAction<CreateProjectComponentInput>>;
  parentSetDesign: (data: ProjectDesign | null) => void;
}) {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadProjectDesignMutation();
  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

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
    target.value = "";

    if (file.type === "application/pdf") {
      mutate({
        variables: { file },
        fetchPolicy: "no-cache",
      }).then((data) => {
        (setComponentData as GuidedCreateSetComponentData)((prev) => {
          let prevDesigns: string[] = [];
          if (prev && prev.designIds) {
            prevDesigns = prev.designIds;
          }
          return {
            ...prev,
            designIds: [
              ...prevDesigns,
              data.data!.uploadProjectDesign!.designId,
            ],
          } as CreateProjectComponentInput;
        });

        if (parentSetDesign) {
          console.log(
            "parent set design called with: ",
            data.data!.uploadProjectDesign
          );
          parentSetDesign(data.data!.uploadProjectDesign);
        }
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

  return (
    <Tooltip
      placement="top"
      arrow
      title={intl.formatMessage({
        id: "app.customer.createProject.uploadDesign",
      })}
    >
      <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
        {!loading && (
          <input hidden type="file" onChange={onUpload} accept=".pdf" />
        )}
        {loading && <CircularProgress size={24} />}
        {!loading && <CloudUploadIcon />}
      </IconButton>
    </Tooltip>
  );
}

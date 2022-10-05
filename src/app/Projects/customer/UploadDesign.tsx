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
import {
  UploadProjectDesignMutation,
  useUploadProjectDesignMutation,
} from "../../gql/create/project/project.generated";
import {
  CreateProjectInput,
  UploadProjectDesignResponse,
} from "../../../generated/graphql";
import { useIntl } from "react-intl";
import { useDeleteProjectDesignMutation } from "../../gql/delete/project/project.generated";

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
  existingDesigns,
  parentSetDesign,
  allowMultiple = false,
}: {
  setProjectData: React.Dispatch<React.SetStateAction<CreateProjectInput>>;
  existingDesigns?: UploadProjectDesignResponse[];
  parentSetDesign?: (data: UploadProjectDesignResponse | null) => void;
  allowMultiple?: boolean;
}) {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadProjectDesignMutation();
  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  const [uploadedFiles, setUploadedFiles] = useState<
    UploadProjectDesignResponse[]
  >([]);

  useEffect(() => {
    if (existingDesigns) {
      setUploadedFiles(existingDesigns);
    }
  }, [existingDesigns]);
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
          designIds: [
            ...projectData.designIds,
            data.data!.uploadProjectDesign!.designId,
          ],
        }));
        if (parentSetDesign) {
          parentSetDesign(data.data!.uploadProjectDesign);
        }

        if (allowMultiple) {
          setUploadedFiles([...uploadedFiles, data.data!.uploadProjectDesign]);
        } else {
          // If there is already an existing uploaded file
          if (uploadedFiles.length) {
            // do this in the background
            deleteProjectDesign({
              variables: {
                data: {
                  designId: uploadedFiles[0].designId,
                },
              },
            });
          }
          setUploadedFiles([data.data!.uploadProjectDesign]);
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

  const renderFileDetail = () => {
    return (
      <Box>
        {uploadedFiles.map((file) => {
          return (
            <Link href={file.url} target="_blank" rel="noopener">
              {file.filename}
            </Link>
          );
        })}
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

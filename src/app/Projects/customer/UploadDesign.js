import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadProjectDesign(file: $file)
  }
`;

export default function UploadDesign({ setProjectData }) {
  const [mutate, { error, loading }] = useMutation(MUTATION);

  const onUpload = async ({ target: { validity, files } }) => {
    const file = files[0];

    if (validity.valid) {
      const { data } = await mutate({ variables: { file } });

      setProjectData((projectData) => ({
        ...projectData,
        designId: data.uploadProjectDesign,
      }));
    }
  };
  return (
    <Button variant="contained" component="label">
      Upload
      <input hidden type="file" onChange={onUpload} />
      {loading && <CircularProgress />}
    </Button>
  );
}

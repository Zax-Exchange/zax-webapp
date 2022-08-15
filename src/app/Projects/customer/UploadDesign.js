import React from 'react'
import { Button } from '@mui/material'
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      key
      Bucket
    }
  }
`;

export default function UploadDesign() {
  const [mutate] = useMutation(MUTATION);

  const onChange = ({ target: { validity, files } }) => {
    const file = files[0]
    console.log({ file })
    if (validity.valid) mutate({ variables: { file } });
  }
  return (
    <Button variant="contained" component="label">
      Upload
      <input type="file" onChange={onChange} />
    </Button>
  )
}

import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CreateProjectComponentSpecInput,
  ProductDimension,
} from "../../../../../generated/graphql";
import { isValidFloat } from "../../../../Utils/inputValidators";

const DimensionsInput = ({
  componentSpec,
  setComponentSpec,
}: {
  componentSpec: CreateProjectComponentSpecInput;
  setComponentSpec:
    | React.Dispatch<React.SetStateAction<CreateProjectComponentSpecInput>>
    | ((
        arg: (
          prev: CreateProjectComponentSpecInput
        ) => CreateProjectComponentSpecInput
      ) => void);
}) => {
  const dimensionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = isValidFloat(val);

    if (isAllowed) {
      setComponentSpec((prev) => ({
        ...prev,
        dimension: {
          ...prev.dimension,
          [e.target.name]: val,
        },
      }));
    }
  };

  if (!componentSpec.dimension) return null;

  return (
    <Box>
      <Box>
        <TextField
          autoComplete="new-password"
          label="X"
          onChange={dimensionOnChange}
          name="x"
          value={componentSpec.dimension.x}
          sx={{
            width: 80,
            mr: 2,
          }}
        />
        <TextField
          autoComplete="new-password"
          label="Y"
          onChange={dimensionOnChange}
          name="y"
          value={componentSpec.dimension.y}
          sx={{
            width: 80,
            mr: 2,
          }}
        />
        {componentSpec.dimension.z !== undefined && (
          <TextField
            autoComplete="new-password"
            label="Z"
            onChange={dimensionOnChange}
            name="z"
            value={componentSpec.dimension.z}
            sx={{
              width: 80,
            }}
          />
        )}
      </Box>
      <Box>
        <Typography variant="caption" fontSize="0.8rem">
          <i>* units are all in mm</i>
        </Typography>
      </Box>
    </Box>
  );
};

export default DimensionsInput;

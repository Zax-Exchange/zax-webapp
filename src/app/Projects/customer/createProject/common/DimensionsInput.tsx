import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CreateProjectComponentSpecInput,
  PostProcessDetailInput,
  ProductDimension,
  ProductDimensionInput,
} from "../../../../../generated/graphql";
import { isValidFloat } from "../../../../Utils/inputValidators";

const DimensionsInput = ({
  dimension,
  setDimension,
}: {
  dimension: ProductDimension | null | undefined;
  setDimension: (data: ProductDimension) => void;
}) => {
  const dimensionOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = isValidFloat(val);

    if (isAllowed) {
      setDimension({
        ...dimension!,
        [e.target.name]: val,
      });
    }
  };

  if (!dimension) return null;

  return (
    <Box>
      <Box>
        <TextField
          autoComplete="new-password"
          label="X"
          onChange={dimensionOnChange}
          name="x"
          value={dimension.x}
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
          value={dimension.y}
          sx={{
            width: 80,
            mr: 2,
          }}
        />
        {dimension.z !== undefined && dimension.z !== null && (
          <TextField
            autoComplete="new-password"
            label="Z"
            onChange={dimensionOnChange}
            name="z"
            value={dimension.z}
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

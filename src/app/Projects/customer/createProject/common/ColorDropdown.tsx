import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { CreateProjectComponentSpecInput } from "../../../../../generated/graphql";
import {
  ALL_COLORS,
  productValueToLabelMap,
} from "../../../../constants/products";

const ColorDropdown = ({
  setComponentSpec,
  setColor,
  color,
  componentSpec,
  displayLabel = false,
}: {
  setComponentSpec?: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  setColor?: (color: string) => void;
  color?: string;
  componentSpec?: CreateProjectComponentSpecInput;
  displayLabel?: boolean;
}) => {
  const intl = useIntl();

  const getDefaultValue = () => {
    if (color) {
      return productValueToLabelMap[color];
    }
    if (componentSpec && componentSpec.color) {
      return productValueToLabelMap[componentSpec.color];
    }
    return null;
  };
  return (
    <Autocomplete
      sx={{ width: 200 }}
      options={ALL_COLORS}
      autoHighlight
      value={getDefaultValue()}
      onChange={(e, v) => {
        if (setComponentSpec) {
          setComponentSpec((spec) => ({
            ...spec,
            color: v ? v.value : "",
          }));
        }
        if (setColor) {
          setColor(v ? v.value : "");
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            displayLabel
              ? intl.formatMessage({
                  id: "app.component.attribute.color",
                })
              : ""
          }
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
          InputLabelProps={{
            sx: {
              fontSize: 16,
              top: -7,
            },
          }}
        />
      )}
    />
  );
};

export default ColorDropdown;

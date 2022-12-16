import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { CreateProjectComponentSpecInput } from "../../../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../../../type/common";
import { productValueToLabelMap } from "../../../../../../constants/products";

const BoxStyleDropdown = ({
  setComponentSpec,
  componentSpec,
  options,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
  options: TranslatableAttribute[];
}) => {
  const intl = useIntl();
  const getDefaultValue = () => {
    if (componentSpec && componentSpec.boxStyle) {
      return productValueToLabelMap[componentSpec.boxStyle];
    } else {
      return null;
    }
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={options}
      getOptionLabel={(option) => intl.formatMessage({ id: option.labelId })}
      autoHighlight
      value={getDefaultValue()}
      onChange={(e, v) => {
        const value = v ? v.value : "";

        setComponentSpec((prev) => ({
          ...prev,
          boxStyle: value,
        }));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={intl.formatMessage({ id: "app.component.attribute.boxStyle" })}
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

export default BoxStyleDropdown;

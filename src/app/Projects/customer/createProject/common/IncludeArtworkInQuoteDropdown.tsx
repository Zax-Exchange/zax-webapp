import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { CreateProjectComponentSpecInput } from "../../../../../generated/graphql";

const IncludeArtworkInQuoteDropdown = ({
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
  const intl = useIntl();
  const YES_OPTION = {
    label: intl.formatMessage({ id: "app.general.yes" }),
    value: true,
  };
  const NO_OPTION = {
    label: intl.formatMessage({ id: "app.general.no" }),
    value: false,
  };
  return (
    <Autocomplete
      options={[YES_OPTION, NO_OPTION]}
      value={componentSpec.includeArtworkInQuote ? YES_OPTION : NO_OPTION}
      isOptionEqualToValue={(option, value) => {
        return option === value;
      }}
      onChange={(e, v) => {
        if (!v) {
          setComponentSpec((prev) => ({
            ...prev,
            includeArtworkInQuote: false,
          }));
        } else {
          setComponentSpec((prev) => ({
            ...prev,
            includeArtworkInQuote: v.value,
          }));
        }
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                top: -7,
              },
            }}
            helperText={
              componentSpec.includeArtworkInQuote === true
                ? intl.formatMessage({
                    id: "app.component.attribute.includeArtworkInQuote.helperText",
                  })
                : ""
            }
            FormHelperTextProps={{
              sx: {
                margin: 0,
                fontSize: "0.7em",
              },
            }}
          />
        );
      }}
    />
  );
};

export default IncludeArtworkInQuoteDropdown;

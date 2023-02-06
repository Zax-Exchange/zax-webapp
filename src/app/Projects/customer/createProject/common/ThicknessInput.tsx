import { TextField } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { isValidFloat } from "../../../../Utils/inputValidators";

const ThicknessInput = ({
  thickness,
  setThickness,
}: {
  thickness: string;
  setThickness: (val: string) => void;
}) => {
  const intl = useIntl();

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const isAllowed = isValidFloat(val);
    if (isAllowed) {
      setThickness(val);
    }
  };

  return (
    <TextField
      autoComplete="new-password"
      label={intl.formatMessage({
        id: "app.component.attribute.thickness",
      })}
      onChange={inputOnChange}
      name="thickness"
      value={thickness}
      helperText={`*
              ${intl.formatMessage({
                id: "app.general.unit",
              })}
              : ${intl.formatMessage({ id: "app.general.unit.mm" })}`}
      FormHelperTextProps={{
        sx: {
          fontStyle: "italic",
          m: 0,
          fontSize: "0.8rem",
        },
      }}
    />
  );
};

export default ThicknessInput;

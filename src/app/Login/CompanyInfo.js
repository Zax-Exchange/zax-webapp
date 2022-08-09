import {
  Autocomplete,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { countries } from "../constants/countries";
import { useCheckCompanyName } from "../hooks/signupHooks";

const CompanyInfo = ({
  values,
  onChange,
  countryOnChange,
  setShouldDisableNext,
}) => {
  const {
    checkCompanyName,
    checkCompanyNameLoading,
    checkCompanyNameData,
    checkCompanyNameError,
  } = useCheckCompanyName();

  useEffect(() => {
    if (checkCompanyNameData && checkCompanyNameData.checkCompanyName) {
      setShouldDisableNext(true);
    } else {
      setShouldDisableNext(false);
    }
  }, [checkCompanyNameData, setShouldDisableNext]);
  const renderCompanyNameHelperText = () => {
    if (
      (checkCompanyNameData && !checkCompanyNameData.checkCompanyName) ||
      !checkCompanyNameData
    ) {
      return "";
    }
    return "Company name taken.";
  };

  const companyNameOnChange = async (e) => {
    onChange(e);

    await checkCompanyName({
      variables: {
        name: e.target.value,
      },
      fetchPolicy: "no-cache",
    });
  };

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e, v) => countryOnChange(v)}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            required
            {...params}
            label="Company location"
            name="country"
            value={values.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                // transform: "translate(14px, 9px) scale(1)",
              },
            }}
          />
        )}
      />
    );
  };
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }} textAlign="left">
        Enter your company information
      </Typography>
      <Stack spacing={2} textAlign="right">
        <TextField
          required
          label="Company name"
          type="text"
          name="name"
          value={values.name}
          onChange={companyNameOnChange}
          error={checkCompanyNameData && checkCompanyNameData.checkCompanyName}
          helperText={renderCompanyNameHelperText()}
          InputProps={{
            endAdornment: checkCompanyNameLoading && (
              <CircularProgress size={20} />
            ),
          }}
        ></TextField>
        <TextField
          required
          label="Company phone number"
          inputProps={{ pattern: "[0-9]*" }}
          type="tel"
          name="phone"
          value={values.phone}
          onChange={onChange}
        ></TextField>
        <TextField
          label="Company fax"
          inputProps={{ pattern: "[0-9]*" }}
          type="tel"
          name="fax"
          value={values.fax}
          onChange={onChange}
        ></TextField>
        <TextField
          label="Company website url"
          type="url"
          name="companyUrl"
          value={values.companyUrl}
          onChange={onChange}
        ></TextField>
        {renderCountryDropdown()}
      </Stack>
    </>
  );
};

export default CompanyInfo;

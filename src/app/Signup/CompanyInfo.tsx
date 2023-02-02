import { Check } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { throttle } from "lodash";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { countries } from "../constants/countries";
import { useCheckCompanyNameLazyQuery } from "../gql/utils/company/company.generated";
import { Country, CustomerSignupData } from "./customer/CustomerSignup";
import { VendorSignupData } from "./vendor/VendorSignup";

const CompanyInfo = ({
  values,
  onChange,
  countryOnChange,
  setShouldDisableNext,
}: {
  values: VendorSignupData | CustomerSignupData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  countryOnChange: (countryObj: Country | null) => void;
  setShouldDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const [checkCompanyNameQuery, { data, loading, error }] =
    useCheckCompanyNameLazyQuery();

  const checkCompanyName = useMemo(() => {
    return throttle((cb: () => void) => {
      cb();
    }, 500);
  }, []);

  useEffect(() => {
    setShouldDisableNext(true);
  }, []);

  useEffect(() => {
    if (data && data.checkCompanyName) {
      setShouldDisableNext(true);
    } else {
      setShouldDisableNext(false);
    }
  }, [data, setShouldDisableNext]);

  useEffect(() => {
    checkCompanyName(() => {
      checkCompanyNameQuery({
        variables: {
          data: {
            companyName: values.name,
          },
        },
        fetchPolicy: "no-cache",
      });
    });
  }, [values.name]);

  const renderCompanyNameHelperText = () => {
    if ((data && !data.checkCompanyName) || !data) {
      return "";
    }
    return intl.formatMessage({
      id: "app.signup.companyInfo.companyNameTaken",
    });
  };

  const shouldCompanyNameInputError = () => {
    if (data) {
      return data.checkCompanyName!;
    }
    return false;
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
        // isOptionEqualToValue={(option, val) => option.label === val}
        value={countries.find((c) => c.label === values.country)}
        // inputValue={values.country}
        // onInputChange={countryInputOnChange}
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
            label={intl.formatMessage({ id: "app.company.attribute.country" })}
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
          />
        )}
      />
    );
  };

  const renderEndAdornment = () => {
    if (loading) {
      return <CircularProgress size={20} />;
    }

    if (
      !loading &&
      !error &&
      data &&
      !data.checkCompanyName &&
      values.name !== ""
    ) {
      return <Check color="success" />;
    }
    return null;
  };
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }} textAlign="left">
        {intl.formatMessage({ id: "app.signup.companyInfo.pageTitle" })}
      </Typography>
      <Stack spacing={3} textAlign="right">
        <TextField
          required
          label={intl.formatMessage({
            id: "app.company.attribute.companyName",
          })}
          type="text"
          name="name"
          value={values.name}
          onChange={onChange}
          error={shouldCompanyNameInputError()}
          helperText={renderCompanyNameHelperText()}
          InputProps={{
            endAdornment: renderEndAdornment(),
          }}
        ></TextField>
        <TextField
          required
          label={intl.formatMessage({
            id: "app.company.attribute.contactEmail",
          })}
          type="email"
          name="contactEmail"
          value={values.contactEmail}
          onChange={onChange}
          helperText={intl.formatMessage({
            id: "app.signup.companyInfo.contactEmail.helperText",
          })}
        ></TextField>
        <TextField
          required
          label={intl.formatMessage({
            id: "app.company.attribute.phone",
          })}
          inputProps={{ pattern: "[0-9]*" }}
          type="tel"
          name="phone"
          value={values.phone}
          onChange={onChange}
        ></TextField>
        <TextField
          label={intl.formatMessage({
            id: "app.company.attribute.fax",
          })}
          inputProps={{ pattern: "[0-9]*" }}
          type="tel"
          name="fax"
          value={values.fax}
          onChange={onChange}
        ></TextField>
        <TextField
          label={intl.formatMessage({
            id: "app.company.attribute.companyUrl",
          })}
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

import { Autocomplete, Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { countries } from "../../constants/countries";
import { useCheckCompanyName } from "../../hooks/signupHooks";


const CustomerInfo = ({
  values,
  onChange,
  countryOnChange
}) => {

  const {
    checkCompanyName,
    checkCompanyNameLoading,
    checkCompanyNameData,
    checkCompanyNameError
  } = useCheckCompanyName()

  const renderCompanyNameHelperText = () => {
    if ((checkCompanyNameData && !checkCompanyNameData.checkCompanyName) || !checkCompanyNameData) {
      return ""
    }
    return "Company name taken."
  };

  const companyNameOnChange = async (e) => {
    onChange(e);
    
    await checkCompanyName({
      variables: {
        name: e.target.value
      },
      fetchPolicy: "no-cache"
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
        onChange={(e,v) => countryOnChange(v)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
            {...params}
            label="Company location"
            name="country"
            value={values.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }
  return <>
    <Typography variant="h6" sx={{marginBottom: 4}} textAlign="left">Enter your company information</Typography>
    <Stack spacing={2} textAlign="right">
      <TextField label="Company name" type="text" placeholder="Company name" name="name" value={values.name} onChange={companyNameOnChange} error={checkCompanyNameData && checkCompanyNameData.checkCompanyName} helperText={renderCompanyNameHelperText()} InputProps={{endAdornment: checkCompanyNameLoading && <CircularProgress />}}></TextField>
      <TextField label="Company phone number" inputProps={{pattern: "[0-9]*"}} type="tel" placeholder="Company phone number" name="phone" value={values.phone} onChange={onChange}></TextField>
      <TextField label="Company fax" inputProps={{pattern: "[0-9]*"}} type="tel" placeholder="Comapny fax" name="fax" value={values.fax} onChange={onChange}></TextField>
      <TextField label="Company website url" type="url" placeholder="Company website url" name="companyUrl" value={values.companyUrl} onChange={onChange}></TextField>
      {renderCountryDropdown()}

    </Stack>
  </>
}

export default CustomerInfo;
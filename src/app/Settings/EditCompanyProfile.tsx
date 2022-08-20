import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Input,
  ListItem,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { countries } from "../constants/countries";
import { buttonTheme, PrimaryButton } from "../themedComponents/Buttons";
import FullScreenLoading from "../Utils/Loading";
import {
  useGetCompanyDetail,
  useUpdateCustomerData,
  useUpdateVendorData,
} from "../hooks/companyHooks";
import AddIcon from "@mui/icons-material/Add";
import "../Login/vendor/VendorSignup.scss";
import { isValidAlphanumeric } from "../Utils/inputValidators";

/**
 * 
 * id
  name
  logo
  phone
  fax
  country
  companyUrl
  isActive
  isVendor
  isVerified

  locations
  materials
  moq
  leadTime
 */

const EditCompanyProfile = ({ setSnackbar, setSnackbarOpen }) => {
  const {
    getCompanyDetailData,
    getCompanyDetailLoading,
    getCompanyDetailError,
    getCompanyDetailRefetch,
  } = useGetCompanyDetail();

  const {
    updateVendorData,
    updateVendorDataError,
    updateVendorDataLoading,
    updateVendorDataData,
  } = useUpdateVendorData();

  const {
    updateCustomerData,
    updateCustomerDataError,
    updateCustomerDataLoading,
    updateCustomerDataData,
  } = useUpdateCustomerData();

  const { user } = useContext(AuthContext);
  const [companyData, setCompanyData] = useState(null);
  const [material, setMaterial] = useState("");
  const [materialInputBorderColor, setMaterialInputBorderColor] =
    useState("lightgray");
  const materianInputRef = useRef(null);

  useEffect(() => {
    if (getCompanyDetailData && getCompanyDetailData.getCompanyDetail) {
      const {
        name,
        contactEmail,
        logo,
        phone,
        fax,
        country,
        companyUrl,
        locations,
        materials,
        moq,
        leadTime,
      } = getCompanyDetailData.getCompanyDetail;

      if (user.isVendor) {
        setCompanyData({
          name,
          logo,
          phone,
          fax,
          country,
          companyUrl,
          locations,
          materials,
          moq,
          leadTime,
        });
      } else {
        setCompanyData({
          name,
          logo,
          phone,
          fax,
          country,
          companyUrl,
        });
      }
    }
  }, [getCompanyDetailData]);

  useEffect(() => {
    if (getCompanyDetailError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getCompanyDetailError]);

  const onChange = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const countryOnChange = (v) => {
    // v could be null if user clears input field
    const country = v ? v.label : companyData.country;
    setCompanyData({
      ...companyData,
      country,
    });
  };

  const materialOnChange = (e) => {
    const val = e.target.value || "";

    if (isValidAlphanumeric(val)) {
      setMaterial(val);
    }
  };

  const locationOnChange = (locations) => {
    locations = locations.map((l) => l.label);
    setCompanyData({
      ...companyData,
      locations,
    });
  };

  const addMaterial = (material) => {
    const materials = [...material].map((v) => v.trim());
    setCompanyData({
      ...companyData,
      materials,
    });
    setMaterial("");
  };

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        blurOnSelect
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e, v) => countryOnChange(v)}
        value={countries.find((c) => c.label === companyData.country)}
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
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            name="country"
            value={companyData.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  };

  const renderCustomerUpdateForm = () => {
    return <></>;
  };

  const shouldDisableUpdateButton = () => {
    // common non-required attributes
    const isRequired = (field) => {
      switch (field) {
        case "companyUrl":
        case "fax":
        case "logo":
          return false;
      }
      return true;
    };

    // customer non-required attributes
    const customerIsRequired = (field) => {
      switch (field) {
        case "leadTime":
        case "locations":
        case "moq":
        case "materials":
          return false;
      }
      return true;
    };

    // vendor non-required attributes
    const vendorIsRequired = (field) => {
      return true;
    };

    if (user.isVendor) {
      for (let key in companyData) {
        if (!companyData[key] && isRequired(key) && vendorIsRequired(key))
          return true;
      }
    } else {
      for (let key in companyData) {
        if (!companyData[key] && isRequired(key) && customerIsRequired(key))
          return true;
      }
    }
    return false;
  };

  const renderVendorUpdateForm = () => {
    const renderMaterialsDropdown = () => {
      return (
        <Autocomplete
          id="materials-select"
          sx={{ width: 400 }}
          options={["Rigid Box", "Folding Carton", "Molded Fiber", "Corrugate"]}
          autoHighlight
          inputValue={material}
          onInputChange={materialOnChange}
          onChange={(e, v) => addMaterial(v)}
          value={companyData.materials}
          multiple
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Manufacturing materials"
              value={material}
              onChange={materialOnChange}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              helperText="This helps customers to find your company easier."
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

    const getDefaultCompanyLocations = () => {
      const res = [];
      for (let country of countries) {
        for (let compCountry of companyData.locations) {
          if (country.label === compCountry) res.push(country);
        }
      }
      return res;
    };
    const renderFactoryLocationDropdown = () => {
      return (
        <Autocomplete
          id="factory-location-select"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          onChange={(e, v) => locationOnChange(v)}
          defaultValue={getDefaultCompanyLocations()}
          multiple
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
              {option.label} ({option.code})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Factory locations"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      );
    };

    return (
      <>
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Lead time"
          name="leadTime"
          value={companyData.leadTime}
          onChange={onChange}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Minimum order quantity"
          name="moq"
          value={companyData.moq}
          onChange={onChange}
          helperText="e.g. 5000-10000, 6000-8000"
        />
        {renderMaterialsDropdown()}
        {renderFactoryLocationDropdown()}
      </>
    );
  };

  const renderVendorOrCustomerForm = () => {
    if (user.isVendor) {
      return renderVendorUpdateForm();
    }
    return renderCustomerUpdateForm();
  };

  const updateCompanyData = async () => {
    try {
      if (user.isVendor) {
        await updateVendorData({
          variables: {
            data: {
              id: user.companyId,
              data: {
                ...companyData,
                leadTime: parseInt(companyData.leadTime, 10),
              },
            },
          },
        });
      } else {
        await updateCustomerData({
          variables: {
            data: {
              id: user.companyId,
              data: companyData,
            },
          },
        });
      }
      setSnackbar({
        severity: "success",
        message: "Company profile updated.",
      });
      getCompanyDetailRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Could not perform action. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const isLoading =
    getCompanyDetailLoading ||
    updateCustomerDataLoading ||
    updateVendorDataLoading;

  if (getCompanyDetailError) return null;

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6">Edit Company Profile</Typography>

      {companyData && (
        <>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Name"
              name="name"
              value={companyData.name}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Contact Email"
              name="contactEmail"
              value={companyData.contactEmail}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Phone"
              name="phone"
              value={companyData.phone}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Fax"
              name="fax"
              value={companyData.fax}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="URL"
              name="companyUrl"
              value={companyData.companyUrl}
              onChange={onChange}
            />
            {renderCountryDropdown()}

            {renderVendorOrCustomerForm()}

            <Container
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
              disableGutters
            >
              {/* <ThemeProvider theme={buttonTheme}>
              <PrimaryButton 
                variant="contained" 
                disabled={shouldDisableUpdateButton()}
                onClick={updateCompanyData}
              >
                Update
              </PrimaryButton>
          </ThemeProvider> */}
              <Button
                disabled={shouldDisableUpdateButton()}
                onClick={updateCompanyData}
              >
                Update
              </Button>
            </Container>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default EditCompanyProfile;

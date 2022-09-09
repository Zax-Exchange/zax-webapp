import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";

import React from "react";

import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useGetVendorDetailQuery } from "../../gql/get/vendor/vendor.generated";

import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { Country } from "../../Login/customer/CustomerSignup";
import { countries } from "../../constants/countries";
import FullScreenLoading from "../../Utils/Loading";
import { validate } from "email-validator";
import { useUpdateVendorInfoMutation } from "../../gql/update/vendor/vendor.generated";
import { UpdateVendorInfoInput } from "../../../generated/graphql";
import { PRODUCT_NAMES } from "../../constants/products";

const EditVendorProfile = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getVendorDetailData,
    loading: getVendorDetailLoading,
    error: getVendorDetailError,
    refetch: getVendorDetailRefetch,
  } = useGetVendorDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [
    updateVendorData,
    {
      error: updateVendorDataError,
      loading: updateVendorDataLoading,
      data: updateVendorDataData,
    },
  ] = useUpdateVendorInfoMutation();

  const [vendorData, setVendorData] = useState<UpdateVendorInfoInput | null>(
    null
  );
  const [product, setProduct] = useState("");

  useEffect(() => {
    if (getVendorDetailData && getVendorDetailData.getVendorDetail) {
      const {
        name,
        contactEmail,
        phone,
        logo,
        country,
        companyUrl,
        fax,
        leadTime,
        locations,
        products,
        moq,
      } = getVendorDetailData.getVendorDetail;
      setVendorData({
        companyId: user!.companyId,
        name,
        contactEmail,
        phone,
        logo,
        country,
        companyUrl,
        fax,
        leadTime,
        locations,
        products,
        moq,
      });
    }
  }, [getVendorDetailData]);

  useEffect(() => {
    if (getVendorDetailError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getVendorDetailError]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "phone":
      case "fax":
        isAllowed = isValidInt(val);
        console.log(isAllowed);
        break;
      case "leadTime":
        isAllowed = isValidInt(val);
        val = parseInt(val, 10) || "";
        break;
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setVendorData({
        ...vendorData!,
        [e.target.name]: val,
      });
    }
  };

  const countryOnChange = (v: Country | null) => {
    // v could be null if user clears input field
    const country = v ? v.label : vendorData!.country;
    setVendorData({
      ...vendorData!,
      country,
    });
  };

  const productOnChange = (e: any) => {
    const val = e.target.value || "";

    if (isValidAlphanumeric(val)) {
      setProduct(val);
    }
  };

  const locationOnChange = (locations: { label: string }[]) => {
    const locationLabels = locations.map((l) => l.label);
    setVendorData({
      ...vendorData!,
      locations: locationLabels,
    });
  };

  const addProduct = (product: string[]) => {
    const products = [...product].map((v) => v.trim());
    setVendorData({
      ...vendorData!,
      products,
    });
    setProduct("");
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
        value={countries.find((c) => c.label === vendorData!.country)}
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
            value={vendorData!.country}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  };

  const shouldDisableUpdateButton = () => {
    // common non-required attributes
    const isRequired = (field: string) => {
      switch (field) {
        case "contactEmail":
        case "name":
        case "phone":
        case "country":
        case "products":
        case "locations":
        case "moq":
        case "leadTime":
          return true;
      }
      return false;
    };

    const isValid = (
      field: string,
      fieldValue: boolean | string | number | string[] | undefined | null
    ) => {
      switch (field) {
        case "contactEmail":
          return validate(fieldValue as string);
        case "name":
        case "moq":
        case "phone":
        case "country":
        case "leadTime":
          return !!fieldValue;
        case "products":
        case "locations":
          return (fieldValue as string[]).length;
      }
      return false;
    };

    for (let key in vendorData) {
      const fieldValue = vendorData![key as keyof UpdateVendorInfoInput];
      if (isRequired(key) && !isValid(key, fieldValue)) return true;
    }

    return false;
  };

  const renderVendorUpdateForm = () => {
    const renderProductsDropdown = () => {
      return (
        <Autocomplete
          id="products-select"
          sx={{ width: 400 }}
          options={PRODUCT_NAMES}
          autoHighlight
          inputValue={product}
          onInputChange={productOnChange}
          onChange={(e, v) => addProduct(v)}
          value={vendorData!.products}
          multiple
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Manufacturing products"
              value={product}
              onChange={productOnChange}
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
        for (let compCountry of vendorData!.locations) {
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
          defaultValue={[...getDefaultCompanyLocations()]}
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
          value={vendorData!.leadTime}
          onChange={onChange}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Minimum order quantity"
          name="moq"
          value={vendorData!.moq}
          onChange={onChange}
          helperText="e.g. 5000-10000, 6000-8000"
        />
        {renderProductsDropdown()}
        {renderFactoryLocationDropdown()}
      </>
    );
  };

  const updateCompanyData = async () => {
    try {
      await updateVendorData({
        variables: {
          data: {
            ...vendorData!,
            leadTime: vendorData!.leadTime,
          },
        },
      });
      setSnackbar({
        severity: "success",
        message: "Company profile updated.",
      });
      getVendorDetailRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: "Could not perform action. Please try again later.",
      });
    } finally {
      setSnackbarOpen(true);
    }
  };

  const isLoading = getVendorDetailLoading || updateVendorDataLoading;

  if (getVendorDetailError) return null;

  return (
    <Container>
      {isLoading && <FullScreenLoading />}
      <Typography variant="h6">Edit Company Profile</Typography>

      {vendorData && (
        <>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Name"
              name="name"
              value={vendorData!.name}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Contact Email"
              name="contactEmail"
              value={vendorData!.contactEmail}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="Phone"
              name="phone"
              value={vendorData!.phone}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Fax"
              name="fax"
              value={vendorData!.fax}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="URL"
              name="companyUrl"
              value={vendorData!.companyUrl}
              onChange={onChange}
            />
            {renderCountryDropdown()}

            {renderVendorUpdateForm()}

            <Container
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
              disableGutters
            >
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

export default EditVendorProfile;

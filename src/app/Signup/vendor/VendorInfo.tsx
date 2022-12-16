import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../type/common";
import { countries } from "../../constants/countries";
import { ALL_PRODUCT_NAMES } from "../../constants/products";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { Country } from "../customer/CustomerSignup";
import { MoqDetail, VendorSignupData } from "./VendorSignup";

const VendorInfo = ({
  values,
  setValues,
  onChange,
  setShouldDisableNext,
  setMoqDetail,
  moqDetail,
}: {
  values: VendorSignupData;
  setValues: React.Dispatch<React.SetStateAction<VendorSignupData>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShouldDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
  setMoqDetail: React.Dispatch<React.SetStateAction<MoqDetail>>;
  moqDetail: MoqDetail;
}) => {
  const intl = useIntl();
  const [product, setProduct] = useState("");

  const locationOnChange = (locations: { label: string }[]) => {
    const locationLabels = locations.map((l) => l.label);
    setValues({
      ...values,
      locations: locationLabels,
    });
  };

  // used for controlling products input to now allow characters other than alphanumeric and white space chars
  const productOnChange = (e: any) => {
    const val = e.target.value || "";

    if (isValidAlphanumeric(val)) {
      setProduct(val);
    }
  };

  const addProduct = (value: TranslatableAttribute[]) => {
    const products = [...value].map((v) => v.value);
    setValues({
      ...values,
      products,
    });
    setProduct("");
  };

  const moqOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;
    switch (e.target.name) {
      case "min":
      case "max":
        isAllowed = isValidInt(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setMoqDetail({
        ...moqDetail,
        [e.target.name]: val,
      });
    }
  };

  const renderFactoryLocationDropdown = () => {
    return (
      <Autocomplete
        id="factory-location-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, val) => option.label === val.label}
        onChange={(e, v) => locationOnChange(v)}
        value={values.locations.map((location) => ({ label: location }))}
        multiple
        renderOption={(props, option: any) => (
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

  const renderProductsropdown = () => {
    return (
      <Autocomplete
        id="products-select"
        sx={{ width: 400 }}
        options={ALL_PRODUCT_NAMES}
        getOptionLabel={(option) => intl.formatMessage({ id: option.labelId })}
        autoHighlight
        inputValue={product}
        onChange={(e, v) => addProduct(v)}
        disableCloseOnSelect
        multiple
        renderInput={(params) => (
          <TextField
            {...params}
            label="Manufacturing products"
            value={product}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            helperText={intl.formatMessage({
              id: "app.signup.vendorInfo.products.helperText",
            })}
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

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        {intl.formatMessage({ id: "app.signup.vendorInfo.pageTitle" })}
      </Typography>
      <Stack spacing={3} textAlign="right">
        <TextField
          label={intl.formatMessage({ id: "app.vendor.attribute.leadTime" })}
          type="text"
          placeholder={intl.formatMessage({
            id: "app.signup.vendorInfo.leadTime.placeholder",
          })}
          name="leadTime"
          value={values.leadTime}
          onChange={onChange}
        ></TextField>

        <Box display="flex">
          <TextField
            sx={{ mr: 2, flexBasis: "35%" }}
            label={intl.formatMessage({ id: "app.vendor.attribute.moq.min" })}
            name="min"
            value={moqDetail.min}
            onChange={moqOnChange}
            helperText="e.g. 5000"
          ></TextField>
          <TextField
            sx={{ flexBasis: "35%" }}
            label={intl.formatMessage({ id: "app.vendor.attribute.moq.max" })}
            name="max"
            value={moqDetail.max}
            onChange={moqOnChange}
            helperText="e.g. 10000"
          ></TextField>
        </Box>

        {renderProductsropdown()}
        {renderFactoryLocationDropdown()}
      </Stack>
    </>
  );
};

export default VendorInfo;

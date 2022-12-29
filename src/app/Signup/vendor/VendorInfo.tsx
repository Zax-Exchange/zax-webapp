import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../type/common";
import { countries } from "../../constants/countries";
import {
  ALL_PRODUCT_NAMES,
  productValueToLabelMap,
} from "../../constants/products";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { Country } from "../customer/CustomerSignup";
import { MoqDetail, VendorSignupData } from "./VendorSignup";

const VendorInfo = ({
  values,
  setValues,
  onChange,
  setShouldDisableNext,
  addProductsAndMoq,
  deleteProductsAndMoq,
}: {
  values: VendorSignupData;
  setValues: React.Dispatch<React.SetStateAction<VendorSignupData>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShouldDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
  addProductsAndMoq: () => void;
  deleteProductsAndMoq: (ind: number) => void;
}) => {
  const intl = useIntl();
  console.log(values.productsAndMoq);
  const locationOnChange = (locations: { label: string }[]) => {
    const locationLabels = locations.map((l) => l.label);
    setValues({
      ...values,
      locations: locationLabels,
    });
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
            label={intl.formatMessage({ id: "app.vendor.attribute.locations" })}
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

  const productMoqOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ind: number
  ) => {
    const val = e.target.value;
    const isAllowed = isValidInt(val);
    if (isAllowed) {
      const prevProductAndMoq = values.productsAndMoq[ind];
      prevProductAndMoq.moq = val;
      const allProductsAndMoq = [...values.productsAndMoq];
      allProductsAndMoq.splice(ind, 1, prevProductAndMoq);
      setValues((prev) => ({
        ...prev,
        productsAndMoq: [...allProductsAndMoq],
      }));
    }
  };

  const renderProductsropdown = (ind: number) => {
    const product = values.productsAndMoq[ind].product;
    return (
      <Autocomplete
        id={`productsAndMoqDropdown-${ind}`}
        sx={{ width: 400 }}
        options={ALL_PRODUCT_NAMES}
        getOptionLabel={(option) => intl.formatMessage({ id: option.labelId })}
        autoHighlight
        value={product ? productValueToLabelMap[product] : null}
        getOptionDisabled={(option) => {
          for (let produtcAndMoq of values.productsAndMoq) {
            if (option.value === produtcAndMoq.product) return true;
          }
          return false;
        }}
        onChange={(e, v) => {
          const productAndMoq = [...values.productsAndMoq][ind];

          if (!v) {
            productAndMoq.product = "";
          } else {
            productAndMoq.product = v.value;
          }
          const allProductsAndMoq = [...values.productsAndMoq];
          allProductsAndMoq.splice(ind, 1, productAndMoq);
          setValues((prev) => ({
            ...prev,
            productsAndMoq: [...allProductsAndMoq],
          }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({ id: "app.vendor.attribute.products" })}
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
        {renderFactoryLocationDropdown()}

        <Box display="flex" flexDirection="column">
          {values.productsAndMoq.map((productAndMoq, i) => {
            return (
              <Box display="flex" mb={5} key={i}>
                <Box mr={2}>{renderProductsropdown(i)}</Box>
                <TextField
                  label={intl.formatMessage({
                    id: "app.vendor.attribute.moq",
                  })}
                  type="text"
                  name="moq"
                  value={productAndMoq.moq}
                  onChange={(e) => productMoqOnChange(e, i)}
                  sx={{ mr: 2 }}
                />
                {i !== 0 && (
                  <IconButton onClick={() => deleteProductsAndMoq(i)}>
                    <Cancel />
                  </IconButton>
                )}
              </Box>
            );
          })}
          {
            <Box display="flex">
              <Button variant="outlined" onClick={addProductsAndMoq}>
                {intl.formatMessage({ id: "app.general.addMore" })}
              </Button>
            </Box>
          }
        </Box>
      </Stack>
    </>
  );
};

export default VendorInfo;

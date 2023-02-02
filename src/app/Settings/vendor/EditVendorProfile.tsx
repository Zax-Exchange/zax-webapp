import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import React from "react";

import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useGetVendorDetailQuery } from "../../gql/get/vendor/vendor.generated";

import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { Country } from "../../Signup/customer/CustomerSignup";
import { countries } from "../../constants/countries";
import FullScreenLoading from "../../Utils/Loading";
import { validate } from "email-validator";
import { useUpdateVendorInfoMutation } from "../../gql/update/vendor/vendor.generated";
import {
  ProductAndMoqInput,
  UpdateVendorInfoInput,
} from "../../../generated/graphql";
import {
  ALL_PRODUCT_NAMES,
  productValueToLabelMap,
} from "../../constants/products";
import { useIntl } from "react-intl";
import { Cancel } from "@mui/icons-material";

/** ADMIN VIEW */
const EditVendorProfile = () => {
  const intl = useIntl();
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
        productsAndMoq,
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
        productsAndMoq: productsAndMoq.map((productAndMoq) => ({
          product: productAndMoq.product,
          moq: productAndMoq.moq,
        })),
      });
    }
  }, [getVendorDetailData]);

  useEffect(() => {
    if (getVendorDetailError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
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

  const productMoqOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ind: number
  ) => {
    if (!vendorData) return;

    const val = e.target.value;
    const isAllowed = isValidInt(val);
    if (isAllowed) {
      const prevProductAndMoq = vendorData.productsAndMoq[ind];
      prevProductAndMoq.moq = val;
      const allProductsAndMoq = [...vendorData.productsAndMoq];
      allProductsAndMoq.splice(ind, 1, prevProductAndMoq);
      setVendorData((prev) => ({
        ...prev!,
        productsAndMoq: [...allProductsAndMoq],
      }));
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

  const locationOnChange = (locations: { label: string }[]) => {
    const locationLabels = locations.map((l) => l.label);
    setVendorData({
      ...vendorData!,
      locations: locationLabels,
    });
  };

  const deleteProductsAndMoq = (ind: number) => {
    setVendorData((prev) => {
      const allProductsAndMoq = [...prev!.productsAndMoq];
      allProductsAndMoq!.splice(ind, 1);
      return {
        ...prev!,
        productsAndMoq: allProductsAndMoq,
      };
    });
  };

  const addProductsAndMoq = () => {
    const prevProductsAndMoq = [...vendorData!.productsAndMoq];
    setVendorData((prev) => {
      return {
        ...prev!,
        productsAndMoq: [
          ...prevProductsAndMoq,
          {
            product: "",
            moq: "",
          },
        ],
      };
    });
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
            required
            {...params}
            label={intl.formatMessage({ id: "app.company.attribute.country" })}
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
    const isRequired = (field: keyof UpdateVendorInfoInput) => {
      switch (field) {
        case "contactEmail":
        case "name":
        case "phone":
        case "country":
        case "locations":
        case "leadTime":
        case "productsAndMoq":
          return true;
      }
      return false;
    };

    const isValid = (
      field: keyof UpdateVendorInfoInput,
      fieldValue:
        | boolean
        | string
        | number
        | string[]
        | ProductAndMoqInput[]
        | undefined
        | null
    ) => {
      switch (field) {
        case "contactEmail":
          return validate(fieldValue as string);
        case "name":
        case "phone":
        case "country":
        case "leadTime":
          return !!fieldValue;
        case "locations":
          return !!(fieldValue as string[]).length;
        case "productsAndMoq":
          return (fieldValue as ProductAndMoqInput[]).every(
            (productAndMoq) => !!productAndMoq.product && !!productAndMoq.moq
          );
      }
      return false;
    };

    for (let key in vendorData) {
      const attr = key as keyof UpdateVendorInfoInput;
      const fieldValue = vendorData![attr];

      if (isRequired(attr) && !isValid(attr, fieldValue)) return true;
    }

    return false;
  };

  const renderVendorUpdateForm = () => {
    if (!vendorData) return null;
    const renderProductsDropdown = (ind: number) => {
      const product = vendorData.productsAndMoq[ind].product;
      return (
        <Autocomplete
          id={`productsAndMoqDropdown-${ind}`}
          sx={{ width: 400 }}
          options={ALL_PRODUCT_NAMES}
          getOptionLabel={(option) =>
            intl.formatMessage({ id: option.labelId })
          }
          autoHighlight
          value={product ? productValueToLabelMap[product] : null}
          getOptionDisabled={(option) => {
            for (let produtcAndMoq of vendorData.productsAndMoq) {
              if (option.value === produtcAndMoq.product) return true;
            }
            return false;
          }}
          onChange={(e, v) => {
            const productAndMoq = [...vendorData.productsAndMoq][ind];

            if (!v) {
              productAndMoq.product = "";
            } else {
              productAndMoq.product = v.value;
            }
            const allProductsAndMoq = [...vendorData.productsAndMoq];
            allProductsAndMoq.splice(ind, 1, productAndMoq);
            setVendorData((prev) => ({
              ...prev!,
              productsAndMoq: [...allProductsAndMoq],
            }));
          }}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              label={intl.formatMessage({
                id: "app.vendor.attribute.products",
              })}
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
              required
              {...params}
              label={intl.formatMessage({
                id: "app.vendor.attribute.locations",
              })}
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
          required
          InputLabelProps={{ shrink: true }}
          label={intl.formatMessage({ id: "app.vendor.attribute.leadTime" })}
          name="leadTime"
          value={vendorData!.leadTime}
          onChange={onChange}
        />
        {renderFactoryLocationDropdown()}
        {vendorData.productsAndMoq.map((productAndMoq, i) => {
          return (
            <Box display="flex" mb={5} key={i}>
              <Box mr={2}>{renderProductsDropdown(i)}</Box>
              <TextField
                required
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
        <Box display="flex">
          <Button variant="outlined" onClick={addProductsAndMoq}>
            {intl.formatMessage({ id: "app.general.addMore" })}
          </Button>
        </Box>
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
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      getVendorDetailRefetch();
    } catch (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
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
      <Typography variant="h6">
        {intl.formatMessage({
          id: "app.settings.companySettings.editCompanyProfile",
        })}
      </Typography>

      {vendorData && (
        <>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.companyName",
              })}
              name="name"
              value={vendorData!.name}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.contactEmail",
              })}
              name="contactEmail"
              value={vendorData!.contactEmail}
              onChange={onChange}
            />
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({ id: "app.company.attribute.phone" })}
              name="phone"
              value={vendorData!.phone}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({ id: "app.company.attribute.fax" })}
              name="fax"
              value={vendorData!.fax}
              onChange={onChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label={intl.formatMessage({
                id: "app.company.attribute.companyUrl",
              })}
              name="companyUrl"
              value={vendorData!.companyUrl}
              onChange={onChange}
            />
            {renderCountryDropdown()}

            {renderVendorUpdateForm()}

            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
              disableGutters
            >
              <Button
                variant="outlined"
                disabled={shouldDisableUpdateButton()}
                onClick={updateCompanyData}
              >
                {intl.formatMessage({ id: "app.general.update" })}
              </Button>
            </Container>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default EditVendorProfile;

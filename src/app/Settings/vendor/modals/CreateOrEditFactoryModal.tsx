import React, { useContext, useEffect, useState } from "react";
import {
  CreateFactoryInput,
  FactoryDetail,
  FactoryProductDetail,
} from "../../../../generated/graphql";
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import { AuthContext } from "../../../../context/AuthContext";
import { isValidInt } from "../../../Utils/inputValidators";
import { Cancel } from "@mui/icons-material";
import { countries } from "../../../constants/countries";
import { Country } from "../../../Signup/customer/CustomerSignup";
import {
  ALL_PRODUCT_NAMES,
  productValueToLabelMap,
} from "../../../constants/products";
import { useCreateFactoryMutation } from "../../../gql/create/vendor/vendor.generated";
import { LoadingButton } from "@mui/lab";
import { useUpdateFactoryMutation } from "../../../gql/update/vendor/vendor.generated";

export const CreateOrEditFactoryModal = ({
  factory,
  closeModal,
  refetchFactories,
}: {
  factory: FactoryDetail | null;
  closeModal: () => void;
  refetchFactories: () => void;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [
    createFactory,
    {
      loading: createFactoryLoading,
      error: createFactoryError,
      data: createFactoryData,
    },
  ] = useCreateFactoryMutation();

  const [data, setData] = useState<FactoryDetail | CreateFactoryInput>(
    factory
      ? factory
      : {
          companyId: user!.companyId,
          location: "",
          factoryProductsDetail: [
            {
              product: "",
              leadTime: "",
              moq: "",
            },
          ],
        }
  );

  const [
    updateFactory,
    {
      loading: updateFactoryLoading,
      data: updateFactoryData,
      error: updateFactoryError,
    },
  ] = useUpdateFactoryMutation();

  useEffect(() => {
    if (createFactoryError || updateFactoryError) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [createFactoryError, updateFactoryError]);

  useEffect(() => {
    if (createFactoryData || updateFactoryData) {
      refetchFactories();
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({ id: "app.general.network.success" }),
      });
      setSnackbarOpen(true);
    }
  }, [createFactoryData, updateFactoryData]);

  const locationOnChange = (location: { label: string } | null) => {
    setData((prev) => ({
      ...prev,
      location: location ? location.label : "",
    }));
  };

  const deleteProductsAndMoq = (ind: number) => {
    setData((prev) => {
      const productsDetail = [...prev!.factoryProductsDetail];
      productsDetail!.splice(ind, 1);
      return {
        ...prev!,
        factoryProductsDetail: productsDetail,
      };
    });
  };

  const addProductsAndMoq = () => {
    const prevProductsDetail = [...data.factoryProductsDetail];
    setData((prev) => {
      return {
        ...prev!,
        factoryProductsDetail: [
          ...prevProductsDetail,
          {
            product: "",
            moq: "",
            leadTime: "",
          },
        ],
      };
    });
  };

  const renderProductsDropdown = (ind: number) => {
    const product = data.factoryProductsDetail[ind].product;
    return (
      <Autocomplete
        id={`productsAndMoqDropdown-${ind}`}
        sx={{ width: 400 }}
        options={ALL_PRODUCT_NAMES}
        getOptionLabel={(option) => intl.formatMessage({ id: option.labelId })}
        autoHighlight
        value={product ? productValueToLabelMap[product] : null}
        getOptionDisabled={(option) => {
          for (let produtcAndMoq of data.factoryProductsDetail) {
            if (option.value === produtcAndMoq.product) return true;
          }
          return false;
        }}
        onChange={(e, v) => {
          const productDetail = {
            ...[...data.factoryProductsDetail][ind],
          };

          if (!v) {
            productDetail.product = "";
          } else {
            productDetail.product = v.value;
          }
          const allProductsAndMoq = [...data.factoryProductsDetail];
          allProductsAndMoq.splice(ind, 1, productDetail);
          setData((prev) => ({
            ...prev!,
            factoryProductsDetail: [...allProductsAndMoq],
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

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        blurOnSelect
        sx={{ width: 300, mt: 2 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e, v) => locationOnChange(v)}
        value={countries.find((c) => c.label === data!.location)}
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
              id: "app.company.attribute.country",
            })}
            name="country"
            value={data!.location}
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
    ind: number,
    name: string
  ) => {
    if (!data) return;

    const val = e.target.value;
    const isAllowed = isValidInt(val);
    if (isAllowed) {
      const productsDetail = data.factoryProductsDetail[ind];
      if (name === "moq") {
        productsDetail.moq = val;
      } else {
        productsDetail.leadTime = val;
      }
      const allProductsAndMoq = [...data.factoryProductsDetail];
      allProductsAndMoq.splice(ind, 1, productsDetail);
      setData((prev) => ({
        ...prev!,
        factoryProductsDetail: [...allProductsAndMoq],
      }));
    }
  };

  const isValid = () => {
    if (
      data.location &&
      data.factoryProductsDetail.length &&
      data.factoryProductsDetail.every(
        (detail) => detail.leadTime && detail.moq && detail.product
      )
    )
      return true;
    return false;
  };

  const createOnClick = async () => {
    await createFactory({
      variables: {
        data: {
          ...(data as CreateFactoryInput),
        },
      },
    });
    closeModal();
  };

  const updateOnClick = async () => {
    await updateFactory({
      variables: {
        data: {
          ...(data as FactoryDetail),
          companyId: user!.companyId,
        },
      },
    });
    closeModal();
  };
  return (
    <>
      <DialogTitle>
        {intl.formatMessage({
          id: "app.settings.companySettings.editFactories",
        })}
      </DialogTitle>
      <DialogContent>
        {renderCountryDropdown()}
        {data.factoryProductsDetail.map((productsDetail, i) => {
          return (
            <Box display="flex" key={i} mt={4}>
              <Box mr={2}>{renderProductsDropdown(i)}</Box>
              <TextField
                required
                label={intl.formatMessage({
                  id: "app.vendor.attribute.moq",
                })}
                type="text"
                name="moq"
                value={productsDetail.moq}
                onChange={(e) => productMoqOnChange(e, i, "moq")}
                sx={{ mr: 2 }}
              />
              <TextField
                required
                label={intl.formatMessage({
                  id: "app.vendor.attribute.leadTime",
                })}
                type="text"
                name="leadTime"
                value={productsDetail.leadTime}
                onChange={(e) => productMoqOnChange(e, i, "leadTime")}
                sx={{ mr: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="caption" color="GrayText">
                        {intl.formatMessage({
                          id: "app.general.weeks",
                        })}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              {i !== 0 && (
                <IconButton onClick={() => deleteProductsAndMoq(i)}>
                  <Cancel />
                </IconButton>
              )}
            </Box>
          );
        })}
        <Box display="flex" mt={5}>
          <Button variant="outlined" onClick={addProductsAndMoq}>
            {intl.formatMessage({ id: "app.general.addMore" })}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mr: 2, mb: 2 }}>
        <Button onClick={closeModal} variant="outlined">
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <LoadingButton
          onClick={(data as FactoryDetail).id ? updateOnClick : createOnClick}
          disabled={!isValid()}
          loading={createFactoryLoading || updateFactoryLoading}
          variant="contained"
        >
          {(data as FactoryDetail).id
            ? intl.formatMessage({ id: "app.general.update" })
            : intl.formatMessage({ id: "app.general.create" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

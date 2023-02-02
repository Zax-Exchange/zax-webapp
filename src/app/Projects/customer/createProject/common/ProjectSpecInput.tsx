import {
  Autocomplete,
  Box,
  InputAdornment,
  ListItem,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectInput,
  ProjectVisibility,
} from "../../../../../generated/graphql";
import ProjectCategoryDropdown from "../../../../Utils/ProjectCategoryDropdown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import GoogleMapAutocomplete from "../../../../Utils/GoogleMapAutocomplete";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../../../Utils/inputValidators";

const ProjectSpecInput = ({
  setProjectData,
  projectData,
  isGuest = false,
}: {
  setProjectData: (value: React.SetStateAction<CreateProjectInput>) => void;
  projectData: CreateProjectInput;
  isGuest?: boolean;
}) => {
  const intl = useIntl();
  const [orderQuantity, setOrderQuantity] = useState("");
  const orderQuantityOnChange = (val: string) => {
    if (isValidInt(val)) {
      setOrderQuantity(val);
    }
  };

  const handleAddressOnChange = (address: string, country: string) => {
    setProjectData({
      ...projectData,
      deliveryAddress: address,
      country,
    });
  };

  const projectInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    let isAllowed = true;

    switch (e.target.name as keyof CreateProjectInput) {
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "orderQuantities":
        isAllowed = isValidInt(val);
        val = parseInt(val, 10);
        break;
      case "targetPrice":
      case "totalWeight":
        isAllowed = isValidFloat(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setProjectData({
        ...projectData,
        [e.target.name]: val,
      });
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        textAlign="left"
        sx={{ "& .MuiListItem-root div": { flexGrow: 2 } }}
      >
        <ListItem>
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.project.attribute.name",
            })}
            onChange={projectInputOnChange}
            name="name"
            value={projectData.name}
          />
        </ListItem>
        <ListItem>
          <ProjectCategoryDropdown
            defaultCategory={projectData.category!}
            parentSetDataCallback={(category: string) => {
              setProjectData((prev) => ({ ...prev, category }));
            }}
            label={intl.formatMessage({
              id: "app.project.attribute.category",
            })}
          />
        </ListItem>
        <ListItem>
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.project.attribute.totalWeight",
            })}
            onChange={projectInputOnChange}
            name="totalWeight"
            value={projectData.totalWeight}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="caption" color="GrayText">
                    {intl.formatMessage({ id: "app.general.unit.g" })}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
        <ListItem>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              disablePast
              label={intl.formatMessage({
                id: "app.project.attribute.deliveryDate",
              })}
              inputFormat="YYYY-MM-DD"
              value={projectData.deliveryDate}
              onChange={(v: any) => {
                if (!v || !v._isValid) return;

                setProjectData({
                  ...projectData,
                  deliveryDate: new Date(v._d).toISOString().split("T")[0],
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="deliveryDate"
                  value={projectData.deliveryDate}
                />
              )}
            />
          </LocalizationProvider>
        </ListItem>

        <ListItem>
          <GoogleMapAutocomplete
            parentSetDataHandler={handleAddressOnChange}
            label={intl.formatMessage({
              id: "app.project.attribute.deliveryAddress",
            })}
            defaultAddress={projectData.deliveryAddress}
          />
        </ListItem>

        <ListItem>
          <TextField
            autoComplete="new-password"
            type="tel"
            label={intl.formatMessage({
              id: "app.project.attribute.targetPrice",
            })}
            onChange={projectInputOnChange}
            name="targetPrice"
            value={projectData.targetPrice || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="caption" color="GrayText">
                    {intl.formatMessage({ id: "app.general.currency.usd" })}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </ListItem>

        <ListItem>
          <Box>
            <Autocomplete
              options={[]}
              freeSolo
              multiple
              value={[...projectData.orderQuantities!]}
              inputValue={orderQuantity}
              onInputChange={(e, v) => orderQuantityOnChange(v)}
              onBlur={() => {
                if (orderQuantity) {
                  setProjectData((prev) => ({
                    ...prev,
                    orderQuantities: [...prev.orderQuantities!, +orderQuantity],
                  }));
                }
                setOrderQuantity("");
              }}
              onChange={(e, v) => {
                if (!v) {
                  setProjectData((prev) => ({
                    ...prev,
                    orderQuantities: [],
                  }));
                } else {
                  setProjectData((prev) => ({
                    ...prev,
                    orderQuantities: v.map((v) => +v),
                  }));
                }
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    autoComplete="new-password"
                    type="tel"
                    label={intl.formatMessage({
                      id: "app.project.attribute.orderQuantities",
                    })}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: 16,
                        top: -5,
                      },
                    }}
                    value={orderQuantity}
                    onChange={(e) => orderQuantityOnChange(e.target.value)}
                  />
                );
              }}
              renderOption={() => null}
            />
          </Box>
        </ListItem>

        {!isGuest && (
          <ListItem>
            <TextField
              select
              id="visibility-select"
              label={intl.formatMessage({
                id: "app.project.attribute.visibility",
              })}
              onChange={(e) => {
                setProjectData((prev) => ({
                  ...prev,
                  visibility: e.target.value as ProjectVisibility,
                }));
              }}
              value={projectData.visibility}
              helperText={intl.formatMessage({
                id: "app.customer.createProject.visibility.tooltip",
              })}
            >
              <MenuItem value={ProjectVisibility.Private}>
                {intl.formatMessage({
                  id: "app.project.attribute.visibility.private",
                })}
              </MenuItem>
              <MenuItem value={ProjectVisibility.Public}>
                {intl.formatMessage({
                  id: "app.project.attribute.visibility.public",
                })}
              </MenuItem>
            </TextField>
          </ListItem>
        )}
      </Stack>
    </>
  );
};

export default ProjectSpecInput;

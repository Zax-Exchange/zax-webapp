import {
  Autocomplete,
  Box,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
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
import { InfoOutlined } from "@mui/icons-material";

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
        isAllowed = val !== " ";
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

  const renderSpecTitle = (title: string) => {
    return <Typography variant="subtitle2">{title}</Typography>;
  };

  const renderTooltip = (title: string) => {
    return (
      <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
        <Tooltip title={title} placement="right">
          <InfoOutlined fontSize="small" color="info" />
        </Tooltip>
      </Box>
    );
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <List>
        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.name",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.name.tooltip",
                })
              )}
            </Box>
            <Box width="100%">
              <TextField
                autoComplete="new-password"
                onChange={projectInputOnChange}
                name="name"
                value={projectData.name}
                fullWidth
              />
            </Box>
          </Box>
        </ListItem>

        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.totalWeight",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.totalWeight.tooltip",
                })
              )}
            </Box>
            <Box>
              <TextField
                autoComplete="new-password"
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
                fullWidth
              />
            </Box>
          </Box>
        </ListItem>
        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.deliveryDate",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.deliveryDate.tooltip",
                })
              )}
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  disablePast
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
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </ListItem>

        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.targetPrice",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.targetPrice.tooltip",
                })
              )}
            </Box>
            <Box>
              <TextField
                autoComplete="new-password"
                type="tel"
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
                fullWidth
              />
            </Box>
          </Box>
        </ListItem>

        {!isGuest && (
          <ListItem>
            <Box>
              <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
                {renderSpecTitle(
                  intl.formatMessage({
                    id: "app.project.attribute.visibility",
                  })
                )}
                {renderTooltip(
                  intl.formatMessage({
                    id: "app.customer.createProject.visibility.tooltip",
                  }) +
                    " " +
                    intl.formatMessage({
                      id: "app.customer.createProject.visibility.helperText",
                    })
                )}
              </Box>
              <Box>
                <TextField
                  select
                  onChange={(e) => {
                    setProjectData((prev) => ({
                      ...prev,
                      visibility: e.target.value as ProjectVisibility,
                    }));
                  }}
                  value={projectData.visibility}
                  // helperText={intl.formatMessage({
                  //   id: "app.customer.createProject.visibility.helperText",
                  // })}
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
              </Box>
            </Box>
          </ListItem>
        )}
      </List>

      <List sx={{ flexBasis: "50%" }}>
        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.category",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.category.tooltip",
                })
              )}
            </Box>
            <Box width="100%">
              <ProjectCategoryDropdown
                defaultCategory={projectData.category!}
                parentSetDataCallback={(category: string) => {
                  setProjectData((prev) => ({ ...prev, category }));
                }}
                width="100%"
              />
            </Box>
          </Box>
        </ListItem>
        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.deliveryAddress",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.deliveryAddress.tooltip",
                })
              )}
            </Box>
            <Box>
              <GoogleMapAutocomplete
                parentSetDataHandler={handleAddressOnChange}
                defaultAddress={projectData.deliveryAddress}
                width="100%"
              />
            </Box>
          </Box>
        </ListItem>
        <ListItem>
          <Box width="100%">
            <Box mb={0.5} sx={{ display: "flex", alignItems: "center" }}>
              {renderSpecTitle(
                intl.formatMessage({
                  id: "app.project.attribute.orderQuantities",
                })
              )}
              {renderTooltip(
                intl.formatMessage({
                  id: "app.customer.createProject.orderQuantities.tooltip",
                })
              )}
            </Box>
            <Box>
              <Autocomplete
                fullWidth
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
                      orderQuantities: [
                        ...prev.orderQuantities!,
                        +orderQuantity,
                      ],
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
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProjectSpecInput;

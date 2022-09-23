import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import GoogleMapAutocomplete from "../../../../Utils/GoogleMapAutocomplete";
import AddCircle from "@mui/icons-material/AddCircle";
import Cancel from "@mui/icons-material/Cancel";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useIntl } from "react-intl";
import {
  isValidAlphanumeric,
  isValidInt,
} from "../../../../Utils/inputValidators";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../../../../../generated/graphql";
import UploadDesign from "../../UploadDesign";

export default function GuidedGeneralSpec({
  projectData,
  setProjectData,
  activeStep,
  setActiveStep,
}: {
  projectData: CreateProjectInput;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) {
  const intl = useIntl();
  const [orderQuantity, setOrderQuantity] = useState("");

  const projectInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "name":
      case "comments":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "targetPrice":
      case "orderQuantities":
        isAllowed = isValidInt(val);
        val = parseInt(val, 10);
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

  const handleAddressOnChange = (address: string) => {
    setProjectData({
      ...projectData,
      deliveryAddress: address,
    });
  };

  const addOrderQuantity = () => {
    setProjectData({
      ...projectData,
      orderQuantities: [
        ...projectData.orderQuantities,
        parseInt(orderQuantity, 10),
      ],
    });
    setOrderQuantity("");
  };

  const removeOrderQuantity = (ind: number) => {
    const orderQuantities = [...projectData.orderQuantities];
    orderQuantities.splice(ind, 1);
    setProjectData({
      ...projectData,
      orderQuantities,
    });
  };

  const orderQuantityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (isValidInt(val)) {
      setOrderQuantity(val);
    }
  };

  // TODO: finish
  const shouldDisableNextButton = () => {
    for (let key in projectData) {
      const attribute = key as keyof CreateProjectInput;
      switch (attribute) {
        case "category":
        case "deliveryAddress":
        case "deliveryDate":
        case "name":
        case "targetPrice":
        case "totalWeight":
          if (!projectData[attribute]) return true;
          break;
        case "orderQuantities":
          if (!projectData.orderQuantities.length) return true;
          break;
      }
    }
    return false;
  };

  const renderCategoryDropdown = () => {};

  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.generalSpec.title",
          })}
        </Typography>
      </Box>
      <Stack
        spacing={2}
        textAlign="left"
        sx={{ "& .MuiListItem-root div": { flexGrow: 2 }, mt: 2, mb: 2 }}
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
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.project.attribute.category",
            })}
            onChange={projectInputOnChange}
            name="category"
            value={projectData.category}
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
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
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
          />
        </ListItem>

        <ListItem>
          <TextField
            autoComplete="new-password"
            type="tel"
            label={intl.formatMessage({
              id: "app.project.attribute.orderQuantities",
            })}
            onChange={orderQuantityOnChange}
            value={orderQuantity}
          />
          <IconButton onClick={addOrderQuantity} disabled={!orderQuantity}>
            <AddCircle />
          </IconButton>
        </ListItem>
        {!!projectData.orderQuantities.length &&
          projectData.orderQuantities.map((quantity, i) => {
            return (
              <ListItem>
                <Typography variant="caption">{quantity}</Typography>
                <IconButton onClick={() => removeOrderQuantity(i)}>
                  <Cancel />
                </IconButton>
              </ListItem>
            );
          })}
        <ListItem>
          <TextField
            autoComplete="new-password"
            multiline
            label={intl.formatMessage({
              id: "app.project.attribute.comments",
            })}
            onChange={projectInputOnChange}
            name="comments"
            value={projectData.comments}
          />
        </ListItem>
      </Stack>
      <Box>
        {/* <Button
          variant="text"
          onClick={() => setActiveStep((step) => step - 1)}
          disabled={activeStep === 0}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button> */}
        <UploadDesign setProjectData={setProjectData} />
        <Button
          variant="contained"
          onClick={() => setActiveStep((step) => step + 1)}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
      </Box>
    </>
  );
}

import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
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
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { useIntl } from "react-intl";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../../../Utils/inputValidators";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../../../../../generated/graphql";
import UploadDesign from "../../UploadDesign";
import ProjectCategoryDropdown from "../../../../Utils/ProjectCategoryDropdown";
import ProjectSpecInput from "../common/ProjectSpecInput";

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
    const attr = e.target.name as keyof CreateProjectInput;

    switch (attr) {
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
        [attr]: val,
      });
    }
  };

  const handleAddressOnChange = (address: string, country: string) => {
    setProjectData({
      ...projectData,
      deliveryAddress: address,
      country,
    });
  };

  const orderQuantityOnChange = (val: string) => {
    if (isValidInt(val)) {
      setOrderQuantity(val);
    }
  };

  const shouldDisableNextButton = () => {
    for (let key in projectData) {
      const attr = key as keyof CreateProjectInput;
      if (attr === "components") continue;
      if (Array.isArray(projectData[attr])) {
        if ((projectData[attr] as []).length === 0) return true;
      } else if (!(projectData[attr] as string).length) {
        return true;
      }
    }

    if (
      isNaN(parseFloat(projectData.totalWeight!)) ||
      parseFloat(projectData.totalWeight!) === 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Box mb={1.5}>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.generalSpec.title",
          })}
        </Typography>
      </Box>
      <ProjectSpecInput
        setProjectData={setProjectData}
        projectData={projectData}
      />
      <Box>
        {/* <Button
          variant="text"
          onClick={() => setActiveStep((step) => step - 1)}
          disabled={activeStep === 0}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button> */}

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

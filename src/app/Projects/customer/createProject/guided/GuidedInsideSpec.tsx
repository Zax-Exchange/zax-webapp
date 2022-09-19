import {
  Autocomplete,
  Box,
  Button,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
} from "../../../../../generated/graphql";
import {
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";

const GuidedInsideSpec = ({
  projectData,
  setProjectData,
  setActiveStep,
  activeStep,
}: {
  projectData: CreateProjectInput;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>(
      {} as CreateProjectComponentSpecInput
    );

  const [
    shouldDisplayPostProcessDropdown,
    setShouldDisplayPostProcessDropdown,
  ] = useState(false);

  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "dimension":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setComponentSpec({
        ...componentSpec,
        [e.target.name]: e.target.value,
      });
    }
  };

  const renderBoxTypeDropdown = () => {
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_INSIDE_PRODUCTS}
        autoHighlight
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec,
                productName: "",
              };
            }
            if (v.value === componentSpec.productName) {
              return spec;
            } else {
              return {
                ...spec,
                productName: v.value,
              };
            }
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.customer.createProject.guidedCreate.tray",
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

  const getPostProcessOptions = () => {
    if (
      componentSpec.productName === PRODUCT_NAME_CORRUGATE_TRAY.value ||
      componentSpec.productName === PRODUCT_NAME_PAPER_TRAY.value
    ) {
      return GUIDED_PROJECT_ALL_POST_PROCESS;
    }
    return GUIDED_PROJECT_ALL_POST_PROCESS;
  };
  const renderPostProcessDropdown = () => {
    const renderPostProcess = () => {
      return (
        <Autocomplete
          sx={{ width: 200 }}
          options={getPostProcessOptions()}
          autoHighlight
          onChange={(e, v) => {
            setComponentSpec((spec) => {
              if (!v) {
                return {
                  ...spec,
                  postProcess: undefined,
                };
              }
              // only if user selects the same postProcess do we do nothing.
              if (
                componentSpec.postProcess &&
                componentSpec.postProcess.length
              ) {
                if (v.value === componentSpec.postProcess[0]) {
                  return spec;
                }
              }
              return {
                ...spec,
                postProcess: [v.value],
              };
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={intl.formatMessage({
                id: "app.component.attribute.postProcess",
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

    if (!shouldDisplayPostProcessDropdown) {
      return (
        <Button
          onClick={() => setShouldDisplayPostProcessDropdown(true)}
          variant="text"
        >
          {intl.formatMessage({
            id: "app.component.postProcess.add",
          })}
        </Button>
      );
    }

    return (
      <Box display="flex">
        {renderPostProcess()}
        <Button
          onClick={() => {
            setComponentSpec((spec) => ({
              ...spec,
              postProcess: undefined,
            }));
            setShouldDisplayPostProcessDropdown(false);
          }}
          variant="text"
        >
          {intl.formatMessage({
            id: "app.general.cancel",
          })}
        </Button>
      </Box>
    );
  };

  const shouldDisableNextButton = () => {
    return false;
  };

  const handleNext = () => {
    const compData = {
      name: componentSpec.productName,
      componentSpec,
    };

    setProjectData((prev) => ({
      ...prev,
      components: [...prev.components, compData],
    }));
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setProjectData((prev) => {
      // If there are 2 components that means user coming from review page, and trying to go back even more.
      // In that case we should remove the current last component so we don't add more than two if user decides to
      // come back again and add component
      if (prev.components.length === 2) {
        const prevComponents = [...prev.components];
        prevComponents.pop();
        return {
          ...prev,
          components: prevComponents,
        };
      }
      return prev;
    });
    setActiveStep((step) => step - 1);
  };

  // If user chooses no tray option, we skip
  const skipToNext = () => {
    setActiveStep((step) => step + 1);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.insideSpec.title",
          })}
        </Typography>
      </Box>
      <Stack>
        <ListItem>{renderBoxTypeDropdown()}</ListItem>
        <ListItem>
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.component.attribute.dimension",
            })}
            onChange={componentSpecOnChange}
            name="dimension"
            value={componentSpec.dimension}
          />
        </ListItem>
        <ListItem>
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.component.attribute.color",
            })}
            onChange={componentSpecOnChange}
            name="color"
            value={componentSpec.color}
          />
        </ListItem>
        <ListItem>{renderPostProcessDropdown()}</ListItem>
      </Stack>
      <Box>
        <Button variant="text" onClick={handleBack}>
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button variant="text" onClick={skipToNext}>
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.noTray",
          })}
        </Button>
        <Button
          variant="text"
          onClick={handleNext}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
      </Box>
    </>
  );
};

export default GuidedInsideSpec;

import Add from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
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
  GUIDED_PROJECT_FINISH,
  GUIDED_PROJECT_OUTSIDE_PRODUCTS,
  GUIDED_PROJECT_ALL_POST_PROCESS,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";

const GuidedOutsideSpec = ({
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
        options={GUIDED_PROJECT_OUTSIDE_PRODUCTS}
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
              id: "app.customer.createProject.guidedCreate.boxType",
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

  const renderBoxStyleDropdown = () => {
    return "box style";
  };

  const renderPostProcessDropdown = () => {
    const renderPostProcess = () => {
      return (
        <Autocomplete
          sx={{ width: 200 }}
          options={GUIDED_PROJECT_ALL_POST_PROCESS}
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

  const renderFinishDropdown = () => {
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_FINISH}
        autoHighlight
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec,
                finish: undefined,
              };
            }
            if (v.value === componentSpec.finish) {
              return spec;
            } else {
              return {
                ...spec,
                finish: v.value,
              };
            }
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.customer.createProject.guidedCreate.finish",
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

  const shouldDisableNextButton = () => {
    return false;
  };

  // Go to next page and add current component to projectData
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

  // Go back to previous page and empty components array
  const handleBack = () => {
    // Since there can only be at most 1 component stored in projectData when user tries to click back button, we can just empty the whole array.
    setProjectData((prev) => ({
      ...prev,
      components: [],
    }));
    setActiveStep((step) => step - 1);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.outsideSpec.title",
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
        <ListItem>{renderBoxStyleDropdown()}</ListItem>
        <ListItem>{renderFinishDropdown()}</ListItem>
        <ListItem>{renderPostProcessDropdown()}</ListItem>
      </Stack>
      <Box>
        <Button variant="text" onClick={handleBack} disabled={activeStep === 0}>
          {intl.formatMessage({ id: "app.general.back" })}
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

export default GuidedOutsideSpec;

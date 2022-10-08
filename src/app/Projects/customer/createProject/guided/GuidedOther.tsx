import {
  Autocomplete,
  Box,
  Button,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
} from "../../../../../generated/graphql";
import {
  BOOKLET_STYLES,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  GUIDED_PROJECT_OTHER_PRODUCTS,
  productValueToLabelMap,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";

const GuidedOther = ({
  isRequired,
  componentData,
  setComponentData,
  setActiveStep,
  activeStep,
}: {
  // If there are no outerBox spec and insideTray spec added, this one is required
  isRequired: boolean;
  componentData: CreateProjectComponentInput | null;
  setComponentData: (data: CreateProjectComponentInput | null) => void;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>({
      productName: "",
      dimension: "",
      style: "",
      postProcess: [],
    } as CreateProjectComponentSpecInput);

  useEffect(() => {
    if (componentData) {
      setComponentSpec(componentData.componentSpec);
    }
  }, [componentData]);
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

  const renderProductsDropdown = () => {
    const getDefaultProduct = () => {
      if (componentSpec.productName) {
        return productValueToLabelMap[componentSpec.productName];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_OTHER_PRODUCTS}
        autoHighlight
        value={getDefaultProduct()}
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                productName: "",
                dimension: "",
                style: "",
                postProcess: [],
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
              id: "app.customer.createProject.guidedCreate.otherPrintingAndPackaging",
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
    const getDefaultPostProcess = () => {
      if (componentSpec.postProcess) {
        const postProcess = componentSpec.postProcess[0];
        return productValueToLabelMap[postProcess];
      }
      return null;
    };
    const renderPostProcess = () => {
      return (
        <Autocomplete
          sx={{ width: 200 }}
          options={getPostProcessOptions()}
          autoHighlight
          value={getDefaultPostProcess()}
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

    if (
      !shouldDisplayPostProcessDropdown &&
      !componentSpec.postProcess?.length
    ) {
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

  // Only render if user selects booklet
  const renderStyleDropdown = () => {
    if (componentSpec.productName === PRODUCT_NAME_BOOKLET.value) {
      const getBookletStyle = () => {
        if (componentSpec.style) {
          return productValueToLabelMap[componentSpec.style];
        }
        return null;
      };
      return (
        <ListItem>
          <Autocomplete
            sx={{ width: 200 }}
            options={BOOKLET_STYLES}
            autoHighlight
            value={getBookletStyle()}
            onChange={(e, v) => {
              setComponentSpec((spec) => {
                if (!v) {
                  return {
                    ...spec,
                    style: "",
                  };
                }
                if (v.value === componentSpec.style) {
                  return spec;
                } else {
                  return {
                    ...spec,
                    style: v.value,
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
        </ListItem>
      );
    }
    return null;
  };

  const shouldDisableNextButton = () => {
    for (let key in componentSpec) {
      const attribute = key as keyof CreateProjectComponentSpecInput;

      // These four are required for outside spec
      switch (attribute) {
        case "productName":
        case "dimension":
        case "color":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  const handleNext = () => {
    const compData = {
      name: "Other",
      componentSpec,
    };

    setComponentData(compData);
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  // If user chooses no tray option, we skip
  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.other.title",
          })}
        </Typography>
      </Box>
      <Stack mt={2} mb={2} spacing={2}>
        <ListItem>{renderProductsDropdown()}</ListItem>
        {renderStyleDropdown()}
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
        <Button variant="text" onClick={handleBack} style={{ marginRight: 8 }}>
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button
          variant="text"
          onClick={skipToNext}
          style={{ marginRight: 8 }}
          disabled={isRequired}
        >
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.skip",
          })}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
      </Box>
    </>
  );
};

export default GuidedOther;

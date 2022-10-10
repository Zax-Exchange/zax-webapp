import Add from "@mui/icons-material/Add";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
  Link,
  List,
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
  ProjectDesign,
} from "../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../type/common";
import {
  GUIDED_PROJECT_FINISH,
  GUIDED_PROJECT_OUTSIDE_PRODUCTS,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  productValueToLabelMap,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import UploadDesign from "../../UploadDesign";
import { GuidedCreateSetComponentData } from "./GuidedCreateProject";
import GuidedCreateBoxStyleSelection from "./modals/GuidedCreateBoxStyleSelection";

const GuidedOutsideSpec = ({
  setComponentData,
  setProjectData,
  setComponentDesigns,
  setActiveStep,
  componentData,
  componentDesigns,
  activeStep,
}: {
  setComponentData: GuidedCreateSetComponentData;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  setComponentDesigns: (data: ProjectDesign | null) => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  componentData: CreateProjectComponentInput | null;
  componentDesigns: ProjectDesign[] | null;
  activeStep: number;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>({
      productName: "",
      dimension: "",
      boxStyle: "",
      postProcess: [],
    } as CreateProjectComponentSpecInput);
  const [boxStyleModalOpen, setBoxStyleModalOpen] = useState(false);

  const [selectedPostProcess, setSelectedPostProcess] = useState<string | null>(
    null
  );

  // inject existing comp data if there is any
  useEffect(() => {
    // checking for componentSpec too here since user could upload files first and componentData
    // only has designIds array
    if (componentData && componentData.componentSpec) {
      setComponentSpec(componentData.componentSpec);
    }
  }, [componentData]);

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

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
      setComponentSpec((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const renderBoxTypeDropdown = () => {
    const getDefaultBoxType = () => {
      if (componentSpec.productName) {
        return productValueToLabelMap[componentSpec.productName];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_OUTSIDE_PRODUCTS}
        autoHighlight
        value={getDefaultBoxType()}
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec,
                productName: "",
                boxStyle: "",
              };
            }
            if (v.value === componentSpec.productName) {
              return spec;
            } else {
              return {
                ...spec,
                boxStyle: "",
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

  // TODO: change .value to .label
  const renderBoxStyle = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle2">
          {intl.formatMessage({ id: "app.component.attribute.boxStyle" })}
        </Typography>
        <Typography variant="caption">
          {componentSpec.boxStyle
            ? productValueToLabelMap[componentSpec.boxStyle].value
            : "Please select a boxy style"}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setBoxStyleModalOpen(true)}
          disabled={!componentSpec.productName}
        >
          {intl.formatMessage({
            id: "app.customer.createProject.selectBoxStyle",
          })}
        </Button>
      </Box>
    );
  };

  const renderPostProcessDropdown = () => {
    return (
      <Box display="flex">
        <Autocomplete
          sx={{ width: 200 }}
          options={GUIDED_PROJECT_ALL_POST_PROCESS}
          autoHighlight
          multiple
          value={GUIDED_PROJECT_ALL_POST_PROCESS.filter((p) => {
            return componentSpec.postProcess?.includes(p.value);
          })}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") {
              return option.value === value;
            }
            return option.value === value.value;
          }}
          onChange={(e, v) => {
            setComponentSpec((prev) => ({
              ...prev,
              postProcess: v.map((p) => p.value),
            }));
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
      </Box>
    );
  };

  // Not needed right now.
  const renderFinishDropdown = () => {
    const getDefaultFinish = () => {
      if (componentSpec.finish) {
        return productValueToLabelMap[componentSpec.finish];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_FINISH}
        autoHighlight
        value={getDefaultFinish()}
        onChange={(e, v) => {
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec,
                finish: undefined,
              };
            }

            return {
              ...spec,
              finish: v.value,
            };
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
    let res = false;
    for (let key in componentSpec) {
      const attribute = key as keyof CreateProjectComponentSpecInput;

      // These three are required
      switch (attribute) {
        case "productName":
        case "dimension":
        case "boxStyle":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  const saveComponentData = () => {
    const compData = {
      name: "Outer Box",
      designIds: componentDesigns?.map((d) => d.designId),
      componentSpec,
    } as CreateProjectComponentInput;
    setComponentData(compData);
  };
  // Go to next page and add/update current component to projectData
  const handleNext = () => {
    saveComponentData();
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    saveComponentData();
    setActiveStep((step) => step - 1);
  };

  // Go to next page and empty out all outerBox related data
  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
    if (componentDesigns && componentDesigns.length) {
      Promise.all(
        componentDesigns.map((design) => {
          return deleteProjectDesign({
            variables: {
              data: {
                designId: design.designId,
              },
            },
          });
        })
      );
      setComponentDesigns(null);
    }
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
      <Box display="flex" flexDirection="row">
        <Stack mt={2} mb={2} spacing={2}>
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
          <ListItem>{renderBoxStyle()}</ListItem>
          <ListItem>{renderPostProcessDropdown()}</ListItem>
          {!!componentDesigns && (
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.component.attribute.designs",
                })}
              </Typography>
              {componentDesigns.map((file) => {
                return (
                  <Link href={file.url} target="_blank" rel="noopener">
                    {file.filename}
                  </Link>
                );
              })}
            </ListItem>
          )}
        </Stack>
      </Box>
      <Box>
        <UploadDesign
          setComponentData={setComponentData}
          parentSetDesigns={[setComponentDesigns]}
        />
        <Button
          variant="text"
          onClick={handleBack}
          disabled={activeStep === 0}
          style={{ marginRight: 8 }}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button variant="text" onClick={skipToNext} style={{ marginRight: 8 }}>
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
      <Dialog
        open={boxStyleModalOpen}
        onClose={() => setBoxStyleModalOpen(false)}
        maxWidth="md"
      >
        <GuidedCreateBoxStyleSelection
          productName={componentSpec.productName}
          setComponentSpec={setComponentSpec}
          setBoxStyleModalOpen={setBoxStyleModalOpen}
        />
      </Dialog>
    </>
  );
};

export default GuidedOutsideSpec;

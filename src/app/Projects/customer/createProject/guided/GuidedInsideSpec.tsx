import {
  Autocomplete,
  Box,
  Button,
  Link,
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
import {
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  GUIDED_PROJECT_PAPER_POST_PROCESS,
  productValueToLabelMap,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import {
  isValidAlphanumeric,
  isValidFloat,
} from "../../../../Utils/inputValidators";
import UploadDesign from "../../UploadDesign";
import DimensionsInput from "../common/DimensionsInput";
import { GuidedCreateSetComponentData } from "./GuidedCreateProject";

const GuidedInsideSpec = ({
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
      color: "",
      postProcess: [],
    } as CreateProjectComponentSpecInput);

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  const [
    shouldDisplayPostProcessDropdown,
    setShouldDisplayPostProcessDropdown,
  ] = useState(false);

  useEffect(() => {
    if (componentData && componentData.componentSpec) {
      setComponentSpec(componentData.componentSpec);
    }
  }, [componentData]);

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

  const renderInsideTrayDropdown = () => {
    const getDefaultInsideTray = () => {
      if (componentSpec.productName) {
        return productValueToLabelMap[componentSpec.productName];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_INSIDE_PRODUCTS}
        autoHighlight
        value={getDefaultInsideTray()}
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

  const shouldDisableNextButton = () => {
    let res = false;
    if (
      !componentSpec.dimension.x ||
      !componentSpec.dimension.y ||
      !componentSpec.dimension.z
    )
      return true;

    for (let key in componentSpec) {
      const attribute = key as keyof CreateProjectComponentSpecInput;

      // These four are required for outside spec
      switch (attribute) {
        case "productName":
        case "color":
          if (!componentSpec[attribute]) return true;
      }
    }

    return false;
  };

  const saveComponentData = () => {
    const compData = {
      name: "Inner Tray",
      designIds: componentDesigns?.map((d) => d.designId),
      componentSpec,
    } as CreateProjectComponentInput;

    setComponentData(compData);
  };

  const handleNext = () => {
    saveComponentData();
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    saveComponentData();
    setActiveStep((step) => step - 1);
  };

  // skip and set comp data to null
  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
    if (componentDesigns) {
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
            id: "app.customer.createProject.guidedCreate.insideSpec.title",
          })}
        </Typography>
      </Box>
      <Stack mt={2} mb={2} spacing={2}>
        <ListItem>{renderInsideTrayDropdown()}</ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {intl.formatMessage({
                id: "app.component.attribute.dimension",
              })}
            </Typography>
            <DimensionsInput
              componentSpec={componentSpec}
              setComponentSpec={setComponentSpec}
            />
          </Box>
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
      <Box>
        <UploadDesign
          setComponentData={setComponentData}
          parentSetDesigns={[setComponentDesigns]}
        />
        <Button variant="text" onClick={handleBack} style={{ marginRight: 8 }}>
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
    </>
  );
};

export default GuidedInsideSpec;

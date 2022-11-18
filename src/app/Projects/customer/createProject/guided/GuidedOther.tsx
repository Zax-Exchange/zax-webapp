import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProjectDesign,
} from "../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../type/common";
import {
  BOOKLET_STYLES,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  GUIDED_PROJECT_OTHER_PRODUCTS,
  productValueToLabelMap,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_STICKER,
  STICKER_PURPOSES,
  STICKER_SHAPES,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import {
  isValidAlphanumeric,
  isValidFloat,
} from "../../../../Utils/inputValidators";
import UploadDesign from "../../UploadDesign";
import DimensionsInput from "../common/DimensionsInput";
import IncludeArtworkInQuoteDropdown from "../common/IncludeArtworkInQuoteDropdown";
import { GuidedCreateSetComponentData } from "./GuidedCreateProject";
import GuidedOtherSubSection from "./subsections/GuidedOtherSubSection";

const GuidedOther = ({
  setActiveStep,
  setAdditionalComponents,
  setAdditionalComponentsDesigns,
  deleteAdditionalComponentsDesigns,
  additionalComponents,
  additionalComponentsDesigns,
  isRequired,
  activeStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setAdditionalComponents: React.Dispatch<
    React.SetStateAction<CreateProjectComponentInput[]>
  >;
  setAdditionalComponentsDesigns: React.Dispatch<
    React.SetStateAction<ProjectDesign[][]>
  >;
  deleteAdditionalComponentsDesigns: (
    componentInd: number,
    designInd: number
  ) => void;
  additionalComponentsDesigns: ProjectDesign[][];
  additionalComponents: CreateProjectComponentInput[];
  isRequired: boolean; // If there are no outerBox and insideTray specs added, this one is required
  activeStep: number;
}) => {
  const intl = useIntl();

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  const shouldDisableNextButton = () => {
    // no outer box and inner tray and no additional components added
    if (!additionalComponents.length) return true;

    for (let comp of additionalComponents) {
      // empty component data
      if (!Object.keys(comp).length) return true;

      // empty component spec data
      if (!Object.keys(comp.componentSpec).length) return true;

      if (comp.componentSpec.productName === PRODUCT_NAME_BOOKLET.value) {
        if (!comp.componentSpec.numberOfPages) return true;
        if (!comp.componentSpec.style) return true;
        if (!comp.componentSpec.dimension.x || !comp.componentSpec.dimension.y)
          return true;
      }

      if (comp.componentSpec.productName === PRODUCT_NAME_STICKER.value) {
        if (!comp.componentSpec.purpose) return true;
        if (!comp.componentSpec.shape) return true;
        if (!comp.componentSpec.dimension.x || !comp.componentSpec.dimension.y)
          return true;

        if (!comp.designIds || !comp.designIds.length) {
          // no designs but chose to include artworks

          if (comp.componentSpec.includeArtworkInQuote) return true;
        }
      }

      if (comp.componentSpec.productName === PRODUCT_NAME_SLEEVE.value) {
        if (
          !comp.componentSpec.dimension.x ||
          !comp.componentSpec.dimension.y ||
          !comp.componentSpec.dimension.z
        )
          return true;

        if (!comp.designIds || !comp.designIds.length) {
          // no designs but chose to include artworks

          if (comp.componentSpec.includeArtworkInQuote) return true;
        }
      }
    }

    return false;
  };

  const addComponent = () => {
    setAdditionalComponents((prev) => [
      ...prev,
      {} as CreateProjectComponentInput,
    ]);
    setAdditionalComponentsDesigns((prev) => [...prev, []]);
  };

  const deleteComponentDesigns = (compInd: number) => {
    const componentDesigns = additionalComponentsDesigns[compInd];

    if (componentDesigns) {
      Promise.all(
        componentDesigns.map((design) => {
          return deleteProjectDesign({
            variables: {
              data: {
                fileId: design.fileId,
              },
            },
          });
        })
      );
      const allDesigns = [...additionalComponentsDesigns];
      allDesigns.splice(compInd, 1, []);
      setAdditionalComponentsDesigns(allDesigns);
    }
  };
  const handleNext = () => {
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const skipToNext = () => {
    additionalComponents.forEach((comp, i) => {
      deleteComponentDesigns(i);
    });
    setAdditionalComponents([]);
    setAdditionalComponentsDesigns([]);
    setActiveStep((step) => step + 1);
  };

  const deleteDesign = (compInd: number) => async (designInd: number) => {
    try {
      const compDesign = additionalComponentsDesigns[compInd][designInd];
      await deleteProjectDesign({
        variables: {
          data: {
            fileId: compDesign.fileId,
          },
        },
      });

      setAdditionalComponents((prev) => {
        // find current component
        const curComp = [...prev][compInd];

        // find to-be-deleted design index in component.designIds array
        const designInd = curComp.designIds!.findIndex(
          (id) => id === compDesign.fileId
        )!;

        // remove the fileId
        curComp.designIds?.splice(designInd, 1);

        const allAdditionalComps = [...prev];
        allAdditionalComps.splice(compInd, 1, curComp);

        return allAdditionalComps;
      });

      setAdditionalComponentsDesigns((prev) => {
        const curDesigns = [...prev][compInd];
        curDesigns.splice(designInd, 1);
        const allDesigns = [...prev];
        allDesigns.splice(compInd, 1, curDesigns);
        return allDesigns;
      });
    } catch (error) {}
  };

  const setComponentData =
    (compInd: number) =>
    (
      arg:
        | CreateProjectComponentInput
        | ((prev: CreateProjectComponentInput) => CreateProjectComponentInput)
    ) => {
      const allComps = [...additionalComponents];
      if (typeof arg === "function") {
        const currentComp = additionalComponents[compInd];
        allComps.splice(compInd, 1, arg(currentComp));
      } else {
        allComps.splice(compInd, 1, arg);
      }
      setAdditionalComponents(allComps);
    };

  const addComponentDesigns =
    (compInd: number) => (design: ProjectDesign | null) => {
      if (!design) return;

      const compDesigns = [...additionalComponentsDesigns[compInd]];
      compDesigns.push(design);
      const allDesigns = [...additionalComponentsDesigns];
      allDesigns.splice(compInd, 1, compDesigns);

      setAdditionalComponentsDesigns(allDesigns);
    };

  const deleteComponent = (compInd: number) => () => {
    const allAdditionalComps = [...additionalComponents];
    allAdditionalComps.splice(compInd, 1);
    setAdditionalComponents(allAdditionalComps);
    deleteComponentDesigns(compInd);
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
        {additionalComponents.map((comp, i) => {
          return (
            <>
              {i !== 0 && <Divider />}
              <GuidedOtherSubSection
                setComponentData={
                  setComponentData(i) as GuidedCreateSetComponentData
                }
                setComponentDesigns={addComponentDesigns(i)}
                deleteComponentDesign={deleteDesign(i)}
                deleteComponentDesigns={deleteComponentDesigns}
                deleteComponent={deleteComponent(i)}
                componentIndex={i}
                componentDesigns={additionalComponentsDesigns[i]}
                componentData={comp}
              />
            </>
          );
        })}
        {!!additionalComponents.length && <Divider />}
        <ListItem>
          <Button variant="outlined" onClick={addComponent}>
            {additionalComponents.length
              ? intl.formatMessage({ id: "app.general.addMore" })
              : intl.formatMessage({
                  id: "app.customer.createProject.guidedCreate.addProduct",
                })}
          </Button>
        </ListItem>
      </Stack>
      <Box display="flex" mt={5}>
        <Box>
          <Button variant="outlined" onClick={handleBack}>
            {intl.formatMessage({ id: "app.general.back" })}
          </Button>
        </Box>
        <Box ml="auto">
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={shouldDisableNextButton()}
          >
            {intl.formatMessage({ id: "app.general.next" })}
          </Button>
        </Box>
        {!isRequired && (
          <Box mr={-5} ml={1}>
            <Button variant="text" onClick={skipToNext}>
              {intl.formatMessage({
                id: "app.customer.createProject.guidedCreate.skip",
              })}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default GuidedOther;

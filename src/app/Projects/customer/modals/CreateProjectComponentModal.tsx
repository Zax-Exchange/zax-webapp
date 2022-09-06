import {
  Autocomplete,
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
} from "../../../../generated/graphql";
import {
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAMES,
  PRODUCT_NAME_RIGID_BOX,
  RIGID_BOX_MATERIALS,
  RIGID_BOX_POST_PROCESSES,
  RIGID_BOX_MATERIAL_SOURCES,
  RIGID_BOX_FINISHES,
  POST_PROCESS_PRINTING,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_MOLDED_FIBER,
  PRODUCT_NAME_PAPER_TUBE,
} from "../../../constants/products";
import { isValidAlphanumeric } from "../../../Utils/inputValidators";
import CorrugateBoxSubSection from "./productSpecificSubSections/CorrugateBoxSubSection";
import FoldingCartonSubSection from "./productSpecificSubSections/FoldingCartonSubSection";
import MoldedFiberSubSection from "./productSpecificSubSections/MoldedFiberSubSection";
import PaperTubeSubSection from "./productSpecificSubSections/PaperTubeSubSection";
import RigidBoxSubSection from "./productSpecificSubSections/RigidBoxSubSection";
import SleeveSubSection from "./productSpecificSubSections/SleeveSubSection";

// const componentSpecInitialState: CreateProjectComponentSpecInput = {
// productName: "",
// dimension: "",
// thickness: undefined,
// flute: undefined,
// color: undefined,
// manufacturingProcess: undefined,
// material: undefined,
// materialSource: undefined,
// postProcess: undefined,
// finish: undefined,
// outsideMaterial: undefined,
// outsideMaterialSource: undefined,
// outsidePostProcess: undefined,
// outsideFinish: undefined,
// outsideColor: undefined,
// insideMaterial: undefined,
// insideMaterialSource: undefined,
// insidePostProcess: undefined,
// insideFinish: undefined,
// insideColor: undefined,
// };

const CreateProjectComponentModal = ({
  projectData,
  setProjectData,
  setComponentModalOpen,
}: {
  projectData: CreateProjectInput;
  setProjectData: React.Dispatch<React.SetStateAction<CreateProjectInput>>;
  setComponentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [view, setView] = useState("");

  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>(
      {} as CreateProjectComponentSpecInput
    );
  const [componentData, setComponentData] =
    useState<CreateProjectComponentInput>({} as CreateProjectComponentInput);
  console.log(componentSpec);
  useEffect(() => {
    if (componentSpec.productName) {
      setComponentSpec({
        productName: componentSpec.productName,
      } as CreateProjectComponentSpecInput);

      switch (componentSpec.productName) {
        case PRODUCT_NAME_RIGID_BOX:
          setView(PRODUCT_NAME_RIGID_BOX);
          break;
        case PRODUCT_NAME_FOLDING_CARTON:
          setView(PRODUCT_NAME_FOLDING_CARTON);
          break;
        case PRODUCT_NAME_SLEEVE:
          setView(PRODUCT_NAME_SLEEVE);
          break;
        case PRODUCT_NAME_CORRUGATE_BOX:
          setView(PRODUCT_NAME_CORRUGATE_BOX);
          break;
        case PRODUCT_NAME_MOLDED_FIBER:
          setView(PRODUCT_NAME_MOLDED_FIBER);
          break;
        case PRODUCT_NAME_PAPER_TUBE:
          setView(PRODUCT_NAME_PAPER_TUBE);
          break;
        default:
          break;
      }
    }
  }, [componentSpec.productName]);

  const addComponent = () => {
    // construct CreateProjectComponentInput
    const comp: CreateProjectComponentInput = {
      ...componentData,
      componentSpec: {
        ...componentSpec,
      },
    };
    // add component to projectData
    setProjectData({
      ...projectData,
      components: [...projectData.components, comp],
    });

    // close component modal
    setComponentModalOpen(false);
  };

  const componentInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "name":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setComponentData({
        ...componentData,
        [e.target.name]: val,
      });
    }
  };

  // TODO: finish implementation
  // check if component modal add button should be disabled
  const shouldDisableComponentModalAddButton = () => {
    // check each required spec is filled

    const isInvalidComponentSpec = () => {
      if (Object.keys(componentSpec).length === 0) return true;

      for (let key in componentSpec) {
        const val = componentSpec[key as keyof CreateProjectComponentSpecInput];

        if (val !== undefined && val !== null) {
          if (val.length === 0) return true;
        }
      }
      return false;
    };

    if (isInvalidComponentSpec()) return true;

    for (let key in componentData) {
      if (key === "componentSpec") {
        continue;
      }
      if (
        (componentData[key as keyof CreateProjectComponentInput] as string)
          .length === 0
      )
        return true;
    }
    return false;
  };

  const renderAutocompleteDropdown = useCallback(
    (
      options: string[],
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string,
      width: number = 400
    ) => {
      return (
        <Autocomplete
          sx={{ width }}
          options={options}
          autoHighlight
          onChange={(e, v) => {
            setComponentSpec((spec) => ({
              ...spec,
              [componentSpecAttribute]: v ? v : "",
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
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
    },
    []
  );

  const renderProductsDropdown = () => {
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={PRODUCT_NAMES}
        autoHighlight
        onChange={(e, v) => {
          if (!v) return;
          setComponentSpec((spec) => {
            // If product name is same, do nothing.
            if (v === componentSpec.productName) {
              return spec;
            } else {
              // If product name is different, reset everything
              return {
                ...spec,
                productName: v,
              };
            }
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Product Type"
            name=""
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

  return (
    <>
      <DialogContent>
        <Container>
          <Box sx={{ paddingLeft: 2 }}>
            <Typography variant="h6" textAlign="left">
              Configure Project Component
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Stack spacing={1.5}>
              <ListItem>
                <Typography variant="subtitle2">Component Detail</Typography>
              </ListItem>
              <ListItem>
                <TextField
                  autoComplete="new-password"
                  label="Name"
                  onChange={componentInputOnChange}
                  name="name"
                  value={componentData.name}
                />
              </ListItem>
              <ListItem>{renderProductsDropdown()}</ListItem>
            </Stack>

            {view === PRODUCT_NAME_RIGID_BOX && (
              <RigidBoxSubSection
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            )}

            {view === PRODUCT_NAME_FOLDING_CARTON && (
              <FoldingCartonSubSection
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            )}

            {view === PRODUCT_NAME_SLEEVE && (
              <SleeveSubSection
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            )}

            {view === PRODUCT_NAME_CORRUGATE_BOX && (
              <CorrugateBoxSubSection
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            )}

            {view === PRODUCT_NAME_MOLDED_FIBER && (
              <MoldedFiberSubSection
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            )}

            {view === PRODUCT_NAME_PAPER_TUBE && (
              <PaperTubeSubSection
                setComponentSpec={setComponentSpec}
                componentSpec={componentSpec}
              />
            )}
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={addComponent}
          disabled={shouldDisableComponentModalAddButton()}
        >
          ADD
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateProjectComponentModal;

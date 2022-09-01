import {
  Autocomplete,
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
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
} from "../../../generated/graphql";
import {
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAMES,
  PRODUCT_NAME_RIGID_BOX,
  RIGID_BOX_MATERIALS,
  RIGID_BOX_POST_PROCESSES,
  RIGID_BOX_MATERIAL_SOURCES,
} from "../../constants/products";
import { isValidAlphanumeric } from "../../Utils/inputValidators";

const componentSpecInitialState: CreateProjectComponentSpecInput = {
  productName: "",
  dimension: "",
  thickness: undefined,
  outsideMaterial: undefined,
  outsideMaterialSource: undefined,
  outsidePostProcess: undefined,
  outsideFinish: undefined,
  outsideColor: undefined,
};
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
    useState<CreateProjectComponentSpecInput>({
      ...componentSpecInitialState,
    });
  const [componentData, setComponentData] =
    useState<CreateProjectComponentInput>({
      name: "",
      componentSpec,
    });

  useEffect(() => {
    // set component data when component spec changes
    setComponentData({
      ...componentData,
      componentSpec,
    });
  }, [componentSpec]);

  useEffect(() => {
    if (componentSpec.productName) {
      switch (componentSpec.productName) {
        case PRODUCT_NAME_RIGID_BOX:
          setView(PRODUCT_NAME_RIGID_BOX);
          return;
        default:
          return;
      }
    }
  }, [componentSpec.productName]);

  const addComponent = () => {
    // construct CreateProjectComponentInput
    const comp = {
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

    // reset component and component specs
    setComponentData({
      name: "",
      componentSpec,
    });
    setComponentSpec({
      productName: "",
      dimension: "",
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

  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "dimension":
        isAllowed = isValidAlphanumeric(val);
        break;
      case "thickness":
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

  // check if component modal add button should be disabled
  const shouldDisableComponentModalAddButton = () => {
    // check each required spec is filled

    const isInvalidComponentSpec = () => {
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
        // skip componentSpec input check as it is done above
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
    return renderAutocompleteDropdown(
      PRODUCT_NAMES,
      "productName",
      "Product Type"
    );
  };

  const renderRigidBoxView = () => {
    const renderRigixBoxMaterialsDropdown = (
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string
    ) => {
      return renderAutocompleteDropdown(
        RIGID_BOX_MATERIALS,
        componentSpecAttribute,
        label
      );
    };
    const renderRigixBoxMaterialSourcesDropdown = (
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string
    ) => {
      return renderAutocompleteDropdown(
        RIGID_BOX_MATERIAL_SOURCES,
        componentSpecAttribute,
        label
      );
    };

    const renderRigidBoxPostProcessesDropdown = (
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string
    ) => {
      return renderAutocompleteDropdown(
        RIGID_BOX_POST_PROCESSES,
        componentSpecAttribute,
        label
      );
    };
    return (
      <>
        <TextField
          autoComplete="new-password"
          label="Thickness"
          onChange={componentSpecOnChange}
          name="thickness"
          value={componentSpec.thickness}
        />
        {renderRigixBoxMaterialsDropdown("outsideMaterial", "Outside Material")}
        {renderRigixBoxMaterialSourcesDropdown(
          "outsideMaterialSource",
          "Outside Material Source"
        )}
        {renderRigidBoxPostProcessesDropdown(
          "outsidePostProcess",
          "Outside Post Process"
        )}
      </>
    );
  };
  return (
    <>
      <DialogContent>
        <Container>
          <Box>
            <Typography variant="h6" textAlign="left">
              Add Project Component
            </Typography>
          </Box>
          <Stack spacing={2} textAlign="left">
            <TextField
              autoComplete="new-password"
              label="Name"
              onChange={componentInputOnChange}
              name="name"
              value={componentData.name}
            />
            {renderProductsDropdown()}

            <TextField
              autoComplete="new-password"
              label="Dimension"
              onChange={componentSpecOnChange}
              name="dimension"
              value={componentSpec.dimension}
            />

            {view === PRODUCT_NAME_RIGID_BOX && renderRigidBoxView()}
          </Stack>
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

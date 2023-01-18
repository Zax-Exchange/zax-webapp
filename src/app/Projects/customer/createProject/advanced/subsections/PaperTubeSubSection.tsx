import {
  Autocomplete,
  Button,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import {
  CreateProjectComponentSpecInput,
  PostProcessDetail,
  ProductDimensionInput,
} from "../../../../../../generated/graphql";
import {
  FOLDING_CARTON_FINISHES,
  FOLDING_CARTON_MATERIALS,
  FOLDING_CARTON_MATERIAL_SOURCES,
  FOLDING_CARTON_POST_PROCESSES,
  PAPER_TUBE_BOX_STYLES,
  PAPER_TUBE_FINISHES,
  PAPER_TUBE_MATERIALS,
  PAPER_TUBE_MATERIAL_SOURCES,
  PAPER_TUBE_POST_PROCESSES,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
  productValueToLabelMap,
} from "../../../../../constants/products";
import { isValidAlphanumeric } from "../../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../../type/common";
import DimensionsInput from "../../common/DimensionsInput";
import PostProcessInput from "../../common/PostProcessInput";
import PostProcessSection from "./common/PostProcessSection";
import BoxStyleDropdown from "./common/BoxStyleDropdown";
import ThicknessInput from "../../common/ThicknessInput";

type PaperTubePostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const PaperTubeSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();

  // Checks and sets input-able component spec
  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "dimension":
      case "thickness":
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

  // For dropdowns other than post process
  const renderAutocompleteDropdown = useCallback(
    (
      options: TranslatableAttribute[],
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string,
      key: string,
      width: number = 250
    ) => {
      const getDefaultValue = () => {
        if (
          componentSpec[componentSpecAttribute] &&
          typeof componentSpec[componentSpecAttribute] === "string"
        )
          if (
            productValueToLabelMap[
              componentSpec[componentSpecAttribute] as string
            ]
          ) {
            return productValueToLabelMap[
              componentSpec[componentSpecAttribute] as string
            ];
          }
        return null;
      };
      return (
        <Autocomplete
          sx={{ width }}
          options={options}
          getOptionLabel={(option) =>
            intl.formatMessage({ id: option.labelId })
          }
          autoHighlight
          value={getDefaultValue()}
          onChange={(e, v) => {
            setComponentSpec((spec) => ({
              ...spec,
              [componentSpecAttribute]: v ? v.value : "",
            }));
          }}
          renderInput={(params) => (
            <TextField
              key={key}
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
    [componentSpec]
  );

  const renderComponentSpecSection = () => {
    return (
      <>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.generalSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            <BoxStyleDropdown
              componentSpec={componentSpec}
              setComponentSpec={setComponentSpec}
            />
          </ListItem>
          <ListItem>
            <DimensionsInput
              dimension={componentSpec.dimension}
              setDimension={(data: ProductDimensionInput) => {
                setComponentSpec((prev) => ({ ...prev, dimension: data }));
              }}
            />
          </ListItem>
          <ListItem>
            <ThicknessInput
              thickness={componentSpec.thickness || ""}
              setThickness={(thickness) =>
                setComponentSpec((prev) => ({ ...prev, thickness }))
              }
            />
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.outsideSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_MATERIALS,
              "outsideMaterial",
              intl.formatMessage({
                id: "app.component.attribute.outsideMaterial",
              }),
              "paper-tube-outside-material"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_MATERIAL_SOURCES,
              "outsideMaterialSource",
              intl.formatMessage({
                id: "app.component.attribute.outsideMaterialSource",
              }),
              "paper-tube-outside-material-source"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              }),
              "paper-tube-outside-finish"
            )}
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.insideSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="caption">
              Inside specs for Paper Tube will be default.
            </Typography>
          </ListItem>
        </Stack>

        <PostProcessSection
          componentSpec={componentSpec}
          setComponentSpec={setComponentSpec}
          postProcessOptions={PAPER_TUBE_POST_PROCESSES}
        />
      </>
    );
  };

  return renderComponentSpecSection();
};

export default PaperTubeSubSection;

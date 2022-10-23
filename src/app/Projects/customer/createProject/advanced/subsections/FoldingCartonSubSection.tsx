import {
  Autocomplete,
  Button,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import {
  CreateProjectComponentSpecInput,
  PostProcessDetail,
  ProductDimensionInput,
} from "../../../../../../generated/graphql";
import {
  FOLDING_CARTON_BOX_STYLES,
  FOLDING_CARTON_FINISHES,
  FOLDING_CARTON_MATERIALS,
  FOLDING_CARTON_MATERIAL_SOURCES,
  FOLDING_CARTON_POST_PROCESSES,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
  productValueToLabelMap,
} from "../../../../../constants/products";
import {
  isValidAlphanumeric,
  isValidFloat,
} from "../../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../../type/common";
import DimensionsInput from "../../common/DimensionsInput";
import PostProcessInput from "../../common/PostProcessInput";
import PostProcessSection from "./common/PostProcessSection";

type FoldingCartonPostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const FoldingCartonSubSection = ({
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

    switch (e.target.name as keyof CreateProjectComponentSpecInput) {
      case "thickness":
        isAllowed = isValidFloat(val);
      default:
        break;
    }

    if (isAllowed) {
      setComponentSpec({
        ...componentSpec,
        [e.target.name]: val,
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
              {intl.formatMessage({ id: "app.component.generalSpecs" })}
            </Typography>
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
            <TextField
              key="folding-carton-thickness"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.thickness",
              })}
              onChange={componentSpecOnChange}
              name="thickness"
              value={componentSpec.thickness}
            />
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_BOX_STYLES,
              "boxStyle",
              intl.formatMessage({
                id: "app.component.attribute.boxStyle",
              }),
              "folding-carton-box-style"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_MATERIALS,
              "material",
              intl.formatMessage({
                id: "app.component.attribute.material",
              }),
              "folding-carton-material"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_MATERIAL_SOURCES,
              "materialSource",
              "Material Source",
              "folding-carton-material-source"
            )}
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
              FOLDING_CARTON_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              }),
              "folding-carton-outside-finish"
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
            {renderAutocompleteDropdown(
              FOLDING_CARTON_FINISHES,
              "insideFinish",
              intl.formatMessage({
                id: "app.component.attribute.insideFinish",
              }),
              "folding-carton-inside-finish"
            )}
          </ListItem>
        </Stack>

        <PostProcessSection
          componentSpec={componentSpec}
          setComponentSpec={setComponentSpec}
          postProcessOptions={FOLDING_CARTON_POST_PROCESSES}
        />
      </>
    );
  };

  return renderComponentSpecSection();
};

export default FoldingCartonSubSection;

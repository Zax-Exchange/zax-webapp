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
  SLEEVE_FINISHES,
  SLEEVE_MATERIALS,
  SLEEVE_MATERIAL_SOURCES,
  SLEEVE_POST_PROCESSES,
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

type SleevePostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const SleeveSubSection = ({
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
            <DimensionsInput
              dimension={componentSpec.dimension}
              setDimension={(data: ProductDimensionInput) => {
                setComponentSpec((prev) => ({ ...prev, dimension: data }));
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
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
              SLEEVE_MATERIALS,
              "material",
              intl.formatMessage({
                id: "app.component.attribute.material",
              }),
              "sleeve-material"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              SLEEVE_MATERIAL_SOURCES,
              "materialSource",
              intl.formatMessage({
                id: "app.component.attribute.materialSource",
              }),
              "sleeve-material-source"
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
              SLEEVE_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              }),
              "sleeve-outside-finish"
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
              SLEEVE_FINISHES,
              "insideFinish",
              intl.formatMessage({
                id: "app.component.attribute.insideFinish",
              }),
              "sleeve-inside-finish"
            )}
          </ListItem>
        </Stack>
        <PostProcessSection
          componentSpec={componentSpec}
          setComponentSpec={setComponentSpec}
          postProcessOptions={SLEEVE_POST_PROCESSES}
        />
      </>
    );
  };

  return renderComponentSpecSection();
};

export default SleeveSubSection;

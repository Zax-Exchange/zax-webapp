import {
  Autocomplete,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback } from "react";
import {
  CreateProjectComponentSpecInput,
  ProductDimensionInput,
} from "../../../../../../generated/graphql";
import {
  CORRUGATE_BOX_FINISHES,
  CORRUGATE_BOX_FLUTES,
  CORRUGATE_BOX_POST_PROCESSES,
  MATERIAL_DEFAULT_CORRUGATE,
  MATERIAL_SOURCE_OCC,
  productValueToLabelMap,
} from "../../../../../constants/products";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../../type/common";
import DimensionsInput from "../../common/DimensionsInput";
import PostProcessSection from "./common/PostProcessSection";
import BoxStyleDropdown from "./common/BoxStyleDropdown";
import ThicknessInput from "../../common/ThicknessInput";

const CorrugateBoxSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();

  // For dropdowns other than post process
  const renderAutocompleteDropdown = useCallback(
    (
      options: TranslatableAttribute[],
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string,
      key: string,
      helperText: string = "",
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
            if (!v) {
              setComponentSpec((spec) => ({
                ...spec,
                [componentSpecAttribute]: null,
              }));
            } else {
              setComponentSpec((spec) => ({
                ...spec,
                [componentSpecAttribute]: v ? v.value : "",
              }));
            }
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
              helperText={helperText}
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
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_FLUTES,
              "flute",
              intl.formatMessage({
                id: "app.component.attribute.flute",
              }),
              "corrugate-flute"
            )}
          </ListItem>
          <ListItem>
            <TextField
              sx={{ width: 250 }}
              disabled
              key="corrugate-material"
              label={intl.formatMessage({
                id: "app.component.attribute.material",
              })}
              value={intl.formatMessage({
                id: MATERIAL_DEFAULT_CORRUGATE.labelId,
              })}
            />
          </ListItem>
          <ListItem>
            <TextField
              sx={{ width: 250 }}
              disabled
              key="corrugate-material-source"
              label={intl.formatMessage({
                id: "app.component.attribute.materialSource",
              })}
              value={intl.formatMessage({ id: MATERIAL_SOURCE_OCC.labelId })}
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
              CORRUGATE_BOX_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              }),
              "corrugate-outside-finish"
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
              CORRUGATE_BOX_FINISHES,
              "insideFinish",
              intl.formatMessage({
                id: "app.component.attribute.insideFinish",
              }),
              "corrugate-inside-finish"
            )}
          </ListItem>
        </Stack>

        <PostProcessSection
          componentSpec={componentSpec}
          setComponentSpec={setComponentSpec}
          postProcessOptions={CORRUGATE_BOX_POST_PROCESSES}
        />
      </>
    );
  };

  return renderComponentSpecSection();
};

export default CorrugateBoxSubSection;

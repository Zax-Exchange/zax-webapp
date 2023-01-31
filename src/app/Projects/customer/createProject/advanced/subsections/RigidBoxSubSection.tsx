import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
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
  FOLDING_CARTON_BOX_STYLES,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
  productValueToLabelMap,
  RIGID_BOX_BOX_STYLES,
  RIGID_BOX_FINISHES,
  RIGID_BOX_MATERIALS,
  RIGID_BOX_MATERIAL_SOURCES,
  RIGID_BOX_POST_PROCESSES,
} from "../../../../../constants/products";
import MuiStack from "@mui/material/Stack";
import { isValidAlphanumeric } from "../../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../../type/common";
import DimensionsInput from "../../common/DimensionsInput";
import PostProcessInput from "../../common/PostProcessInput";
import PostProcessSection from "./common/PostProcessSection";
import BoxStyleDropdown from "./common/BoxStyleDropdown";
import ThicknessInput from "../../common/ThicknessInput";
import GuidedCreateBoxStyleSelection from "../../guided/modals/GuidedCreateBoxStyleSelection";
import { ChangeCircle } from "@mui/icons-material";

type RigidBoxPostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};

const Stack = styled((props: any) => {
  return <MuiStack {...props} spacing={1.5} />;
})(() => ({}));

const RigidBoxSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();

  const renderAutocompleteDropdown = useCallback(
    (
      options: TranslatableAttribute[],
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string,
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
            setComponentSpec((spec) => ({
              ...spec,
              [componentSpecAttribute]: v ? v.value : "",
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
              helperText={helperText}
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
              RIGID_BOX_MATERIALS,
              "outsideMaterial",
              intl.formatMessage({
                id: "app.component.attribute.outsideMaterial",
              })
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_MATERIAL_SOURCES,
              "outsideMaterialSource",
              intl.formatMessage({
                id: "app.component.attribute.outsideMaterialSource",
              })
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              })
            )}
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.insideSpecs" })}
            </Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_MATERIALS,
              "insideMaterial",
              intl.formatMessage({
                id: "app.component.attribute.insideMaterial",
              })
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_MATERIAL_SOURCES,
              "insideMaterialSource",
              intl.formatMessage({
                id: "app.component.attribute.insideMaterialSource",
              })
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_FINISHES,
              "insideFinish",
              intl.formatMessage({ id: "app.component.attribute.insideFinish" })
            )}
          </ListItem>
        </Stack>
        <PostProcessSection
          componentSpec={componentSpec}
          setComponentSpec={setComponentSpec}
          postProcessOptions={RIGID_BOX_POST_PROCESSES}
        />
      </>
    );
  };

  return renderComponentSpecSection();
};

export default RigidBoxSubSection;

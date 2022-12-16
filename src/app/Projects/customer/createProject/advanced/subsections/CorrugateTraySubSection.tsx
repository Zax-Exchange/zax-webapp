import {
  Autocomplete,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentSpecInput,
  ProductDimensionInput,
} from "../../../../../../generated/graphql";
import {
  CORRUGATE_BOX_FLUTES,
  CORRUGATE_TRAY_POST_PROCESS,
  productValueToLabelMap,
} from "../../../../../constants/products";
import ColorDropdown from "../../common/ColorDropdown";
import DimensionsInput from "../../common/DimensionsInput";
import PostProcessSection from "./common/PostProcessSection";

const CorrugateTraySubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();

  const renderFluteDropdown = () => {
    const getDefaultValue = () => {
      if (componentSpec.flute) {
        return productValueToLabelMap[componentSpec.flute];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={CORRUGATE_BOX_FLUTES}
        getOptionLabel={(option) => intl.formatMessage({ id: option.labelId })}
        autoHighlight
        value={getDefaultValue()}
        onChange={(e, v) => {
          setComponentSpec((spec) => ({
            ...spec,
            flute: v ? v.value : "",
          }));
        }}
        renderInput={(params) => (
          <TextField
            key="corrugate-tray-flute-dropdown"
            {...params}
            label={intl.formatMessage({
              id: "app.component.attribute.flute",
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
        <ListItem>{renderFluteDropdown()}</ListItem>
        <ListItem>
          <ColorDropdown
            setComponentSpec={setComponentSpec}
            componentSpec={componentSpec}
          />
        </ListItem>
      </Stack>
      <PostProcessSection
        componentSpec={componentSpec}
        setComponentSpec={setComponentSpec}
        postProcessOptions={CORRUGATE_TRAY_POST_PROCESS}
      />
    </>
  );
};

export default CorrugateTraySubSection;

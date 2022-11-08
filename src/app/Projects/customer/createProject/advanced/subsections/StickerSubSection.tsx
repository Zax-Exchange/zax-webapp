import {
  Autocomplete,
  Box,
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
import { TranslatableAttribute } from "../../../../../../type/common";
import {
  productValueToLabelMap,
  STICKER_PURPOSES,
  STICKER_SHAPES,
} from "../../../../../constants/products";
import DimensionsInput from "../../common/DimensionsInput";

const StickerSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();

  const renderAutocompleteDropdown = (
    options: TranslatableAttribute[],
    attribute: keyof CreateProjectComponentSpecInput
  ) => {
    const getDefaultValue = () => {
      if (
        componentSpec &&
        componentSpec[attribute] &&
        typeof componentSpec[attribute] === "string"
      ) {
        return productValueToLabelMap[componentSpec[attribute] as string];
      } else {
        return null;
      }
    };

    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={options}
        autoHighlight
        value={getDefaultValue()}
        onChange={(e, v) => {
          const value = v ? v.value : "";

          setComponentSpec((prev) => ({ ...prev, [attribute]: value }));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
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
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.purpose" })}
            </Typography>
            {renderAutocompleteDropdown(STICKER_PURPOSES, "purpose")}
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.shape" })}
            </Typography>
            {renderAutocompleteDropdown(STICKER_SHAPES, "shape")}
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              {intl.formatMessage({ id: "app.component.attribute.dimension" })}
            </Typography>
            <DimensionsInput
              dimension={componentSpec.dimension}
              setDimension={(data: ProductDimensionInput) => {
                setComponentSpec((prev) => ({ ...prev, dimension: data }));
              }}
            />
          </Box>
        </ListItem>
      </Stack>
    </>
  );
};

export default StickerSubSection;

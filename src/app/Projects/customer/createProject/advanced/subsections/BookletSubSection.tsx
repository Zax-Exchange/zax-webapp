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
  BOOKLET_STYLES,
  productValueToLabelMap,
} from "../../../../../constants/products";
import { isValidInt } from "../../../../../Utils/inputValidators";
import DimensionsInput from "../../common/DimensionsInput";

const BookletSubSection = ({
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
    const attr = e.target.name as keyof CreateProjectComponentSpecInput;
    let isAllowed = true;

    switch (attr) {
      case "numberOfPages":
        isAllowed = isValidInt(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setComponentSpec({
        ...componentSpec,
        [attr]: e.target.value,
      });
    }
  };

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
        getOptionLabel={(option) => intl.formatMessage({ id: option.labelId })}
        autoHighlight
        value={getDefaultValue()}
        onChange={(e, v) => {
          const value = v ? v.value : "";

          setComponentSpec((prev) => ({
            ...prev,
            [attribute]: value,
          }));
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
              {intl.formatMessage({ id: "app.component.attribute.style" })}
            </Typography>
            {renderAutocompleteDropdown(BOOKLET_STYLES, "style")}
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.numberOfPages",
              })}
            </Typography>
            <TextField
              autoComplete="new-password"
              onChange={componentSpecOnChange}
              name="numberOfPages"
              value={componentSpec.numberOfPages}
            />
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

export default BookletSubSection;

import { ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentSpecInput,
  ProductDimensionInput,
} from "../../../../../../generated/graphql";
import { CORRUGATE_TRAY_POST_PROCESS } from "../../../../../constants/products";
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

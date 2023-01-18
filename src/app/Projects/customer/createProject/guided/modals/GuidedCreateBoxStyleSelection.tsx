import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  DialogContent,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { CreateProjectComponentSpecInput } from "../../../../../../generated/graphql";
import {
  CORRUGATE_BOX_BOX_STYLES,
  FOLDING_CARTON_BOX_STYLES,
  PAPER_TUBE_BOX_STYLES,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_PAPER_TUBE,
  PRODUCT_NAME_RIGID_BOX,
  RIGID_BOX_BOX_STYLES,
} from "../../../../../constants/products";

const cdn = process.env.REACT_APP_CLOUDFRONT_URL;

const GuidedCreateBoxStyleSelection = ({
  productName,
  setComponentSpec,
  setBoxStyleModalOpen,
}: {
  productName: string;
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  setBoxStyleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();

  const getBoxStyles = () => {
    switch (productName) {
      case PRODUCT_NAME_RIGID_BOX.value:
        return RIGID_BOX_BOX_STYLES;
      case PRODUCT_NAME_FOLDING_CARTON.value:
        return FOLDING_CARTON_BOX_STYLES;
      case PRODUCT_NAME_CORRUGATE_BOX.value:
        return CORRUGATE_BOX_BOX_STYLES;
      case PRODUCT_NAME_PAPER_TUBE.value:
        return PAPER_TUBE_BOX_STYLES;
    }
  };

  const selectBoxStyle = (boxStyle: string) => {
    setComponentSpec((prev) => ({ ...prev, boxStyle }));
    setBoxStyleModalOpen(false);
  };

  return (
    <DialogContent>
      <Box>
        <Stack display="flex">
          {getBoxStyles()?.map((boxStyle) => {
            return (
              <ListItem>
                <Card>
                  <CardActionArea
                    onClick={() => selectBoxStyle(boxStyle.value)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      width="280"
                      src={`${cdn}/box-styles/${boxStyle.code}.png`}
                    />
                    <Typography variant="subtitle2" textAlign="center">
                      {intl.formatMessage({ id: boxStyle.labelId })}
                    </Typography>
                  </CardActionArea>
                </Card>
              </ListItem>
            );
          })}
        </Stack>
      </Box>
    </DialogContent>
  );
};

export default GuidedCreateBoxStyleSelection;

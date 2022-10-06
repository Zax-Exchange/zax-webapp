import {
  Box,
  Card,
  CardActionArea,
  DialogContent,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
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
        <List>
          {getBoxStyles()?.map((boxStyle) => {
            return (
              <ListItem>
                <Card>
                  <CardActionArea
                    onClick={() => selectBoxStyle(boxStyle.value)}
                  >
                    {boxStyle.value}
                  </CardActionArea>
                </Card>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </DialogContent>
  );
};

export default GuidedCreateBoxStyleSelection;

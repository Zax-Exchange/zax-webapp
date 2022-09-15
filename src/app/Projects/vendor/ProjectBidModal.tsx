import { useNavigate } from "react-router-dom";
import ProjectBidComponent from "./ProjectBidComponent";
import { useContext, useState } from "react";
import {
  Container,
  Button,
  Typography,
  List,
  ListItem,
  Grid,
  Link,
  AlertColor,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";

import FullScreenLoading from "../../Utils/Loading";
import React from "react";
import {
  LoggedInUser,
  Project,
  ProjectComponent,
  QuantityPrice,
} from "../../../generated/graphql";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import { useCreateProjectBidMutation } from "../../gql/create/project/project.generated";
import { useGetVendorProjectsQuery } from "../../gql/get/vendor/vendor.generated";
import { QuantityPriceData } from "../../Search/vendor/SearchProjectDetail";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { isValidInt } from "../../Utils/inputValidators";
import { useIntl } from "react-intl";

const ProjectBidModal = ({
  setProjectBidModalOpen,
  component,
  orderQuantities,
  setComponentsQpData,
}: {
  setProjectBidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component: ProjectComponent | null;
  orderQuantities: number[];
  setComponentsQpData: React.Dispatch<
    React.SetStateAction<Record<string, QuantityPriceData[]>>
  >;
}) => {
  const intl = useIntl();
  const [prices, setPrices] = useState([
    ...Array(orderQuantities.length).map(() => ""),
  ]);

  if (!component) return null;

  const pricesOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ind: number
  ) => {
    const val = e.target.value;

    if (!isValidInt(val)) return;

    const curPrices = [...prices];
    curPrices[ind] = val;
    setPrices(curPrices);
  };

  const addBidsOnClick = () => {
    const componentQpData: QuantityPriceData[] = [];
    prices.forEach((price, i) => {
      if (price) {
        componentQpData.push({
          quantity: orderQuantities[i],
          price: parseInt(price, 10),
        });
      }
    });
    setComponentsQpData((prev) => ({
      ...prev,
      [component.id]: componentQpData,
    }));
    setProjectBidModalOpen(false);
  };

  return (
    <Container className="project-bid-container">
      <Box>
        <Typography variant="subtitle1">
          Input Bids For {component.name}
        </Typography>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage({ id: "app.bid.attribute.quantity" })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({ id: "app.bid.attribute.price" })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderQuantities.map((quantity, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => pricesOnChange(e, i)}
                      value={prices[i]}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogActions>
        <Button onClick={() => setProjectBidModalOpen(false)}>Cancel</Button>
        <Button
          onClick={addBidsOnClick}
          variant="outlined"
          disabled={!prices.some((v) => !!v)}
        >
          Add Bids
        </Button>
      </DialogActions>
    </Container>
  );
};

export default ProjectBidModal;

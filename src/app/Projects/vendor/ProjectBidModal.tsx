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
} from "../../../generated/graphql";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import { useCreateProjectBidMutation } from "../../gql/create/project/project.generated";
import { useGetVendorProjectsQuery } from "../../gql/get/vendor/vendor.generated";
import { QuantityPriceData } from "../../Search/vendor/SearchProjectDetail";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ProjectBidModal = ({
  setProjectBidModalOpen,
  component,
  setComponentsQpData,
}: {
  setProjectBidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component: ProjectComponent | null;
  setComponentsQpData: React.Dispatch<
    React.SetStateAction<Record<string, QuantityPriceData[]>>
  >;
}) => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // Note that this is for ONE component (singular) only
  const [componentQpData, setComponentQpData] = useState<QuantityPriceData[]>(
    []
  );

  if (!component) return null;

  const { id, name } = component;

  const handleQpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "quantity") {
      setQuantity(e.target.value);
    } else {
      setPrice(e.target.value);
    }
  };

  const addQp = () => {
    const list = [
      ...componentQpData,
      {
        quantity: parseInt(quantity, 10),
        price: parseInt(price, 10),
      },
    ];
    list.sort((a, b) => a.quantity - b.quantity);
    setComponentQpData(list);
    setQuantity("");
    setPrice("");
  };

  const deleteQp = (i: number) => {
    const list = [...componentQpData];
    list.splice(i, 1);
    list.sort((a, b) => a.quantity - b.quantity);
    setComponentQpData(list);
  };

  const addBidsOnClick = () => {
    setComponentsQpData((prev) => ({
      ...prev,
      [component.id]: componentQpData,
    }));
    setProjectBidModalOpen(false);
  };

  return (
    <Container className="project-bid-container">
      <Box>
        <Typography variant="subtitle1">Add Bids For {name}</Typography>
      </Box>

      <Stack direction="row">
        <ListItem>
          <TextField
            label="Quantity"
            name="quantity"
            autoComplete="new-password"
            onChange={handleQpInput}
            value={quantity}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Price"
            name="price"
            autoComplete="new-password"
            onChange={handleQpInput}
            value={price}
          />
        </ListItem>
        <ListItem sx={{ flexShrink: 2 }}>
          <IconButton onClick={addQp} disabled={!quantity || !price}>
            <AddCircleIcon />
          </IconButton>
        </ListItem>
      </Stack>

      {!!componentQpData.length && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {componentQpData.map((qp, i) => {
                return (
                  <TableRow>
                    <TableCell>{qp.quantity}</TableCell>
                    <TableCell>{qp.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteQp(i)}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <DialogActions>
        <Button onClick={() => setProjectBidModalOpen(false)}>Cancel</Button>
        <Button
          onClick={addBidsOnClick}
          variant="outlined"
          disabled={!componentQpData.length}
        >
          Add Bids
        </Button>
      </DialogActions>
    </Container>
  );
};

export default ProjectBidModal;

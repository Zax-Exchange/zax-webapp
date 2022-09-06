import {
  Box,
  Button,
  Collapse,
  Container,
  DialogActions,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import React from "react";
import {
  ProjectBid,
  ProjectComponent,
  ProjectComponentSpec,
  VendorDetail,
} from "../../../../generated/graphql";

/**
 * Bid modal shown in CustomerProjectDetail
 * @param {*} param0
 * @returns
 */

type ProjectComponentRow = {
  name: string;
  quantity: number;
  price: number;
  projectComponent: ProjectComponent;
  isLast: boolean;
};
const BidComponentRow = ({ row }: { row: ProjectComponentRow }) => {
  const [open, setOpen] = useState(false);
  const renderComponentSpecAccordionDetail = (spec: ProjectComponentSpec) => {
    const {
      productName,
      dimension,
      thickness,
      flute,
      color,
      manufacturingProcess,
      material,
      materialSource,
      postProcess,
      finish,
      outsideMaterial,
      outsideMaterialSource,
      outsidePostProcess,
      outsideFinish,
      outsideColor,
      insideMaterial,
      insideMaterialSource,
      insidePostProcess,
      insideFinish,
      insideColor,
    } = spec;

    const res: JSX.Element[] = [];

    // for (let key in spec) {

    if (productName) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Product</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{productName}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (dimension) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Dimension</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="caption">{dimension}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (thickness) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Thickness</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{thickness}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (flute) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Flute</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{flute}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (color) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{color}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (manufacturingProcess) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Manufacturing Process</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{manufacturingProcess}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (material) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{material}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (materialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{materialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (postProcess && postProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {postProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (finish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{finish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideMaterial) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideMaterialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideMaterialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsidePostProcess && outsidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {outsidePostProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideFinish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideFinish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (outsideColor) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Outside Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{outsideColor}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideMaterial) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Material</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterial}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideMaterialSource) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Material Source</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideMaterialSource}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insidePostProcess && insidePostProcess.length) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Post Process</Typography>
          </TableCell>

          <TableCell>
            <Stack>
              {insidePostProcess.map((process) => {
                return (
                  <ListItem sx={{ padding: 0 }}>
                    <Typography variant="caption">{process}</Typography>
                  </ListItem>
                );
              })}
            </Stack>
          </TableCell>
        </TableRow>
      );
    }

    if (insideFinish) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Finish</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideFinish}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (insideColor) {
      res.push(
        <TableRow>
          <TableCell>
            <Typography variant="subtitle2">Inside Color</Typography>
          </TableCell>

          <TableCell>
            <Typography variant="caption">{insideColor}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <Table size="small">
        <TableBody>{res}</TableBody>
      </Table>
    );
  };

  return (
    <>
      <TableRow key={row.name} sx={{ "& > *": { borderBottom: "unset" } }}>
        {row.isLast ? (
          <TableCell sx={{ width: "1em" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : (
          <TableCell sx={{ width: "1em" }} />
        )}
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      {row.isLast && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Detail for {row.projectComponent.name}
                </Typography>
                {renderComponentSpecAccordionDetail(
                  row.projectComponent.componentSpec
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
const VendorBidModal = ({
  bid,
  projectComponents,
  setIsBidModalOpen,
  vendorData,
}: {
  bid: ProjectBid;
  projectComponents: ProjectComponent[];
  setIsBidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vendorData: VendorDetail;
}) => {
  const getComponent = (id: string) => {
    return projectComponents.find((comp) => comp.id === id);
  };

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {bid.components.map((comp) => {
          const rows: ProjectComponentRow[] = [];
          const projectComponent = getComponent(comp.projectComponentId);

          if (projectComponent) {
            comp.quantityPrices.forEach((qp, i) => {
              rows.push({
                name: projectComponent.name,
                quantity: qp.quantity,
                price: qp.price,
                projectComponent,
                isLast: i === comp.quantityPrices.length - 1,
              });
            });
          }

          return (
            <>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Component Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <BidComponentRow row={row} />
                ))}
              </TableBody>
            </>
          );
        })}
      </Table>
    </TableContainer>

    // <Container>
    //   <Typography>Vendor: {vendorData.name}</Typography>
    //   {bid.components.map((comp) => {
    //     console.log(comp);
    //     return (
    //       <>
    //         <Typography>
    //           Component: {getComponent(comp.projectComponentId)}
    //         </Typography>
    //         <List>
    //           {comp.quantityPrices.map((qp) => {
    //             return (
    //               <ListItem>
    //                 <Typography>Quantity: {qp.quantity}</Typography>
    //                 <Typography>Price: {qp.price}</Typography>
    //               </ListItem>
    //             );
    //           })}
    //         </List>
    //       </>
    //     );
    //   })}
    //   <DialogActions>
    //     <Button variant="contained" onClick={() => setIsBidModalOpen(false)}>
    //       Close
    //     </Button>
    //   </DialogActions>
    // </Container>
  );
};

export default VendorBidModal;

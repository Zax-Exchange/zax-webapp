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
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../../common/ComponentSpecDetail";

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
  const intl = useIntl();
  const [open, setOpen] = useState(false);

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
                  {row.projectComponent.name}
                </Typography>
                <ComponentSpecDetail
                  spec={row.projectComponent.componentSpec}
                />
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
  const intl = useIntl();
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
                  <TableCell>
                    {intl.formatMessage({ id: "app.component.attribute.name" })}
                  </TableCell>
                  <TableCell align="right">
                    {intl.formatMessage({ id: "app.bid.attribute.quantity" })}
                  </TableCell>
                  <TableCell align="right">
                    {intl.formatMessage({ id: "app.bid.attribute.price" })}
                  </TableCell>
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

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

/**
 * Bid modal shown in CustomerProjectDetail
 * @param {*} param0
 * @returns
 */
const VendorBidModal = ({
  bid,
  projectComponents,
  setIsBidModalOpen,
  vendorData,
}) => {
  const [open, setOpen] = useState(false);

  const getComponent = (id) => {
    return projectComponents.find((comp) => comp.id === id);
  };

  const getRows = () => {
    const res = [];
    for (let comp of bid.components) {
      const row = {};
      const projectComponent = getComponent(comp.projectComponentId);
      for (let qp of comp.quantityPrices) {
        res.push({
          name: projectComponent.name,
          quantity: qp.quantity,
          price: qp.price,
        });
      }
    }
  };
  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {bid.components.map((comp) => {
          const rows = [];
          const row = {};
          const projectComponent = getComponent(comp.projectComponentId);
          for (let qp of comp.quantityPrices) {
            rows.push({
              name: projectComponent.name,
              quantity: qp.quantity,
              price: qp.price,
              projectComponent,
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
                  <>
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Detail for {row.projectComponent.name}
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Materials</TableCell>
                                  <TableCell>Dimension</TableCell>
                                  <TableCell align="right">
                                    Post Process
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow key={row.projectComponent.id}>
                                  <TableCell component="th" scope="row">
                                    {row.projectComponent.materials}
                                  </TableCell>
                                  <TableCell>
                                    {row.projectComponent.dimension}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.projectComponent.postProcess}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
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

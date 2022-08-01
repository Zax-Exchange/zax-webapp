import { Button, Container, DialogActions, List, ListItem, Typography } from "@mui/material";

/**
 * Bid modal shown in CustomerProjectDetail
 * @param {*} param0 
 * @returns 
 */
const VendorBidModal = ({ 
  bid, 
  projectComponents, 
  setIsBidModalOpen,
  vendorData 
}) => {

  const getComponentName = (id) => {
    return projectComponents.find(comp => comp.id === id).name;
  }

  return <Container>
    <Typography>Vendor: {vendorData.name}</Typography>
    {
      bid.components.map(comp => {
        return <>
          <Typography>Component: {getComponentName(comp.projectComponentId)}</Typography>
          <List>
            {
              comp.quantityPrices.map(qp => {
                return <ListItem>
                  <Typography>Quantity: {qp.quantity}</Typography>
                  <Typography>Price: {qp.price}</Typography>
                </ListItem>
              })
            }
          </List>
        </>
      })
    }
    <DialogActions>
      <Button variant="contained" onClick={() => setIsBidModalOpen(false)}>Close</Button>
    </DialogActions>
  </Container>
}

export default VendorBidModal;
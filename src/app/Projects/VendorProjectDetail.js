import { useProjectDetail } from "./SearchProjectDetail"
import { Stack, 
  Container, 
  Typography, 
  Button,
  Paper,
  List,
  ListItem,
  DialogActions,
  Grid
} from "@mui/material";
import "./SearchProjectDetail.scss";

const VendorProjectDetail = ({projectId, bidInfo, setIsProjectOpen}) => {
  const {loading, error, data} = useProjectDetail(projectId);
  
  const renderProjectDetail = () => {
    const {
      name: projectName,
      deliveryDate,
      deliveryCountry,
      budget,
      deliveryCity,
      design,
      status,
      components
    } = data.getProjectDetail

    const bids = {};
    bidInfo.components.forEach(comp => {
      bids[comp.projectComponentId] = comp.quantityPrices;
    });


    return <>
    <Grid container className="vendor-project-info-container">
        <Grid item xs={6}>
          <Container><Typography variant="h6">Project Detail</Typography></Container>
          <List>
            <ListItem><Typography>name: {projectName}</Typography></ListItem>
            <ListItem><Typography>deliveryDate: {deliveryDate}</Typography></ListItem>
            <ListItem><Typography>deliveryCountry: {deliveryCountry}</Typography></ListItem>
            <ListItem><Typography>budget: {budget}</Typography></ListItem>
            <ListItem><Typography>deliveryCity: {deliveryCity}</Typography></ListItem>
            <ListItem><Typography>design: {design}</Typography></ListItem>
            <ListItem><Typography>status: {status}</Typography></ListItem>
          </List>
        </Grid>
        

          <Grid item xs={6}>
            <Container><Typography variant="h6">Components Detail</Typography></Container>

            {
              components.map((comp, i) => {
                const {
                  id,
                  name,
                  materials,
                  dimension,
                  postProcess
                } = comp;

                return ( <>
                      <List>
                        <ListItem><Typography>name: {name}</Typography></ListItem>
                        <ListItem><Typography>materials: {materials.join(",")}</Typography></ListItem>
                        <ListItem><Typography>dimension: {dimension}</Typography></ListItem>
                        <ListItem><Typography>post process: {postProcess}</Typography></ListItem>
                        <ListItem><Typography>Bids</Typography></ListItem>

                      </List>
                      {
                        bids[id].map((qp, i) => {
                          return <List className="quantity-price-container">
                              <ListItem>
                                <Typography className="quantity">Quantity: {qp.quantity}</Typography> 
                              </ListItem>
                              <ListItem>
                                <Typography className="price">Price: {qp.price}</Typography>
                              </ListItem>
                            </List>
                        })
                      }
                    </>
                )
              })
            }
          </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={() => setIsProjectOpen(false)}>Close</Button>
      </DialogActions>
    </>
  }

  const renderBidDetail = () => {

    return <div className="bid-info-container">

    </div>
  }

  if (!data) return null;

  return <div className="user-project-detail-container">
    {renderProjectDetail()}
  </div>
}

export default VendorProjectDetail
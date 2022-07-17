import { useProjectDetail } from "./ProjectDetail"
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
import "./ProjectDetail.scss";

const UserProjectDetail = ({projectId, bidInfo, setIsProjectOpen}) => {
  const {loading, error, data} = useProjectDetail(projectId);

  const renderProjectDetail = () => {
    if (!data) return null;

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
          <Typography >Project Detail</Typography>
          <Typography>name: {projectName}</Typography>
          <Typography>deliveryDate: {deliveryDate}</Typography>
          <Typography>deliveryCountry: {deliveryCountry}</Typography>
          <Typography>budget: {budget}</Typography>
          <Typography>deliveryCity: {deliveryCity}</Typography>
          <Typography>design: {design}</Typography>
          <Typography>status: {status}</Typography>
        </Grid>
        

          <Grid item xs={6}>
            <Typography className="title">Components Detail</Typography>

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
                      <Typography>name: {name}</Typography>
                      <Typography>materials: {materials.join(",")}</Typography>
                      <Typography>dimension: {dimension}</Typography>
                      <Typography>post process: {postProcess}</Typography>
                      <Typography>Bids</Typography>
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

  return <div className="user-project-detail-container">
    {renderProjectDetail()}
  </div>
}

export default UserProjectDetail
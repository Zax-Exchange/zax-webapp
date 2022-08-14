import {
  Stack,
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  DialogActions,
  Grid,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetProjectDetail,
  useGetVendorProject,
} from "../hooks/projectHooks";
import FullScreenLoading from "../Utils/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const VendorProjectDetail = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { projectId } = useParams();

  const navigate = useNavigate();

  const {
    getVendorProjectData,
    getVendorProjectError,
    getVendorProjectLoading,
    getVendorProjectRefetch,
  } = useGetVendorProject(user.id, projectId);

  const renderProjectDetail = () => {
    const {
      name: projectName,
      deliveryDate,
      deliveryAddress,
      budget,
      design,
      status,
      components,
      companyId,
      customerName,
      bidInfo,
    } = getVendorProjectData.getVendorProject;

    const bids = {};

    bidInfo.components.forEach((comp) => {
      bids[comp.projectComponentId] = comp.quantityPrices;
    });

    return (
      <>
        <Grid container className="vendor-project-info-container" spacing={2}>
          <Grid item xs={5}>
            <Container>
              <Typography variant="h6">Project Detail</Typography>
            </Container>
            <Paper>
              <List>
                <ListItem>
                  <Typography>Customer: {companyId}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>name: {projectName}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>deliveryDate: {deliveryDate}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>deliveryAddress: {deliveryAddress}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>budget: {budget}</Typography>
                </ListItem>

                <ListItem>
                  <Typography>design: {design}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>status: {status}</Typography>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={7}>
            <Container>
              <Typography variant="h6">Bid Detail</Typography>
            </Container>

            {components.map((comp, i) => {
              const { id, name, materials, dimension, postProcess } = comp;

              return (
                <>
                  <Paper>
                    <List>
                      <ListItem>
                        <Typography>name: {name}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          materials: {materials.join(",")}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>dimension: {dimension}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>post process: {postProcess}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>Bids</Typography>
                      </ListItem>
                    </List>
                    {bids[id].map((qp, i) => {
                      return (
                        <List className="quantity-price-container">
                          <ListItem>
                            <Typography className="quantity">
                              Quantity: {qp.quantity}
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography className="price">
                              Price: {qp.price}
                            </Typography>
                          </ListItem>
                        </List>
                      );
                    })}
                  </Paper>
                </>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  };

  if (getVendorProjectLoading) {
    return <FullScreenLoading />;
  }

  if (getVendorProjectError) {
    return (
      <Container>
        <Button onClick={getVendorProjectRefetch}>try again</Button>
      </Container>
    );
  }
  return (
    <Container>
      <Container disableGutters style={{ textAlign: "left" }}>
        <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute" }}>
          <KeyboardBackspaceIcon style={{ color: "rgb(43, 52, 89)" }} />
        </IconButton>
      </Container>
      {renderProjectDetail()}
    </Container>
  );
};

export default VendorProjectDetail;

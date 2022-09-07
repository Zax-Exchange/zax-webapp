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
  Dialog,
  DialogContent,
  Link,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FullScreenLoading from "../../Utils/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";
import ProjectChat from "../chat/ProjectChat";
import React from "react";
import { ProjectBidComponent, QuantityPrice } from "../../../generated/graphql";
import { useGetVendorProjectQuery } from "../../gql/get/vendor/vendor.generated";
import { useGetCompanyDetailQuery } from "../../gql/get/company/company.generated";

const VendorProjectDetail = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { projectId } = useParams();

  const navigate = useNavigate();

  const {
    data: getVendorProjectData,
    error: getVendorProjectError,
    loading: getVendorProjectLoading,
    refetch: getVendorProjectRefetch,
  } = useGetVendorProjectQuery({
    variables: {
      data: {
        projectId: projectId!,
        userId: user!.id,
      },
    },
  });

  const {
    data: getCompanyDetailData,
    error: getCompanyDetailError,
    loading: getCompanyDetailLoading,
  } = useGetCompanyDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const [chatOpen, setChatOpen] = useState(false);

  const renderProjectDetail = () => {
    if (!getVendorProjectData || !getVendorProjectData.getVendorProject)
      return null;

    const {
      name: projectName,
      deliveryDate,
      deliveryAddress,
      budget,
      design,
      status,
      components,
      companyId,
      companyName: customerName,
      bidInfo,
    } = getVendorProjectData.getVendorProject;

    const bids: Record<string, QuantityPrice[]> = {};

    bidInfo.components.forEach((comp) => {
      bids[comp.projectComponentId] = comp.quantityPrices;
    });

    if (getVendorProjectLoading || getCompanyDetailLoading) {
      return <FullScreenLoading />;
    }

    if (getVendorProjectError || getCompanyDetailError) {
      return <Typography>Error</Typography>;
    }

    return (
      <>
        <Grid container className="vendor-project-info-container" spacing={2}>
          <Grid item xs={5}>
            <Container>
              <Typography variant="h6">Project Detail</Typography>
              <Button onClick={() => setChatOpen(true)}>chat</Button>
              <ProjectChat
                setChatOpen={setChatOpen}
                projectBidId={bidInfo.id}
                customerName={customerName}
                vendorName={getCompanyDetailData!.getCompanyDetail!.name}
                chatOpen={chatOpen}
              />
            </Container>
            <Paper>
              <List>
                <ListItem>
                  <Typography>Customer: {customerName}</Typography>
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

                {design && (
                  <ListItem>
                    <Typography>
                      Design:{" "}
                      <Link href={design.url} target="_blank" rel="noopener">
                        {design.fileName}
                      </Link>
                    </Typography>
                  </ListItem>
                )}
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
              return (
                <>
                  <Paper>
                    <List>
                      <ListItem>
                        <Typography>name: {comp.name}</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          product: {comp.componentSpec.productName}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          dimension: {comp.componentSpec.dimension}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>Bids</Typography>
                      </ListItem>
                    </List>
                    {bids[comp.id].map((qp, i) => {
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
        <Button onClick={() => getVendorProjectRefetch()}>try again</Button>
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

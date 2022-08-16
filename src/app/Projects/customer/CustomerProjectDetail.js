import {
  Grid,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VendorBidOverview from "./VendorBidOverview";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useGetCustomerProject } from "../../hooks/projectHooks";
import FullScreenLoading from "../../Utils/Loading";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const CustomerProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    getCustomerProjectData,
    getCustomerProjectError,
    getCustomerProjectLoading,
    getCustomerProjectRefetch,
  } = useGetCustomerProject({ userId: user.id, projectId });

  const getComponentName = (componentId, components) => {
    return components.find((comp) => comp.id === componentId).name;
  };

  const convertToDate = (timestamp) => {
    return new Date(Date(timestamp)).toISOString().slice(0, 10);
  };

  const backButtonHandler = () => {
    navigate("/projects");
  };

  if (getCustomerProjectLoading) {
    return <FullScreenLoading />;
  }

  if (getCustomerProjectError) {
    return (
      <Container>
        <Button onClick={getCustomerProjectRefetch}>retry</Button>
      </Container>
    );
  }

  function toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(
          0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        );
      }
      // surrogate pair
      else {
        i++;
        // UTF-16 encodes 0x10000-0x10FFFF by
        // subtracting 0x10000 and splitting the
        // 20 bits of 0x0-0xFFFFF into two halves
        charcode =
          0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(
          0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        );
      }
    }
    console.log(utf8);
    return utf8;
  }

  const projectData = getCustomerProjectData.getCustomerProject;
  const { bids } = projectData;
  return (
    <Container>
      <Container disableGutters style={{ textAlign: "left" }}>
        <IconButton onClick={backButtonHandler}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Container>
            <Typography variant="h6">Vendor Bids</Typography>
          </Container>
          <List sx={{ maxHeight: 500 }}>
            {bids.map((bid) => {
              return (
                <>
                  <ListItem>
                    <VendorBidOverview
                      bid={bid}
                      projectComponents={projectData.components}
                    />
                  </ListItem>
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <Typography variant="h6">Project Detail</Typography>
          </Container>
          <Paper>
            <List>
              <ListItem>
                <Typography>Project Name: {projectData.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Delivery Date: {projectData.deliveryDate}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Delivery Address: {projectData.deliveryAddress}
                </Typography>
              </ListItem>

              {projectData.design && (
                <ListItem>
                  <Typography>
                    Design:{" "}
                    <Link
                      href={projectData.design.url}
                      target="_blank"
                      rel="noopener"
                    >
                      {projectData.design.fileName}
                    </Link>
                  </Typography>
                </ListItem>
              )}
              <ListItem>
                <Typography>Budget: {projectData.budget}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Status: {projectData.status}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Posted on: {convertToDate(projectData.createdAt)}
                </Typography>
              </ListItem>
            </List>
          </Paper>
          {projectData.components.map((comp) => {
            return (
              <Paper style={{ marginTop: "8px" }}>
                <List>
                  <ListItem>
                    <Typography>Name: {comp.name}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Materials: {comp.materials.join(",")}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Dimension: {comp.dimension}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Post process: {comp.postProcess}</Typography>
                  </ListItem>
                </List>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerProjectDetail;

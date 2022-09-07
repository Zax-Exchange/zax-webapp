import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Link,
  Stack,
  ListItem,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";
import ProjectBidModal from "../../Projects/vendor/ProjectBidModal";
import { useEffect, useState } from "react";
import FullScreenLoading from "../../Utils/Loading";
import CustomSnackbar from "../../Utils/CustomSnackbar";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { Project, ProjectComponentSpec } from "../../../generated/graphql";
import { useGetProjectDetailQuery } from "../../gql/get/project/project.generated";
import { SearchProjectDetailLocationState } from "./SearchProjectOverview";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SearchProjectDetail = () => {
  const { projectId } = useParams();

  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const {
    data: getProjectDetailData,
    error: getProjectDetailError,
    loading: getProjectDetailLoading,
  } = useGetProjectDetailQuery({
    variables: {
      data: {
        projectId: projectId || "",
      },
    },
  });

  const navigate = useNavigate();
  const [projectBidModalOpen, setProjectBidModalOpen] = useState(false);

  useEffect(() => {
    if (getProjectDetailError) {
      setSnackbar({
        message: "Could not load project at this time. Please try again later.",
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getProjectDetailError]);

  const openModal = () => {
    setProjectBidModalOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setProjectBidModalOpen(false);
  };

  const bidProjectHandler = () => {
    setProjectBidModalOpen(true);
  };
  const backHandler = () => {
    navigate(-1);
  };

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
      <TableContainer>
        <Table size="small">
          <TableBody>{res}</TableBody>
        </Table>
      </TableContainer>
    );
  };
  const renderProjectDetail = () => {
    if (!getProjectDetailData || !getProjectDetailData.getProjectDetail)
      return null;

    const {
      name: projectName,
      companyName,
      deliveryDate,
      deliveryAddress,
      budget,
      design,
      status,
      components,
    } = getProjectDetailData.getProjectDetail;

    return (
      <Container>
        <Box display="flex" justifyContent="space-between" mb={1.5}>
          <Box>
            <Typography variant="subtitle1">Project Detail</Typography>
          </Box>
          <Box>
            <Button
              onClick={backHandler}
              variant="text"
              style={{ marginRight: 16 }}
            >
              Back
            </Button>
            <Button onClick={bidProjectHandler} variant="contained">
              Bid Project
            </Button>
          </Box>
        </Box>
        <Paper style={{ padding: "12px", marginBottom: "8px" }}>
          <Box style={{ width: "60%" }}>
            <Stack>
              <ListItem>
                <Typography variant="subtitle2">Project Name</Typography>
                <Typography variant="caption">{projectName}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="subtitle2">Delivery Date</Typography>
                <Typography variant="caption">{deliveryDate}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="subtitle2">Delivery Address</Typography>
                <Typography variant="caption">{deliveryAddress}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="subtitle2">Budget</Typography>
                <Typography variant="caption">{budget}</Typography>
              </ListItem>

              {design && (
                <ListItem>
                  <Typography variant="subtitle2">Design File</Typography>
                  <Typography variant="caption">
                    <Link href={design.url} target="_blank" rel="noopener">
                      {design.fileName}
                    </Link>
                  </Typography>
                </ListItem>
              )}
            </Stack>
          </Box>
        </Paper>

        <Box mt={2} mb={1.5} display="flex">
          <Typography variant="subtitle1">Components Detail</Typography>
        </Box>

        <Stack>
          {components.map((comp, i) => {
            return (
              <ListItem sx={{ padding: 0, mb: 2 }} key={i}>
                <Accordion sx={{ flexGrow: 2 }}>
                  <AccordionSummary
                    key={i}
                    expandIcon={<ExpandMoreIcon />}
                    id={`component-summary-${i}`}
                  >
                    <Typography variant="subtitle2">{comp.name}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    {renderComponentSpecAccordionDetail(comp.componentSpec)}
                  </AccordionDetails>
                </Accordion>
              </ListItem>
            );
          })}
        </Stack>
      </Container>
    );
  };

  if (getProjectDetailLoading) {
    return <FullScreenLoading />;
  }

  if (getProjectDetailData && getProjectDetailData.getProjectDetail) {
    return (
      <>
        <Container className="project-detail-container">
          {renderProjectDetail()}

          <Dialog
            open={projectBidModalOpen}
            onClose={closeModal}
            fullWidth={true}
            maxWidth="md"
          >
            <ProjectBidModal
              setProjectBidModalOpen={setProjectBidModalOpen}
              projectId={projectId}
              projectData={getProjectDetailData.getProjectDetail as Project}
            />
          </Dialog>
        </Container>
      </>
    );
  }
  return null;
};

export default SearchProjectDetail;

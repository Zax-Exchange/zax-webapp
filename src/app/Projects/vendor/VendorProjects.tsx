import {
  Typography,
  Grid,
  Container,
  Fade,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// import CustomSnackbar from "../Utils/CustomSnackbar";
import SortIcon from "@mui/icons-material/Sort";
import { AuthContext } from "../../../context/AuthContext";
import FullScreenLoading from "../../Utils/Loading";
import {
  useGetVendorProjectsQuery,
  VendorProject,
} from "../../../generated/graphql";
import VendorProjectOverview from "./VendorProjectOverview";
import useCustomSnackbar from "../../Utils/CustomSnackbar";

const VendorProjects = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const isVendor = user!.isVendor;

  const userId = user!.id;

  const {
    data: getVendorProjectsData,
    error: getVendorProjectsError,
    loading: getVendorProjectsLoading,
    refetch: getVendorProjectsRefetch,
  } = useGetVendorProjectsQuery({
    variables: {
      userId,
    },
  });

  const [isProjectPageLoading, setIsProjectPageLoading] = useState(false);

  const [sortMenuAnchor, setSortMenuAnchor] =
    useState<HTMLButtonElement | null>(null);
  const sortMenuOpen = !!sortMenuAnchor;
  const [projects, setProjects] = useState<VendorProject[]>([]);

  useEffect(() => {
    if (getVendorProjectsData && getVendorProjectsData.getVendorProjects) {
      setProjects(getVendorProjectsData.getVendorProjects as VendorProject[]);
    }
  }, [getVendorProjectsData]);

  const sortByDeliveryDate = () => {
    let proj = [...projects];
    proj = proj.sort(
      (a, b) => (a.deliveryDate as any) - (b.deliveryDate as any)
    );
    setProjects([...proj]);
  };

  const sortByBudget = () => {
    let proj = [...projects];
    proj = proj.sort((a, b) => a.budget - b.budget);
    setProjects([...proj]);
  };

  const sortByName = () => {
    let proj = [...projects];
    proj = proj.sort((a, b) => (a.name as any) - (b.name as any));
    setProjects([...proj]);
  };

  const sortOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSortMenuAnchor(e.currentTarget);
  };

  const sortOnClose = () => {
    setSortMenuAnchor(null);
  };

  const sortMenuOnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    switch (e.currentTarget.dataset.type) {
      case "name":
        sortByName();
        break;
      case "date":
        sortByDeliveryDate();
        break;
      case "budget":
        sortByBudget();
        break;
      default:
        break;
    }
    sortOnClose();
  };

  if (getVendorProjectsLoading) {
    return (
      <Container className="user-projects-container">
        <FullScreenLoading />
      </Container>
    );
  }

  if (getVendorProjectsError) {
    setSnackbar({
      message: "Error",
      severity: "error",
    });
    setSnackbarOpen(true);
    return null;
  }

  return (
    <Container
      className="user-projects-container"
      sx={{ position: "relative" }}
    >
      {isProjectPageLoading && <FullScreenLoading />}
      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="subtitle2">Your projects</Typography>
        <IconButton onClick={sortOnClick}>
          <SortIcon />
        </IconButton>
      </Box>

      <Menu
        id="long-menu"
        anchorEl={sortMenuAnchor}
        open={sortMenuOpen}
        onClose={sortOnClose}
        PaperProps={{
          style: {
            maxHeight: "120px",
          },
        }}
      >
        <MenuList dense sx={{ padding: "4px 0 4px" }}>
          <MenuItem data-type="name" onClick={sortMenuOnClick}>
            Sort by name
          </MenuItem>

          <MenuItem data-type="budget" onClick={sortMenuOnClick}>
            Sort by budget
          </MenuItem>

          <MenuItem data-type="date" onClick={sortMenuOnClick}>
            Sort by delivery date
          </MenuItem>
        </MenuList>
      </Menu>

      <Fade in={true}>
        <Grid container spacing={3} className="user-projects-inner-container">
          {projects.map((project, i) => {
            return (
              <>
                <VendorProjectOverview
                  key={i}
                  project={project}
                  getVendorProjectsRefetch={getVendorProjectsRefetch}
                  setIsProjectPageLoading={setIsProjectPageLoading}
                />
              </>
            );
          })}
        </Grid>
      </Fade>
    </Container>
  );
};

export default VendorProjects;

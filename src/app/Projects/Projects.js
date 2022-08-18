import VendorProjectOverview from "./vendor/VendorProjectOverview";
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
import "./Projects.scss";
import FullScreenLoading from "../Utils/Loading";
import CustomerProjectOverview from "./customer/CustomerProjectOverview";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  useGetCustomerProjects,
  useGetVendorProjects,
} from "../hooks/projectHooks";
import CustomSnackbar from "../Utils/CustomSnackbar";
import SortIcon from "@mui/icons-material/Sort";

const Projects = () => {
  const { user } = useContext(AuthContext);
  const isVendor = user.isVendor;

  const userId = user.id;
  const {
    getVendorProjectsData,
    getVendorProjectsError,
    getVendorProjectsLoading,
    getVendorProjectsRefetch,
  } = useGetVendorProjects(userId, !isVendor);
  const {
    getCustomerProjectsData,
    getCustomerProjectsError,
    getCustomerProjectsLoading,
    getCustomerProjectsRefetch,
  } = useGetCustomerProjects(userId, isVendor);
  const [isProjectPageLoading, setIsProjectPageLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const sortMenuOpen = !!sortMenuAnchor;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (getVendorProjectsData && getVendorProjectsData.getVendorProjects) {
      setProjects(getVendorProjectsData.getVendorProjects);
    } else if (
      getCustomerProjectsData &&
      getCustomerProjectsData.getCustomerProjects
    ) {
      setProjects(getCustomerProjectsData.getCustomerProjects);
    }
  }, [getVendorProjectsData, getCustomerProjectsData]);

  const sortByDeliveryDate = () => {
    let proj = [...projects];
    proj = proj.sort(
      (a, b) => new Date(a.deliveryDate) - new Date(b.deliveryDate)
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
    proj = proj.sort((a, b) => a.name - b.name);
    setProjects([...proj]);
  };

  const sortOnClick = (e) => {
    setSortMenuAnchor(e.currentTarget);
  };

  const sortOnClose = () => {
    setSortMenuAnchor(null);
  };

  const sortMenuOnClick = (e) => {
    switch (e.target.dataset.type) {
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

  let projectOverview = null;

  if (isVendor) {
    projectOverview = projects.map((project, i) => {
      return (
        <VendorProjectOverview
          key={i}
          project={project}
          getVendorProjectsRefetch={getVendorProjectsRefetch}
          setSnackbar={setSnackbar}
          setSnackbarOpen={setSnackbarOpen}
          setIsProjectPageLoading={setIsProjectPageLoading}
        />
      );
    });
  } else {
    projectOverview = projects.map((project, i) => {
      return (
        <>
          <CustomerProjectOverview
            key={i}
            project={project}
            getCustomerProjectsRefetch={getCustomerProjectsRefetch}
            setSnackbar={setSnackbar}
            setSnackbarOpen={setSnackbarOpen}
            setIsProjectPageLoading={setIsProjectPageLoading}
          />
        </>
      );
    });
  }

  if (getVendorProjectsLoading || getCustomerProjectsLoading) {
    return (
      <Container className="user-projects-container">
        <FullScreenLoading />
      </Container>
    );
  }

  if (getVendorProjectsError || getCustomerProjectsError) {
    return (
      <Container className="user-projects-container">
        Something went wrong!
      </Container>
    );
  }

  return (
    <Container
      className="user-projects-container"
      sx={{ position: "relative" }}
    >
      {isProjectPageLoading && <FullScreenLoading />}
      <CustomSnackbar
        severity={snackbar.severity}
        direction="right"
        message={snackbar.message}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
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
          {projectOverview}
        </Grid>
      </Fade>
    </Container>
  );
};

export default Projects;

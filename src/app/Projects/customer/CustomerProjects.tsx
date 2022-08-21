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
import React, { useContext, useEffect, useState } from "react";

// import CustomSnackbar from "../Utils/CustomSnackbar";
import SortIcon from "@mui/icons-material/Sort";
import { AuthContext } from "../../../context/AuthContext";
import { CustomerProject, useGetCustomerProjectsQuery } from "../../../generated/graphql";
import CustomerProjectOverview from "./CustomerProjectOverview";
import FullScreenLoading from "../../Utils/Loading";

const CustomerProjects = () => {
  const { user } = useContext(AuthContext);
  const isVendor = user!.isVendor;

  const userId = user!.id;

  const {
    data: getCustomerProjectsData,
    error: getCustomerProjectsError,
    loading: getCustomerProjectsLoading,
    refetch: getCustomerProjectsRefetch,
  } = useGetCustomerProjectsQuery({
    variables: {
      userId
    }
  });

  const [isProjectPageLoading, setIsProjectPageLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [sortMenuAnchor, setSortMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const sortMenuOpen = !!sortMenuAnchor;
  const [projects, setProjects] = useState<CustomerProject[]>([]);

  useEffect(() => {
    if (
      getCustomerProjectsData &&
      getCustomerProjectsData.getCustomerProjects
    ) {
      setProjects(getCustomerProjectsData.getCustomerProjects as CustomerProject[]);
    }
  }, [getCustomerProjectsData]);

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

  const sortMenuOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  if (getCustomerProjectsLoading) {
    return (
      <Container className="user-projects-container">
        <FullScreenLoading />
      </Container>
    );
  }

  if (getCustomerProjectsError) {
    return (
      <Container className="user-projects-container">
        Something went wrong!
      </Container>
    );
  }

  const projectOverview = projects.map((project, i) => {
      return (
        <>
          <CustomerProjectOverview
            key={i}
            project={project}
            getCustomerProjectsRefetch={getCustomerProjectsRefetch}
            // setSnackbar={setSnackbar}
            // setSnackbarOpen={setSnackbarOpen}
            setIsProjectPageLoading={setIsProjectPageLoading}
          />
        </>
      );
    });
  }

  return (
    <Container
      className="user-projects-container"
      sx={{ position: "relative" }}
    >
      {isProjectPageLoading && <FullScreenLoading />}
      {/* <CustomSnackbar
        severity={snackbar.severity}
        direction="right"
        message={snackbar.message}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      /> */}
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
          {
            getCustomerProjectsData
          }
        </Grid>
      </Fade>
    </Container>
  );
};

export default CustomerProjects;

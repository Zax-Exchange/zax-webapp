import {
  Typography,
  Grid,
  Container,
  Fade,
  Menu,
  MenuList,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// import CustomSnackbar from "../Utils/CustomSnackbar";
import { AuthContext } from "../../../context/AuthContext";

import CustomerProjectOverviewCard from "./CustomerProjectOverviewCard";
import FullScreenLoading from "../../Utils/Loading";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useGetCustomerProjectsQuery } from "../../gql/get/customer/customer.generated";
import { useIntl } from "react-intl";
import { CustomerProjectOverview } from "../../../generated/graphql";

const CustomerProjects = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const userId = user!.id;

  const {
    data: getCustomerProjectsData,
    error: getCustomerProjectsError,
    loading: getCustomerProjectsLoading,
    refetch: getCustomerProjectsRefetch,
  } = useGetCustomerProjectsQuery({
    variables: {
      data: {
        userId,
      },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const [isProjectPageLoading, setIsProjectPageLoading] = useState(false);

  const [sortMenuAnchor, setSortMenuAnchor] =
    useState<HTMLButtonElement | null>(null);
  const sortMenuOpen = !!sortMenuAnchor;
  const [projects, setProjects] = useState<CustomerProjectOverview[]>([]);

  useEffect(() => {
    if (
      getCustomerProjectsData &&
      getCustomerProjectsData.getCustomerProjects
    ) {
      setProjects(
        getCustomerProjectsData.getCustomerProjects as CustomerProjectOverview[]
      );
    }
  }, [getCustomerProjectsData]);

  useEffect(() => {
    if (getCustomerProjectsError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getCustomerProjectsError]);

  const refetchProjects = () => {
    getCustomerProjectsRefetch();
  };

  const sortByDeliveryDate = () => {
    let proj = [...projects];
    proj = proj.sort(
      (a, b) => (a.deliveryDate as any) - (b.deliveryDate as any)
    );
    setProjects([...proj]);
  };

  const sortByTargetPrice = () => {
    let proj = [...projects];
    proj = proj.sort(
      (a, b) => parseFloat(a.targetPrice) - parseFloat(b.targetPrice)
    );
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
      case "targetPrice":
        sortByTargetPrice();
        break;
      default:
        break;
    }
    sortOnClose();
  };

  if (getCustomerProjectsLoading) {
    return <FullScreenLoading />;
  }

  if (getCustomerProjectsError) {
    return (
      <Container>
        {intl.formatMessage({
          id: "app.general.network.error",
        })}
      </Container>
    );
  }

  if (getCustomerProjectsData) {
    return (
      <Container sx={{ position: "relative" }}>
        {isProjectPageLoading && <FullScreenLoading />}
        <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.customer.projects.title" })}
          </Typography>
          {/* <IconButton onClick={sortOnClick}>
            <SortIcon />
          </IconButton> */}
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
              {intl.formatMessage({ id: "app.customer.projects.sortBy.name" })}
            </MenuItem>

            <MenuItem data-type="targetPrice" onClick={sortMenuOnClick}>
              {intl.formatMessage({
                id: "app.customer.projects.sortBy.targetPrice",
              })}
            </MenuItem>

            <MenuItem data-type="date" onClick={sortMenuOnClick}>
              {intl.formatMessage({ id: "app.customer.projects.sortBy.date" })}
            </MenuItem>
          </MenuList>
        </Menu>

        <Fade in={true}>
          <Grid container spacing={3} className="user-projects-inner-container">
            {projects.map((project, i) => {
              return (
                <>
                  <CustomerProjectOverviewCard
                    key={i}
                    project={project}
                    setIsProjectPageLoading={setIsProjectPageLoading}
                    refetchProjects={refetchProjects}
                  />
                </>
              );
            })}
          </Grid>
        </Fade>
      </Container>
    );
  }
  return null;
};

export default CustomerProjects;

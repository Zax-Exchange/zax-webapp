import { useState } from "react";
import Button from "@mui/material/Button";
import {
  Container,
  IconButton,
  List,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import { Card, CardActionArea, CardContent, Grid, Paper } from "@mui/material";
import ProjectPermissionModal from "../ProjectPermissionModal";
import { useNavigate } from "react-router-dom";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import { Exact, GetVendorProjectsQuery, InputMaybe, VendorProject } from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import React from "react";

const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const VendorProjectOverview = ({
  project,
  // setSnackbar,
  // setSnackbarOpen,
  setIsProjectPageLoading,
  getVendorProjectsRefetch,
}: {
  project: VendorProject;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getVendorProjectsRefetch: (variables?: Partial<Exact<{
    userId?: string;
}>> | undefined) => Promise<ApolloQueryResult<GetVendorProjectsQuery>>
}) => {
  const navigate = useNavigate();
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<HTMLButtonElement | null>(null);

  const projectMenuOpen = !!projectMenuAnchor;
  const date = new Date(parseInt(project.createdAt, 10)).toISOString().slice(0, 10);

  const moreOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProjectMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setProjectMenuAnchor(null);
  };

  const viewDetailHandler = () => {
    navigate(`/vendor-project-detail/${project.id}`);
  };

  const canShare = () => {
    return project.permission !== "VIEWER";
  };

  const projectMenuOnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (e.currentTarget.innerText === "View detail") {
      viewDetailHandler();
    }
    if (e.currentTarget.innerText === "Share" && canShare()) {
      setPermissionModalOpen(true);
    }

    moreOnClose();
  };

  return (
    <Grid item xs={4} minHeight={300}>
      <Paper
        variant="elevation"
        elevation={3}
        sx={{
          position: "relative",
          borderRadius: 2,
          ":hover": { backgroundColor: "#f8f8f8", cursor: "pointer" },
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: "4px" }}
          id="long-button"
          onClick={moreOnClick}
        >
          <MoreIcon id="123" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={projectMenuAnchor}
          open={projectMenuOpen}
          onClose={moreOnClose}
          PaperProps={{
            style: {
              maxHeight: "120px",
            },
          }}
        >
          <MenuList dense sx={{ padding: "4px 0 4px" }}>
            <MenuItem onClick={projectMenuOnClick}>View detail</MenuItem>

            <MenuItem onClick={projectMenuOnClick} disabled={!canShare()}>
              Share
            </MenuItem>
          </MenuList>
        </Menu>

        <Container
          sx={{ minHeight: 240, paddingTop: 2, paddingBottom: 2 }}
          onClick={viewDetailHandler}
        >
          <Typography variant="h6" align="left">
            {project.name}
          </Typography>

          <List>
            <ProjectOverviewListItem>
              <Tooltip title="Customer" arrow placement="top">
                <BusinessIcon />
              </Tooltip>
              <Typography variant="caption">{project.customerName}</Typography>
            </ProjectOverviewListItem>
            <ProjectOverviewListItem>
              <Tooltip title="Delivery date" arrow placement="top">
                <LocalShippingOutlinedIcon />
              </Tooltip>
              <Typography variant="caption">{project.deliveryDate}</Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip title="Delivery address" arrow placement="top">
                <PlaceIcon />
              </Tooltip>
              <Typography variant="caption">
                {project.deliveryAddress}
              </Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip title="Budget" arrow placement="top">
                <AttachMoneyIcon />
              </Tooltip>
              <Typography variant="caption">${project.budget}</Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip title="Posted on" arrow placement="top">
                <CalendarMonthIcon />
              </Tooltip>
              <Typography variant="caption">{date}</Typography>
            </ProjectOverviewListItem>
          </List>
        </Container>
      </Paper>

      <Dialog
        open={permissionModalOpen}
        onClose={() => setPermissionModalOpen(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent>
          <ProjectPermissionModal
            project={project}
            setPermissionModalOpen={setPermissionModalOpen}
            // setSnackbar={setSnackbar}
            // setSnackbarOpen={setSnackbarOpen}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default VendorProjectOverview;

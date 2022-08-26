import { useState } from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  List,
  MenuList,
  Chip,
  Tooltip,
  AlertColor,
} from "@mui/material";
import ProjectPermissionModal from "../ProjectPermissionModal";
import { useNavigate } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import DeleteProjectModal from "./DeleteProjectModal";
import MuiListItem from "@mui/material/ListItem";
import { styled } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import {
  CustomerProject,
  Exact,
  GetCustomerProjectsInput,
  InputMaybe,
} from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { GetCustomerProjectsQuery } from "../../gql/get/customer/customer.generated";

export const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const CustomerProjectOverview = ({
  project,
  setIsProjectPageLoading,
}: {
  project: CustomerProject;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const projectMenuOpen = !!projectMenuAnchor;
  const date = new Date(parseInt(project.createdAt)).toISOString().slice(0, 10);

  const viewDetailHandler = () => {
    const dest = CUSTOMER_ROUTES.PROJECT_DETAIL.split(":");

    dest[1] = project.id;

    navigate(`${dest.join("")}`);
  };

  const moreOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProjectMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setProjectMenuAnchor(null);
  };

  const projectMenuOnClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (e.currentTarget.innerText === "View detail") {
      viewDetailHandler();
    }
    if (e.currentTarget.innerText === "Share" && canShare()) {
      setPermissionModalOpen(true);
    }

    if (e.currentTarget.innerText === "Delete" && canDelete()) {
      setDeleteProjectModalOpen(true);
    }

    moreOnClose();
  };

  const canShare = () => {
    return project.permission !== "VIEWER";
  };

  const canDelete = () => {
    return project.permission !== "VIEWER" && project.status === "OPEN";
  };

  const renderProjectStatusChip = () => {
    switch (project.status) {
      case "OPEN":
        return <Chip label="Open" color="primary" size="small" />;
      case "IN_PROGRESS":
        return <Chip label="In Progress" color="warning" size="small" />;
      case "CLOSED":
        return <Chip label="Closed" color="success" size="small" />;
      default:
        return null;
    }
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
          <MoreIcon />
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

            <MenuItem onClick={projectMenuOnClick} disabled={!canDelete()}>
              Delete
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

          {/* <Typography align="left">Company: {project.companyId}</Typography> */}
          <List>
            <ProjectOverviewListItem>
              {renderProjectStatusChip()}
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

          {/* <Button style={{alignSelf: "center"}} onClick={viewDetailHandler}>View detail</Button> */}
          {/* {project.permission !== "VIEWER" && <Button onClick={() => setPermissionModalOpen(true)} style={{alignSelf: "center"}}>Share</Button>} */}
        </Container>
      </Paper>

      <DeleteProjectModal
        deleteProjectModalOpen={deleteProjectModalOpen}
        setDeleteProjectModalOpen={setDeleteProjectModalOpen}
        setIsProjectPageLoading={setIsProjectPageLoading}
        projectId={project.id}
      />

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
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CustomerProjectOverview;

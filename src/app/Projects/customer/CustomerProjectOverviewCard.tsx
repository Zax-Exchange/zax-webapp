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
import { useNavigate } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import MuiListItem from "@mui/material/ListItem";
import { styled } from "@mui/system";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import {
  CustomerProject,
  CustomerProjectOverview,
  Exact,
  GetCustomerProjectsInput,
  InputMaybe,
  ProjectPermission,
  ProjectStatus,
} from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { GetCustomerProjectsQuery } from "../../gql/get/customer/customer.generated";
import { useIntl } from "react-intl";
import CustomerPermissionModal from "./modals/CustomerPermissionModal";

type ProjectOverviewMenuOption = "view-detail" | "share" | "delete";

export const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const CustomerProjectOverviewCard = ({
  project,
  setIsProjectPageLoading,
}: {
  project: CustomerProjectOverview;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
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

  const projectMenuOnClick = (type: ProjectOverviewMenuOption) => {
    switch (type) {
      case "view-detail":
        viewDetailHandler();
        break;
      case "share":
        if (canShare()) setPermissionModalOpen(true);
        break;
      case "delete":
        if (canDelete()) setDeleteProjectModalOpen(true);
        break;
      default:
        break;
    }
    moreOnClose();
  };

  const canShare = () => {
    return project.permission !== ProjectPermission.Viewer;
  };

  const canDelete = () => {
    return (
      project.permission !== ProjectPermission.Viewer &&
      project.status === ProjectStatus.Open
    );
  };

  // TODO: use intl for chip label
  const renderProjectStatusChip = () => {
    switch (project.status) {
      case ProjectStatus.Open:
        return <Chip label="Open" color="primary" size="small" />;
      case ProjectStatus.InProgress:
        return <Chip label="In Progress" color="warning" size="small" />;
      case ProjectStatus.Completed:
        return <Chip label="Closed" color="success" size="small" />;
      default:
        return null;
    }
  };

  return (
    <Grid item xs={4} minHeight={300}>
      <Paper
        variant="elevation"
        elevation={1}
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
            <MenuItem onClick={() => projectMenuOnClick("view-detail")}>
              View detail
            </MenuItem>

            <MenuItem
              onClick={() => projectMenuOnClick("share")}
              disabled={!canShare()}
            >
              Share
            </MenuItem>

            <MenuItem
              onClick={() => projectMenuOnClick("delete")}
              disabled={!canDelete()}
            >
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
              <Tooltip
                title={intl.formatMessage({
                  id: "app.project.attribute.deliveryDate",
                })}
                arrow
                placement="top"
              >
                <LocalShippingOutlinedIcon />
              </Tooltip>
              <Typography variant="caption">{project.deliveryDate}</Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.project.attribute.deliveryAddress",
                })}
                arrow
                placement="top"
              >
                <PlaceIcon />
              </Tooltip>
              <Typography variant="caption">
                {project.deliveryAddress}
              </Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.project.attribute.targetPrice",
                })}
                arrow
                placement="top"
              >
                <AttachMoneyIcon />
              </Tooltip>
              <Typography variant="caption">${project.targetPrice}</Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.general.createdAt",
                })}
                arrow
                placement="top"
              >
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
          <CustomerPermissionModal
            project={project}
            setPermissionModalOpen={setPermissionModalOpen}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CustomerProjectOverviewCard;
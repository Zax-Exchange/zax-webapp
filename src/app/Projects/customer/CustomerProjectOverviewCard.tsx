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
  Box,
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
  ProjectVisibility,
} from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import React from "react";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../constants/loggedInRoutes";
import { GetCustomerProjectsQuery } from "../../gql/get/customer/customer.generated";
import { useIntl } from "react-intl";
import CustomerPermissionModal from "./modals/CustomerPermissionModal";
import {
  Create,
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import ReactGA from "react-ga4";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../analytics/constants";

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
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const projectMenuOpen = !!projectMenuAnchor;
  const date = project.createdAt.slice(0, 10);

  const viewDetailHandler = () => {
    const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");

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
        if (canShare()) {
          ReactGA.event({
            action: EVENT_ACTION.CLICK,
            category: EVENT_CATEGORY.PROJECT,
            label: EVENT_LABEL.SHARE_PROJECT,
          });
          setPermissionModalOpen(true);
        }
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

  const renderProjectStatusChip = () => {
    switch (project.status) {
      case ProjectStatus.Open:
        return (
          <Chip
            sx={{ color: "#fff" }}
            label={intl.formatMessage({ id: "app.project.status.open" })}
            color="primary"
            size="small"
          />
        );
      case ProjectStatus.InProgress:
        return (
          <Chip
            sx={{ color: "#fff" }}
            label={intl.formatMessage({ id: "app.project.status.inProgress" })}
            color="warning"
            size="small"
          />
        );
      case ProjectStatus.Completed:
        return (
          <Chip
            label={intl.formatMessage({ id: "app.project.status.closed" })}
            color="success"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  const renderVisibilityIcon = () => {
    switch (project.visibility) {
      case ProjectVisibility.Private:
        return (
          <Tooltip
            title={intl.formatMessage({
              id: "app.project.attribute.visibility.private",
            })}
            placement="right"
          >
            <VisibilityOffOutlined color="info" />
          </Tooltip>
        );
      case ProjectVisibility.Public:
        return (
          <Tooltip
            title={intl.formatMessage({
              id: "app.project.attribute.visibility.public",
            })}
            placement="right"
          >
            <Visibility color="info" />
          </Tooltip>
        );
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
          id="customer-project-overview-menu"
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
              {intl.formatMessage({ id: "app.general.viewDetail" })}
            </MenuItem>

            <MenuItem
              onClick={() => projectMenuOnClick("share")}
              disabled={!canShare()}
            >
              {intl.formatMessage({ id: "app.general.share" })}
            </MenuItem>

            <MenuItem
              onClick={() => projectMenuOnClick("delete")}
              disabled={!canDelete()}
            >
              {intl.formatMessage({ id: "app.general.delete" })}
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
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box>{renderProjectStatusChip()}</Box>
                <Box ml={1}>{renderVisibilityIcon()}</Box>
              </Box>
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
              <Typography variant="caption">
                {parseFloat(project.targetPrice)}
              </Typography>
            </ProjectOverviewListItem>

            <ProjectOverviewListItem>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.general.createdAt",
                })}
                arrow
                placement="top"
              >
                <Create />
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
            projectId={project.id}
            setPermissionModalOpen={setPermissionModalOpen}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CustomerProjectOverviewCard;

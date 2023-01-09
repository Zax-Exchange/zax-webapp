import { useState } from "react";
import Button from "@mui/material/Button";
import {
  Chip,
  Container,
  DialogTitle,
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
import { useNavigate } from "react-router-dom";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import CreateIcon from "@mui/icons-material/Create";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import {
  BidStatus,
  Exact,
  GetVendorProjectsInput,
  InputMaybe,
  ProjectPermission,
  VendorProject,
  VendorProjectOverview,
} from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import React from "react";
import { GENERAL_ROUTES, VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import { GetVendorProjectsQuery } from "../../gql/get/vendor/vendor.generated";
import { useIntl } from "react-intl";
import VendorPermissionModal from "./modals/VendorPermissionModal";
import { ErrorOutline, EventAvailableOutlined } from "@mui/icons-material";

type ProjectMenuOption = "view-detail" | "share";

const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const VendorProjectOverviewCard = ({
  project,
  setIsProjectPageLoading,
  getVendorProjectsRefetch,
}: {
  project: VendorProjectOverview;
  setIsProjectPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getVendorProjectsRefetch: (
    variables?:
      | Partial<
          Exact<{
            data: GetVendorProjectsInput;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetVendorProjectsQuery>>;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const projectMenuOpen = !!projectMenuAnchor;

  const moreOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setProjectMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setProjectMenuAnchor(null);
  };

  const viewDetailHandler = () => {
    const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");
    dest[1] = project.id;
    navigate(`${dest.join("")}`);
  };

  const canShare = () => {
    return project.permission !== ProjectPermission.Viewer;
  };

  const projectMenuOnClick = (action: ProjectMenuOption) => {
    if (action === "view-detail") {
      viewDetailHandler();
    }
    if (action === "share" && canShare()) {
      setPermissionModalOpen(true);
    }

    moreOnClose();
  };

  const renderBidStatusChip = () => {
    switch (project.bidStatus) {
      case BidStatus.Open:
        return (
          <Tooltip
            title={intl.formatMessage({ id: "app.bid.status.open.tooltip" })}
            placement="top"
            arrow
          >
            <EventAvailableOutlined color="success" />
          </Tooltip>
        );
      case BidStatus.Outdated:
        return (
          <Tooltip
            title={intl.formatMessage({
              id: "app.bid.status.outdated.tooltip",
            })}
            placement="top"
            arrow
          >
            <ErrorOutline color="warning" />
          </Tooltip>
        );
    }
    return null;
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
            <MenuItem onClick={() => projectMenuOnClick("view-detail")}>
              {intl.formatMessage({ id: "app.general.viewDetail" })}
            </MenuItem>

            <MenuItem
              onClick={() => projectMenuOnClick("share")}
              disabled={!canShare()}
            >
              {intl.formatMessage({ id: "app.general.share" })}
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
              {renderBidStatusChip()}
            </ProjectOverviewListItem>
            <ProjectOverviewListItem>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.project.attribute.companyName",
                })}
                arrow
                placement="top"
              >
                <BusinessIcon />
              </Tooltip>
              <Typography variant="caption">{project.companyName}</Typography>
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
                <CreateIcon />
              </Tooltip>
              <Typography variant="caption">
                {project.createdAt.slice(0, 10)}
              </Typography>
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
          <VendorPermissionModal
            project={project}
            setPermissionModalOpen={setPermissionModalOpen}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default VendorProjectOverviewCard;

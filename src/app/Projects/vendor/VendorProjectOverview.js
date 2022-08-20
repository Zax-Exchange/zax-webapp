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

const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const VendorProjectOverview = ({ project }) => {
  const navigate = useNavigate();
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState(null);

  const projectMenuOpen = !!projectMenuAnchor;
  const date = new Date(Date(project.createdAt)).toISOString().slice(0, 10);

  const moreOnClick = (e) => {
    setProjectMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setProjectMenuAnchor(null);
  };

  const viewDetailHandler = () => {
    navigate(`/vendor-project-detail/${project.id}`);
  };

  const canShare = () => {
    return true;
  };

  const projectMenuOnClick = (e) => {
    if (e.target.innerText === "View detail") {
      viewDetailHandler();
    }
    if (e.target.innerText === "Share" && canShare()) {
      setIsPermissionOpen(true);
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
          // ":hover": { backgroundColor: "#f8f8f8", cursor: "pointer" },
        }}
        // onClick={viewDetailHandler}
      >
        <IconButton
          sx={{ position: "absolute", right: "4px" }}
          id="long-button"
          onClick={moreOnClick}
          onClose={moreOnClose}
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
          </MenuList>
        </Menu>

        <Container sx={{ minHeight: 240, paddingTop: 2, paddingBottom: 2 }}>
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
        open={isPermissionOpen}
        onClose={() => setIsPermissionOpen(false)}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent>
          <ProjectPermissionModal
            project={project}
            setIsPermissionOpen={setIsPermissionOpen}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default VendorProjectOverview;

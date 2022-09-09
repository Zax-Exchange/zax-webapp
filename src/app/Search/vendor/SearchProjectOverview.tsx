import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
  List,
  Tooltip,
} from "@mui/material";
import React from "react";
import { ProjectOverview } from "../../../generated/graphql";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";

const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

export type SearchProjectDetailLocationState = {
  customerName: string;
};
const SearchProjectOverview = ({
  projectData,
}: {
  projectData: ProjectOverview;
}) => {
  const navigate = useNavigate();

  const handleProjectOnClick = (projectId: string) => {
    const dest = VENDOR_ROUTES.SEARCH_PROJECT_DETAIL.split(":");
    dest[1] = projectId;
    navigate(`${dest.join("")}`);
  };

  const date = new Date(parseInt(projectData.createdAt, 10))
    .toISOString()
    .slice(0, 10);

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card
        className="search-project-overview-container"
        onClick={() => handleProjectOnClick(projectData.id)}
        variant="elevation"
        elevation={2}
      >
        <CardActionArea>
          <CardContent>
            <Container sx={{ minWidth: 400, textAlign: "left" }}>
              <Typography variant="h6" align="left">
                {projectData.name}
              </Typography>
              <List>
                <ProjectOverviewListItem>
                  <Tooltip title="Products" arrow placement="top">
                    <CategoryIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.products.join(", ")}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="Customer" arrow placement="top">
                    <BusinessIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.companyName}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="Delivery address" arrow placement="top">
                    <PlaceIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.deliveryAddress}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="Budget" arrow placement="top">
                    <AttachMoneyIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    $ {projectData.budget}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="Delivery date" arrow placement="top">
                    <LocalShippingOutlinedIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.deliveryDate}
                  </Typography>
                </ProjectOverviewListItem>
                {/* <ProjectOverviewListItem>
                  <Tooltip title="Posted on" arrow placement="top">
                    <CalendarMonthIcon />
                  </Tooltip>
                  <Typography variant="caption">{date}</Typography>
                </ProjectOverviewListItem> */}
              </List>
            </Container>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default SearchProjectOverview;

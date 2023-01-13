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
import { useIntl } from "react-intl";
import { productValueToLabelMap } from "../../constants/products";
import { Inventory } from "@mui/icons-material";

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
  const intl = useIntl();
  const navigate = useNavigate();

  const handleProjectOnClick = (projectId: string) => {
    const dest = VENDOR_ROUTES.SEARCH_PROJECT_DETAIL.split(":");
    dest[1] = projectId;
    navigate(`${dest.join("")}`);
  };

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card
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
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.vendor.project.attribute.products",
                    })}
                    arrow
                    placement="top"
                  >
                    <Inventory />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.products
                      .map((product) =>
                        intl.formatMessage({
                          id: productValueToLabelMap[product].labelId,
                        })
                      )
                      .join(", ")}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.project.attribute.category",
                    })}
                    arrow
                    placement="top"
                  >
                    <CategoryIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.category}
                  </Typography>
                </ProjectOverviewListItem>
                <ProjectOverviewListItem>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.vendor.project.attribute.customer",
                    })}
                    arrow
                    placement="top"
                  >
                    <BusinessIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.companyName}
                  </Typography>
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
                    {projectData.deliveryAddress}
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
                    {parseFloat(projectData.targetPrice)}
                  </Typography>
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

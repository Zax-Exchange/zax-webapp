import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
  List,
  Tooltip,
  Chip,
} from "@mui/material";
import React from "react";
import { ProjectOverview, SearchResultProjectOverview } from "../../../generated/graphql";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { useIntl } from "react-intl";
import { productValueToLabelMap } from "../../constants/products";
import { Inventory, MonetizationOn } from "@mui/icons-material";

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

function BiddingChip(props: { bidInfo: any; }) {
  const bidInfo = props.bidInfo;
  const intl = useIntl();
  if (!bidInfo.hasBids) {
    return null
  }

  if (bidInfo.hasBids && !bidInfo.biddedByUserCompany) {
    return (<ProjectOverviewListItem>
      <Chip
        color="primary"
        size="small"
        label={intl.formatMessage({
          id: "app.bid.attribute.bidded",
        })}
        icon={<MonetizationOn/>}
      />
    </ProjectOverviewListItem>)
  }

  return (<ProjectOverviewListItem>
    <Chip
      color="secondary"
      size="small"
      label={intl.formatMessage({
        id: "app.bid.attribute.bidded.by.own.company",
      })}
      icon={<MonetizationOn/>}
    />
  </ProjectOverviewListItem>)
}

const SearchProjectOverview = ({
  projectData,
}: {
  projectData: SearchResultProjectOverview;
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
                    placement="left"
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
                    placement="left"
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
                      id: "app.project.attribute.deliveryAddress",
                    })}
                    placement="left"
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
                    placement="left"
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
                    placement="left"
                  >
                    <LocalShippingOutlinedIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {projectData.deliveryDate}
                  </Typography>
                </ProjectOverviewListItem>
                <BiddingChip bidInfo={projectData.bidInfo} />
                {/* <ProjectOverviewListItem>
                  <Tooltip title="Posted on"  placement="top">
                    <CalendarMonthIcon />
        left     </Tooltip>
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

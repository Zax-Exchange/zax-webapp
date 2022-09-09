import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  List,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { VendorOverview } from "../../../generated/graphql";
import FactoryIcon from "@mui/icons-material/Factory";
import MuiListItem from "@mui/material/ListItem";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "@emotion/styled";
import TimelineIcon from "@mui/icons-material/Timeline";

const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const SearchCompanyOverview = ({
  companyData,
}: {
  companyData: VendorOverview;
}) => {
  const openVendorDetail = () => {};

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card onClick={openVendorDetail} variant="elevation" elevation={2}>
        <CardActionArea>
          <CardContent>
            <Container sx={{ minWidth: 400, textAlign: "left" }}>
              <Typography variant="h6" align="left">
                {companyData.name}
              </Typography>
              <List>
                <ProjectOverviewListItem>
                  <Tooltip title="Manufacturing Products" arrow placement="top">
                    <CategoryIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {companyData.products.join(", ")}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="Factory Locations" arrow placement="top">
                    <FactoryIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {companyData.locations.join(", ")}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="Typical Lead Time" arrow placement="top">
                    <AccessTimeIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {companyData.leadTime} Months
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip title="MOQ Range" arrow placement="top">
                    <TimelineIcon />
                  </Tooltip>
                  <Typography variant="caption">{companyData.moq}</Typography>
                </ProjectOverviewListItem>
              </List>
            </Container>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* <Dialog>
      <DialogContent>

      </DialogContent>
    </Dialog> */}
    </Container>
  );
};

export default SearchCompanyOverview;

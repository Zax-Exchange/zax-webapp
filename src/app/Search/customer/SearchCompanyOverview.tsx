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
import { CUSTOMER_ROUTES } from "../../constants/loggedInRoutes";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { productValueToLabelMap } from "../../constants/products";

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
  const intl = useIntl();
  const navigate = useNavigate();
  const openVendorDetail = () => {
    const dest = CUSTOMER_ROUTES.VENDOR_PROFILE.split(":");
    dest[1] = companyData.id;

    navigate(`${dest.join("")}`);
  };
  console.log(companyData);
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
                    {companyData.products
                      .map((product) => {
                        return intl.formatMessage({
                          id: productValueToLabelMap[product].labelId,
                        });
                      })
                      .join(",")}
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
                    {companyData.leadTime}{" "}
                    {intl.formatMessage({ id: "app.general.month" })}
                  </Typography>
                </ProjectOverviewListItem>

                {/* <ProjectOverviewListItem>
                  <Tooltip title="MOQ Range" arrow placement="top">
                    <TimelineIcon />
                  </Tooltip>
                  <Typography variant="caption">{companyData.moq}</Typography>
                </ProjectOverviewListItem> */}
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

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
import { VendorSearchItem } from "../../../generated/graphql";

const ProjectOverviewListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    marginLeft: 16,
  },
}));

const SearchCompanyOverview = ({
  searchResult,
}: {
  searchResult: VendorSearchItem;
}) => {
  const { vendor: companyData, highlight } = searchResult;
  console.log(highlight);
  const intl = useIntl();
  const navigate = useNavigate();
  const openVendorDetail = () => {
    const dest = CUSTOMER_ROUTES.VENDOR_PROFILE.split(":");
    dest[1] = companyData.id;

    navigate(`${dest.join("")}`);
  };
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
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.vendor.attribute.products",
                    })}
                    arrow
                    placement="top"
                  >
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
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.vendor.attribute.locations",
                    })}
                    arrow
                    placement="top"
                  >
                    <FactoryIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {companyData.locations.join(", ")}
                  </Typography>
                </ProjectOverviewListItem>

                <ProjectOverviewListItem>
                  <Tooltip
                    title={intl.formatMessage({
                      id: "app.vendor.attribute.leadTime",
                    })}
                    arrow
                    placement="top"
                  >
                    <AccessTimeIcon />
                  </Tooltip>
                  <Typography variant="caption">
                    {intl.formatMessage(
                      { id: "app.general.months" },
                      {
                        month: companyData.leadTime,
                      }
                    )}
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

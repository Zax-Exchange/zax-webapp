import {
  Box,
  Container,
  List,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { productValueToLabelMap } from "../../constants/products";
import { GetAllPlansQuery } from "../../gql/get/company/company.generated";

import { ListItem } from "../customer/CustomerCompanyReview";
import { VendorSignupData, VendorSubscriptionInfo } from "./VendorSignup";

const VendorCompanyReview = ({
  values,
  subscriptionInfo,
  getAllPlansData,
}: {
  values: VendorSignupData;
  subscriptionInfo: VendorSubscriptionInfo;
  getAllPlansData: GetAllPlansQuery;
}) => {
  const intl = useIntl();
  const plan = getAllPlansData!.getAllPlans!.find(
    (plan) => plan!.id === values.planId
  );

  // const renderFrequency = () => {
  //   if (subscriptionInfo.billingFrequency === "annual") {
  //     return "year";
  //   } else {
  //     return "month";
  //   }
  // };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        {intl.formatMessage({ id: "app.signup.reviewCompany" })}
      </Typography>
      <Container maxWidth="sm">
        <List>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.company.attribute.billingEmail" })}
            </Typography>
            <Typography variant="caption">{values.userEmail}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.company.attribute.companyName" })}
            </Typography>
            <Typography variant="caption">{values.name}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.company.attribute.contactEmail" })}
            </Typography>
            <Typography variant="caption">{values.contactEmail}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.company.attribute.phone" })}
            </Typography>
            <Typography variant="caption">{values.phone}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.company.attribute.country" })}
            </Typography>
            <Typography variant="caption">{values.country}</Typography>
          </ListItem>
          {values.companyUrl && (
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.company.attribute.companyUrl",
                })}
              </Typography>
              <Typography variant="caption">{values.companyUrl}</Typography>
            </ListItem>
          )}

          {values.fax && (
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.company.attribute.fax",
                })}
              </Typography>
              <Typography variant="caption">{values.fax}</Typography>
            </ListItem>
          )}
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.vendor.attribute.leadTime" })}
            </Typography>
            <Typography variant="caption">{values.leadTime}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.vendor.attribute.locations" })}
            </Typography>
            <Typography variant="caption">
              {values.locations.join(",")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.vendor.attribute.productsAndMoq",
              })}
            </Typography>
            <Box display="flex" flexDirection="column">
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {intl.formatMessage({
                        id: "app.component.attribute.product",
                      })}
                    </TableCell>
                    <TableCell>
                      {intl.formatMessage({
                        id: "app.vendor.attribute.moq",
                      })}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.productsAndMoq.map((productAndMoq) => {
                    return (
                      <TableRow>
                        <TableCell>
                          {intl.formatMessage({
                            id: productValueToLabelMap[productAndMoq.product]
                              .labelId,
                          })}
                        </TableCell>
                        <TableCell>{productAndMoq.moq}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </TableContainer>
            </Box>
          </ListItem>

          {plan && (
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({ id: "app.signup.pricingDetail" })}
              </Typography>
              <Typography variant="caption">
                ${plan.pricings!.monthly!.price} /{" "}
                {intl.formatMessage({ id: "app.general.month" })}
              </Typography>
            </ListItem>
          )}
        </List>
      </Container>
    </>
  );
};

export default VendorCompanyReview;

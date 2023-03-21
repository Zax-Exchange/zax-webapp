import styled from "@emotion/styled";
import { Container, List, Typography } from "@mui/material";
import MuiListItem from "@mui/material/ListItem";
import React from "react";
import { useIntl } from "react-intl";
import { GetAllPlansQuery } from "../../gql/get/company/company.generated";
import { CustomerSignupData, SubscriptionInfo } from "./CustomerSignup";

export const ListItem = styled(MuiListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
  },
}));

const CustomerCompanyReview = ({
  values,
  getAllPlansData,
  subscriptionInfo,
}: {
  values: CustomerSignupData;
  getAllPlansData: GetAllPlansQuery;
  subscriptionInfo: SubscriptionInfo;
}) => {
  const intl = useIntl();

  return (
    <>
      <Typography
        textAlign="left"
        variant="h6"
        fontSize="1.2em"
        sx={{ marginBottom: 4 }}
      >
        {intl.formatMessage({ id: "app.signup.reviewCompany" })}
      </Typography>
      <Container maxWidth="sm" disableGutters sx={{ margin: 0 }}>
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
          {values.companyUrl !== "https://" && (
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

          {/* <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.signup.pricingDetail" })}
            </Typography>
            <Typography variant="caption">
              ${subscriptionInfo.price} /{" "}
              {intl.formatMessage({ id: "app.general.month" })}
            </Typography>
          </ListItem> */}

          {/* <ListItem>
            <Typography variant="subtitle2">Selected Plan</Typography>
            <Typography variant="caption">{plan!.tier} Plan</Typography>
          </ListItem>

          <ListItem>
            <Typography variant="subtitle2">Billing Detail</Typography>
            <Typography variant="caption">
              ${subscriptionInfo.price} {subscriptionInfo.billingFrequency}
            </Typography>
          </ListItem> */}
        </List>
      </Container>
    </>
  );
};

export default CustomerCompanyReview;

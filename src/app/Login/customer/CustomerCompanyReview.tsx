import styled from "@emotion/styled";
import { Container, List, Stack, Typography } from "@mui/material";
import MuiListItem from "@mui/material/ListItem";
import React from "react";
import { GetAllPlansData } from "../../hooks/types/plan/getPlanTypes";
import { CompanySignupData, SubscriptionInfo } from "./CustomerSignup";

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
  values: CompanySignupData;
  getAllPlansData: GetAllPlansData;
  subscriptionInfo: SubscriptionInfo;
}) => {
  const plan = getAllPlansData.getAllPlans.find(
    (plan) => plan.id === values.planId
  );

  return (
    <>
      <Typography
        textAlign="left"
        variant="h6"
        fontSize="1.2em"
        sx={{ marginBottom: 4 }}
      >
        Review your company information
      </Typography>
      <Container maxWidth="sm" disableGutters sx={{ margin: 0 }}>
        <List>
          <ListItem>
            <Typography variant="subtitle2">Billing Email</Typography>
            <Typography variant="caption">{values.userEmail}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">Company Name</Typography>
            <Typography variant="caption">{values.name}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">Company Contact Email</Typography>
            <Typography variant="caption">{values.contactEmail}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">Company Phone</Typography>
            <Typography variant="caption">{values.phone}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">Company Country</Typography>
            <Typography variant="caption">{values.country}</Typography>
          </ListItem>
          {values.companyUrl && (
            <ListItem>
              <Typography variant="subtitle2">Company URL</Typography>
              <Typography variant="caption">{values.companyUrl}</Typography>
            </ListItem>
          )}

          {values.fax && (
            <ListItem>
              <Typography variant="subtitle2">Company Fax</Typography>
              <Typography variant="caption">{values.fax}</Typography>
            </ListItem>
          )}

          <ListItem>
            <Typography variant="subtitle2">Selected Plan</Typography>
            <Typography variant="caption">{plan!.tier} Plan</Typography>
          </ListItem>

          <ListItem>
            <Typography variant="subtitle2">Billing Detail</Typography>
            <Typography variant="caption">
              ${subscriptionInfo.price} {subscriptionInfo.billingFrequency}
            </Typography>
          </ListItem>
        </List>
      </Container>
    </>
  );
};

export default CustomerCompanyReview;

import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import groupPlan from "../../../static/groupPlan.svg";
import businessPlan from "../../../static/businessPlan.svg";
import { Plan } from "../../../generated/graphql";
import { VendorSubscriptionInfo } from "./VendorSignup";

const PlanListItem = styled(ListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  "&.MuiTypography-root": {
    textAlign: "left",
  },
  "&.MuiListItem-root": {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const VendorPlanSelection = ({
  planData,
  selectPlan,
  setSubscriptionInfo,
}: {
  planData: Plan | null;
  selectPlan: (planId: string) => void;
  setSubscriptionInfo: React.Dispatch<
    React.SetStateAction<VendorSubscriptionInfo>
  >;
}) => {
  const { id, tier, pricings } = planData!;

  const { monthly, perUser } = pricings;

  const planOnClick = (data: VendorSubscriptionInfo) => {
    setSubscriptionInfo({
      ...data,
    });
    selectPlan(id);
  };

  let svg;

  if (tier === "PREMIUM") svg = groupPlan;
  if (tier === "BUSINESS") svg = businessPlan;

  return (
    <Card elevation={3}>
      <CardMedia
        component="img"
        height="250"
        src={svg}
        sx={{
          objectFit: "contain",
          padding: "14px",
          width: "21em",
          marginLeft: "10px",
        }}
      />
      <CardContent>
        <List sx={{ padding: 0 }}>
          <ListItem>
            <Typography textAlign="left" variant="h6">
              {tier} Plan
            </Typography>
          </ListItem>

          <PlanListItem>
            <Typography variant="subtitle2">Price</Typography>
            {monthly && (
              <Typography variant="overline">
                ${monthly.price} / Month
              </Typography>
            )}
            {/* <Typography variant="overline">
              ${monthly.price}/month or ${annual.price}/year (10% off) + $
              {perUser.price}
              /user
            </Typography> */}
          </PlanListItem>
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <Button
          variant="outlined"
          onClick={() =>
            planOnClick({
              subscriptionPriceId: monthly!.priceId,
              perUserPriceId: perUser.priceId,
              billingFrequency: "monthly",
            })
          }
        >
          Monthly Plan
        </Button>
        {/* <Button
          variant="outlined"
          onClick={() =>
            planOnClick({
              subscriptionPriceId: annual.priceId,
              perUserPriceId: perUser.priceId,
              billingFrequency: "annual",
            })
          }
        >
          Annual Plan
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default VendorPlanSelection;

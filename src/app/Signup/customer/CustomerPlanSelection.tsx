import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Plan } from "../../../generated/graphql";
import { SubscriptionInfo } from "./CustomerSignup";
import groupPlan from "../../../static/groupPlan.svg";
import businessPlan from "../../../static/businessPlan.svg";

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

const mock = [
  {
    title: "Premium",
    price: "$20",
    features: ["Money back guarantee", "All features", "24/7 customer support"],
    isHighlighted: true,
  },
];
const CustomerPlanSelection = ({
  planData,
  selectPlan,
  setSubscriptionInfo,
  nextPage,
}: {
  planData: Plan | null;
  selectPlan: (planId: string) => void;
  setSubscriptionInfo: React.Dispatch<React.SetStateAction<SubscriptionInfo>>;
  nextPage: () => Promise<void>;
}) => {
  const theme = useTheme();
  const { id, tier, pricings } = planData!;

  const { perUser } = pricings;

  const planOnClick = (
    priceId: string,
    price: number,
    billingFrequency: string
  ) => {
    setSubscriptionInfo({
      price,
      priceId,
      billingFrequency,
    });
    selectPlan(id);
    nextPage();
  };

  let svg;

  if (tier === "PREMIUM") svg = groupPlan;
  if (tier === "BUSINESS") svg = businessPlan;

  return (
    <Card
      elevation={3}
      onClick={() =>
        planOnClick(perUser.priceId, perUser.price, "Monthly/User")
      }
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          src={svg}
          sx={{
            objectFit: "contain",
            padding: "14px",
            width: "13em",
            marginLeft: "10px",
          }}
        />
        <CardContent>
          <List sx={{ padding: 0 }}>
            <ListItem>
              <Typography textAlign="left" variant="h6">
                Premium Plan
              </Typography>
            </ListItem>

            <PlanListItem>
              <Typography variant="caption" color="text.primary">
                ${perUser.price}/mo per user
              </Typography>
            </PlanListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerPlanSelection;

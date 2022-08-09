import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import singlePlan from "../../../static/singlePlan.svg";
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

const CustomerPlanSelection = ({
  planData,
  selectPlan,
  setSubscriptionInfo,
  nextPage,
}) => {
  const { id, tier, pricings } = planData;

  const { perUser } = pricings;

  const planOnClick = (priceId, price, billingFrequency) => {
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
                {tier} Plan
              </Typography>
            </ListItem>

            <PlanListItem>
              <Typography variant="subtitle2">Price</Typography>
              <Typography variant="overline">
                ${perUser.price}/user each month
              </Typography>
            </PlanListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CustomerPlanSelection;

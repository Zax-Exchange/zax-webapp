import styled from "@emotion/styled";
import { Button, Card, CardActions, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material";
import singlePlan from "../../../static/singlePlan.svg";
import groupPlan from "../../../static/groupPlan.svg";
import businessPlan from "../../../static/businessPlan.svg";

const PlanListItem = styled(ListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  "&.MuiTypography-root": {
    textAlign: "left"
  },
  "&.MuiListItem-root": {
    paddingTop: 0,
    paddingBottom: 0
  }
}));

const CustomerPlanSelection = ({
  planData,
  selectPlan,
  setSubscriptionInfo
}) => {

  const {
    id,
    name,
    licensedUsers,
    pricings
  } = planData;

  const {
    monthly,
    annual,
    additionalLicense
  } = pricings;

  const planOnClick = (priceId, price, billingFrequency) => {
    setSubscriptionInfo({
      price,
      priceId,
      billingFrequency
    });
    selectPlan(id);
  };

  let svg;

  if (name === "Individual") svg = singlePlan;
  if (name === "Group") svg = groupPlan;
  if (name === "Business") svg = businessPlan;
  
  return <Card elevation={3} sx={{":hover": { backgroundColor: "#fcfafa"}}}>
      <CardMedia 
        component="img"
        height="250"
        src={svg}
        sx={{
          objectFit: "contain",
          padding: "14px",
          width: "13em",
          marginLeft: "10px"
        }}
      />
      <CardContent>
        <List sx={{padding: 0}}>
          <ListItem>

          <Typography textAlign="left" variant="h6">{name} Plan</Typography>
          </ListItem>

          <PlanListItem>
            
          <Typography variant="subtitle2" >Licensed Users</Typography>
          <Typography variant="overline">{licensedUsers} starting users</Typography>
          </PlanListItem>

          <PlanListItem>
            <Typography variant="subtitle2">Additional License</Typography>
            <Typography variant="overline">${additionalLicense.price}/user</Typography>
          </PlanListItem>

          <PlanListItem>
            
            <Typography variant="subtitle2">Price</Typography>
            <Typography variant="overline">${monthly.price}/month or ${annual.price}/year</Typography>
          </PlanListItem>
        </List>
      </CardContent>

      <CardActions sx={{justifyContent: "space-around"}}>
        <Button variant="outlined" size="small" onClick={() => planOnClick(monthly.priceId, monthly.price, "Monthly")}>Monthly</Button>
        <Button variant="outlined" size="small" onClick={() => planOnClick(annual.priceId, annual.price, "Annually")}>Annual</Button>
      </CardActions>
  </Card>
}

export default CustomerPlanSelection;
import styled from "@emotion/styled";
import { Button, Card, CardActions, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material";
import singlePlan from "../../../static/singlePlan.svg";

const PlanListItem = styled(ListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  "&.MuiTypography-root": {
    textAlign: "left"
  }
}));

const CustomerPlanSelection = ({
  planData,
  selectPlan,
  setPriceId
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

  const planOnClick = (priceId) => {
    setPriceId(priceId);
    selectPlan(id);
  };

  return <Card>
      <CardMedia 
        component="img"
        height="250"
        src={singlePlan}
      />
      <CardContent>
        <List sx={{padding: 0}}>
          <ListItem>

          <Typography textAlign="left" variant="h6">{name} Plan</Typography>
          </ListItem>

          <PlanListItem>
            
          <Typography variant="subtitle2">Licensed Users</Typography>
          <Typography variant="overline">{licensedUsers} starting users</Typography>
          </PlanListItem>

          <PlanListItem>
            <Typography variant="subtitle2">Additional License</Typography>
            <Typography variant="overline">$ {additionalLicense.price}/user</Typography>
          </PlanListItem>

          <PlanListItem>
            
            <Typography variant="subtitle2">Price</Typography>
            <Typography variant="overline">${monthly.price}/month or ${annual.price}/year</Typography>
          </PlanListItem>
        </List>
      </CardContent>

      <CardActions sx={{justifyContent: "space-around"}}>
        <Button variant="outlined" size="small" onClick={() => planOnClick(monthly.priceId)}>Monthly</Button>
        <Button variant="outlined" size="small" onClick={() => planOnClick(annual.priceId)}>Annual</Button>
      </CardActions>
  </Card>
}

export default CustomerPlanSelection;
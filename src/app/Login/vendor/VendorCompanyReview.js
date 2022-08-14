import { Container, List, Typography } from "@mui/material";
import { ListItem } from "../customer/CustomerCompanyReview";

const VendorCompanyReview = ({ values, subscriptionInfo, getAllPlansData }) => {
  const plan = getAllPlansData.getAllPlans.find(
    (plan) => plan.id === values.planId
  );

  const renderFrequency = () => {
    if (subscriptionInfo.billingFrequency === "annual") {
      return "year";
    } else {
      return "month";
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Review your company information
      </Typography>
      <Container maxWidth="sm">
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
            <Typography variant="subtitle2">Lead Time</Typography>
            <Typography variant="caption">{values.leadTime}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">Facotry Locations</Typography>
            <Typography variant="caption">
              {values.locations.join(",")}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">MOQ Range</Typography>
            <Typography variant="caption">{values.moq}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle2">Materials</Typography>
            <Typography variant="caption">
              {values.materials.join(",")}
            </Typography>
          </ListItem>

          <ListItem>
            <Typography variant="subtitle2">Pricing Detail</Typography>
            <Typography variant="caption">
              ${plan.pricings.monthly.price} / month
            </Typography>
            {/* <Typography variant="caption">
              ${plan.pricings.perUser.price} / user each month
            </Typography> */}
          </ListItem>
        </List>
      </Container>
    </>
  );
};

export default VendorCompanyReview;

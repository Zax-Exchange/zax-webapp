import { Container, List, Typography, TypographyProps } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import FullScreenLoading from "../Utils/Loading";
import MuiListItem from "@mui/material/ListItem";
import styled from "@emotion/styled";
import React from "react";
import useCustomSnackbar from "../Utils/CustomSnackbar";
import { useGetCompanyPlanDetailQuery } from "../gql/get/company/company.generated";

const ListItem = styled(MuiListItem)(() => ({
  justifyContent: "flex-start",
  paddingLeft: 0,
  "& .MuiTypography-root": {
    textAlign: "left",
    ":nth-of-type(1)": {
      flexBasis: "50%",
    },
    ":nth-of-type(2)": {
      flexBasis: "30%",
    },
  },
}));

const TitleTypography = styled((props: TypographyProps) => (
  <Typography {...props} variant="subtitle2" />
))();
const DetailTypography = styled((props: TypographyProps) => (
  <Typography {...props} variant="caption" />
))();

// not used for now
/** ADMIN VIEW */
const CurrentPlan = () => {
  const { user } = useContext(AuthContext);
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const {
    data: getCompanyPlanData,
    error: getCompanyPlanError,
    loading: getCompanyPlanLoading,
  } = useGetCompanyPlanDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  useEffect(() => {
    if (getCompanyPlanError) {
      setSnackbar({
        severity: "error",
        message: "Something went wrong. Please try again later.",
      });
      setSnackbarOpen(true);
    }
  }, [getCompanyPlanError]);

  if (getCompanyPlanLoading) {
    return <FullScreenLoading />;
  }

  if (getCompanyPlanError) {
    return null;
  }

  if (getCompanyPlanData && getCompanyPlanData.getCompanyPlanDetail) {
    const {
      tier,
      price,
      billingFrequency,
      memberSince,
      subscriptionStartDate,
      subscriptionEndDate,
      trialStartDate,
      trialEndDate,
    } = getCompanyPlanData.getCompanyPlanDetail;

    return (
      <Container>
        <Typography variant="h6">Current Plan</Typography>

        <List>
          {/* <ListItem>
            <TitleTypography>Plan</TitleTypography>
            <DetailTypography>{name} plan</DetailTypography>
          </ListItem> */}

          {tier && (
            <ListItem>
              <TitleTypography>Tier</TitleTypography>
              <DetailTypography>{tier}</DetailTypography>
            </ListItem>
          )}

          <ListItem>
            <TitleTypography>Price</TitleTypography>
            <DetailTypography>
              ${price} / {billingFrequency}
            </DetailTypography>
          </ListItem>

          <ListItem>
            <TitleTypography>Member since</TitleTypography>
            <DetailTypography>{memberSince}</DetailTypography>
          </ListItem>

          <ListItem>
            <TitleTypography>Subscription start</TitleTypography>
            <DetailTypography>{subscriptionStartDate}</DetailTypography>
          </ListItem>

          <ListItem>
            <TitleTypography>Subscription end</TitleTypography>
            <DetailTypography>{subscriptionEndDate}</DetailTypography>
          </ListItem>

          {trialStartDate && (
            <>
              <ListItem>
                <TitleTypography>Trial start</TitleTypography>
                <DetailTypography>{trialStartDate}</DetailTypography>
              </ListItem>

              <ListItem>
                <TitleTypography>Trial end</TitleTypography>
                <DetailTypography>{trialEndDate}</DetailTypography>
              </ListItem>
            </>
          )}
        </List>
      </Container>
    );
  }
  return null;
};

export default CurrentPlan;

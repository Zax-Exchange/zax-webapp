import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Divider, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomSnackbar from "../Utils/CustomSnackbar";
import InviteUsers from "./InviteUsers";
import UpdateBillingEmail from "./UpdateBillingEmail";
import EditCompanyProfile from "./EditCompanyProfile";
import DeactivateUsers from "./DeactivateUsers";
import ChangePassword from "./ChangePassword";
import ChangePlan from "./ChangePlan";
import CurrentPlan from "./CurrentPlan";

const NoWrapListItemText = styled((props) => {
  return <ListItemText {...props} primary={<Typography variant="subtitle2" color="#545454" fontSize="0.9em">{props.text}</Typography>}/>
})(({ theme }) => ({
  whiteSpace: "nowrap",
  "& > .MuiTypography-root": {
    textOverflow: "ellipsis",
    overflow: "auto",
  }
}))

const SettingsAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
}));

const SettingsAccordionSummary = styled((props) => {
  return <AccordionSummary {...props} expandIcon={<ExpandMore />}/>
})(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#eee'
  }
}));

const SettingsTitleTypography = styled((props) => {
  return <Typography variant="h6" {...props}/>
})(() => ({
  fontSize: 16
}));

const Settings = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.isAdmin;
  const [view, setView] = useState(null);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  

  const renderSettingsView = () => {
    if (!view) return null;

    if (view === "change-password") {
      return <ChangePassword 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }

    if (view === "edit-company-profile") {
      return <EditCompanyProfile 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }
    if (view === "invite-users") {
      return <InviteUsers 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }

    if (view === "deactivate-users") {
      return <DeactivateUsers 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }
    if (view === "update-billing-email") {
      return <UpdateBillingEmail 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }
    if (view === "change-plan") {
      return <ChangePlan 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }

    if (view === "view-current-plan") {
      return <CurrentPlan 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }
  }

  return (
    <Container maxWidth="lg">
      <CustomSnackbar direction="right" severity={snackbar.severity} message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
      <Grid container spacing={2.5}>
        <Grid item xs={3.5}>
          <Paper sx={{borderRadius: 1}}>
            <SettingsAccordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
              <SettingsAccordionSummary>
                <SettingsTitleTypography>Account Settings</SettingsTitleTypography>
              </SettingsAccordionSummary>
              <AccordionDetails>
                <Stack>
                  {/* <ListItem disableGutters>
                    <ListItemButton>
                      <NoWrapListItemText primary="Edit user profile"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem> */}

                  <ListItem disableGutters onClick={() => setView("change-password")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Change password"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>
                </Stack>
              </AccordionDetails>
            </SettingsAccordion>

            <SettingsAccordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
              <SettingsAccordionSummary>
                <SettingsTitleTypography>Company Settings</SettingsTitleTypography>
              </SettingsAccordionSummary>
              <AccordionDetails>
                <Stack>
                  <ListItem disableGutters onClick={() => setView("edit-company-profile")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Edit company profile"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemButton>
                      <NoWrapListItemText text="Upload certifications"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemButton>
                      <NoWrapListItemText text="Request verification"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemButton>
                      <NoWrapListItemText text="Deactivate company"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>
                </Stack>
              </AccordionDetails>
            </SettingsAccordion>

            <SettingsAccordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
              <SettingsAccordionSummary>
                <SettingsTitleTypography>Manage Company Users</SettingsTitleTypography>
              </SettingsAccordionSummary>
              <AccordionDetails>
                <Stack>
                  <ListItem disableGutters onClick={() => setView("invite-users")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Invite users"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters onClick={() => setView("deactivate-users")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Deactivate users"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters onClick={() => setView("update-user-status")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Update user status"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>
                </Stack>
              </AccordionDetails>
            </SettingsAccordion>

            <SettingsAccordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
              <SettingsAccordionSummary>
                <SettingsTitleTypography>Manage Billing</SettingsTitleTypography>
              </SettingsAccordionSummary>
              <AccordionDetails>
                <Stack>
                  <ListItem disableGutters onClick={() => setView("view-current-plan")}>
                    <ListItemButton>
                      <NoWrapListItemText text="View current plan"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters onClick={() => setView("update-billing-email")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Update billing email"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>
                  
                  <ListItem disableGutters onClick={() => setView("update-billing-card")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Update billing card"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters onClick={() => setView("view-statements")}>
                    <ListItemButton>
                      <NoWrapListItemText text="View statements"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disableGutters onClick={() => setView("change-plan")}>
                    <ListItemButton>
                      <NoWrapListItemText text="Change plan"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>
                </Stack>
              </AccordionDetails>
            </SettingsAccordion>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{minHeight: 200, padding: 2 }}>
            <Box minHeight={200}>
              {renderSettingsView()}
            </Box>
          </Paper>
        </Grid>
        
      </Grid>
    </Container>
  )
};

export default Settings
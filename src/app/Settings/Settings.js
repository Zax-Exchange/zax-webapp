import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Divider, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomSnackbar from "../Utils/CustomSnackbar";
import InviteUsers from "./InviteUsers";
import EditBilling from "./EditBilling";
import EditCompanyProfile from "./EditCompanyProfile";

const NoWrapListItemText = styled(ListItemText)(({ theme }) => ({
  whiteSpace: "nowrap",
  "& > .MuiTypography-root": {
    textOverflow: "ellipsis",
    overflow: "auto"
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


const Settings = () => {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState(null);
  const [panel, setPanel] = useState(null); 
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "",
  });
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isAdmin = user.isAdmin;

  const renderSettingsView = () => {
    if (!view) return <Typography>not set</Typography>

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

    if (view === "edit-billing") {
      return <EditBilling 
        setSnackbar={setSnackbar}
        setSnackbarOpen={setSnackbarOpen}
      />
    }
  }

  const accordionOnChange = (panelName) => {
    setPanel(panelName)
  }
  return (
    <Container maxWidth="lg">
      <CustomSnackbar direction="right" severity={snackbar.severity} message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper sx={{borderRadius: 1}}>
            <SettingsAccordion>
              <SettingsAccordionSummary>
                <Typography>Account</Typography>
              </SettingsAccordionSummary>
              <AccordionDetails>
                <Stack>
                  <ListItem>
                    <ListItemButton>
                      <NoWrapListItemText primary="Edit user profile"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton>
                      <NoWrapListItemText primary="Change password"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>
                </Stack>
              </AccordionDetails>
            </SettingsAccordion>

            <SettingsAccordion>
              <SettingsAccordionSummary>
                <Typography>Company</Typography>
              </SettingsAccordionSummary>
              <AccordionDetails>
                <Stack>
                  <ListItem onClick={() => setView("edit-company-profile")}>
                    <ListItemButton>
                      <NoWrapListItemText primary="Edit company profile"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem onClick={() => setView("invite-users")}>
                    <ListItemButton>
                      <NoWrapListItemText primary="Invite users"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem onClick={() => setView("edit-billing")}>
                    <ListItemButton>
                      <NoWrapListItemText primary="Edit billing"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton>
                      <NoWrapListItemText primary="Change plan"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton>
                      <NoWrapListItemText primary="Upload certifications"></NoWrapListItemText>
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton>
                      <NoWrapListItemText primary="Request verification"></NoWrapListItemText>
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
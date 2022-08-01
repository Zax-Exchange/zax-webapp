import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import "./Nav.scss";
import { Stack, 
  Grid, 
  Drawer, 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText , 
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogContent, 
  AppBar,
  Toolbar,
  InputBase,
  ThemeProvider,
  ListItemIcon
} from "@mui/material";
import { 
  Menu,
  Home,
  Search,
  TextSnippet,
  AccountBox,
  Settings,
  Logout
} from "@mui/icons-material";
import { useContext, useState } from "react";
import CreateProjectMoal from "../Projects/CreateProjectModal";
import { AuthContext } from "../../context/AuthContext";
import { PrimaryButton, buttonTheme } from "../themedComponents/Buttons";
import { Container } from "@mui/system";
import CustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";

const Nav = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  const isVendor = user?.isVendor;

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    severity: "",
    message: ""
  });

  const handleSideNavOnClick = (page) => {
    if (page === "home") {
      navigate("/");
    } else {
      navigate(`/${page}`);
    }
  }

  const renderSideNav = () => {
    return <Drawer
        anchor="left"
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setSideNavOpen(false)}
        onKeyDown={() => setSideNavOpen(false)}
      > 
      <List>
          <ListItem onClick={() => handleSideNavOnClick("home")}>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => handleSideNavOnClick("projects")}>
            <ListItemButton>
              <ListItemIcon>
                <TextSnippet />
              </ListItemIcon>
              <ListItemText primary="Projects"></ListItemText>
            </ListItemButton>
          </ListItem>

          {/* <ListItem onClick={() => handleSideNavOnClick("profile")}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile"></ListItemText>
            </ListItemButton>
          </ListItem> */}

          <ListItem onClick={() => handleSideNavOnClick("settings")}>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings"></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log out"></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  }

  const handleLoggedOutOnClick = (page) => {
    navigate(`/${page}`);
  }
  const renderHamburger = () => {
    return <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2, color: "gray" }}
        onClick={() => setSideNavOpen(true)}
      >
      <Menu />
    </IconButton>;
  }

  const renderAppName = () => {
    return <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ display: { xs: 'none', sm: 'block' }, textAlign: "right", color: "#212d4c" }}
    >
      ZAX EXCHANGE
    </Typography>
  }

  const renderCustomerNav = () => {
    return <>
      <Toolbar>
        {renderHamburger()}

        {renderAppName()}
        
        <SearchBar />

        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <PrimaryButton onClick={() => setIsCreateProjectOpen(true)} variant="contained">CREATE PROJECT</PrimaryButton>
        </Box>
        
      </Toolbar>
      {renderSideNav()}
      <Dialog
        open={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        maxWidth="xl"
        fullWidth={true}
      >
        <DialogContent>
          <CreateProjectMoal 
            setIsCreateProjectOpen={setIsCreateProjectOpen} 
            setSnackbar={setSnackbar}
            setSnackbarOpen={setSnackbarOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  }

  const renderLoggedOutNav = () => {
    return <>
          <Toolbar>
            <Button sx={{ color: "#4c5678" }} variant="primary" onClick={() => handleLoggedOutOnClick("login")}>
              Log In
            </Button>
            <PrimaryButton variant="contained" onClick={() => handleLoggedOutOnClick("company-signup")}>
              Get Started
            </PrimaryButton>

            {renderAppName()}
          </Toolbar>
      </>
  }

  const renderVendorNav = () => {
    return <>
      <Toolbar>
        {renderHamburger()}
        {renderAppName()}
        <SearchBar />
      </Toolbar>
    </>
  }

  return ( <>
    {snackbarOpen && <CustomSnackbar severity={snackbar.severity} direction="right" message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)}/>}
    <ThemeProvider theme={buttonTheme}>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "0px -3px 10px 0px rgb(151 149 149 / 75%)" }}>
          {!user && renderLoggedOutNav()}
          {user && user.isVendor && renderVendorNav()}
          {user && !user.isVendor && renderCustomerNav()}
        </AppBar>
      </Box>
      {renderSideNav()}
      </ThemeProvider>
    </>
  )
}

export default Nav;
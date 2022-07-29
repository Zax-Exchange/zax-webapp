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
import { PrimaryButton, primaryButtonTheme } from "../themedComponents/PrimaryButton";
import { Container } from "@mui/system";
import ProjectSnackbar from "../Utils/ProjectSnackbar";
import FullScreenLoading from "../Utils/Loading";

const Nav = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  const isVendor = user?.isVendor;

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);


  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" onClick={() => handleSideNavOnClick("home")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <TextSnippet />
              </ListItemIcon>
              <ListItemText primary="Projects" onClick={() => handleSideNavOnClick("projects")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" onClick={() => handleSideNavOnClick("profile")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" onClick={() => handleSideNavOnClick("settings")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log out" onClick={logout}></ListItemText>
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
      <ProjectSnackbar severity="success" direction="right" message="Project created" open={successSnackbarOpen} onClose={() => setSuccessSnackbarOpen(false)}/>
      <ProjectSnackbar severity="error" direction="right" message="Something went wrong, please try again." open={errorSnackbarOpen} onClose={() => setErrorSnackbarOpen(false)} />

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
            setSuccessSnackbarOpen={setSuccessSnackbarOpen}
            setErrorSnackbarOpen={setErrorSnackbarOpen}
            setIsLoading={setIsLoading}
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
    <ThemeProvider theme={primaryButtonTheme}>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "0px -3px 10px 0px rgb(151 149 149 / 75%)" }}>
          {!user && renderLoggedOutNav()}
          {user && user.isVendor && renderVendorNav()}
          {user && !user.isVendor && renderCustomerNav()}
          {isLoading && <FullScreenLoading />}
        </AppBar>
      </Box>
      {renderSideNav()}
      </ThemeProvider>
    </>
  )
}

export default Nav;
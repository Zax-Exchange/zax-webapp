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
  ThemeProvider
} from "@mui/material";
import { 
  Menu,
  Home,
  Search
} from "@mui/icons-material";
import { useContext, useState } from "react";
import CreateProjectMoal from "../Projects/CreateProjectModal";
import { AuthContext } from "../../context/AuthContext";
import { PrimaryButton, primaryButtonTheme } from "../themedComponents/PrimaryButton";
import { Container } from "@mui/system";

const Nav = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  const isVendor = user?.isVendor;

  const [sideNavOpen, setSideNavOpen] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

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
              <ListItemText primary="Home" onClick={() => handleSideNavOnClick("home")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Projects" onClick={() => handleSideNavOnClick("projects")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Profile" onClick={() => handleSideNavOnClick("profile")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Settings" onClick={() => handleSideNavOnClick("settings")}></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
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

  const renderCustomerNav = () => {
    return <>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={() => setSideNavOpen(true)}
        >
          <Menu />
        </IconButton>

        <SearchBar />
        
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "right" }}
        >
          ZAX EXCHANGE
        </Typography>

        <Box>

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
          <CreateProjectMoal setIsCreateProjectOpen={setIsCreateProjectOpen}/>
        </DialogContent>
      </Dialog>
    </>
  }

  const renderLoggedOutNav = () => {
    return <>
          <Toolbar>
            <Button variant="primary" onClick={() => handleLoggedOutOnClick("login")}>
              Log In
            </Button>
            <PrimaryButton variant="contained" onClick={() => handleLoggedOutOnClick("company-signup")}>
              Get Started
            </PrimaryButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "right" }}
            >
              ZAX EXCHANGE
            </Typography>
          </Toolbar>
      </>
  }

  const renderVendorNav = () => {
    return <>
      <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={() => setSideNavOpen(true)}
      >
        <Menu />
      </IconButton>
      <SearchBar />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "right" }}
      >
        ZAX EXCHANGE
      </Typography>
    </Toolbar>
      </>
  }
  
  return ( <>
    <ThemeProvider theme={primaryButtonTheme}>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" sx={{ backgroundColor: "rgb(46 59 110)" }}>
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
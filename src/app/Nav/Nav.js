import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import "./Nav.scss";
import { 
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
  ListItemIcon
} from "@mui/material";
import { 
  Menu,
  Home,
  TextSnippet,
  Settings,
  Logout
} from "@mui/icons-material";
import { useContext, useState } from "react";
import CreateProjectMoal from "../Projects/CreateProjectModal";
import { AuthContext } from "../../context/AuthContext";
import CustomSnackbar from "../Utils/CustomSnackbar";
import FullScreenLoading from "../Utils/Loading";
import logo from "../../static/logo.png";

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
              <ListItemText primary="Home" primaryTypographyProps={{variant: "subtitle1"}}></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => handleSideNavOnClick("projects")}>
            <ListItemButton>
              <ListItemIcon>
                <TextSnippet />
              </ListItemIcon>
              <ListItemText primary="Projects" primaryTypographyProps={{variant: "subtitle1"}}></ListItemText>
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
              <ListItemText primary="Settings" primaryTypographyProps={{variant: "subtitle1"}}></ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log out" primaryTypographyProps={{variant: "subtitle1"}}></ListItemText>
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
        sx={{ color: "gray" }}
        onClick={() => setSideNavOpen(true)}
      >
      <Menu />
    </IconButton>;
  }

  const renderLogo = () => {
    return <img 
      src={logo}
      height={44}
      style={{ marginBottom: 2, cursor: "pointer" }}
      onClick={() => navigate("/")}
    />

  }

  const renderCustomerNav = () => {
    return <>
      <Toolbar>
        {renderHamburger()}

        {renderLogo()}
        
        <SearchBar />

        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Button onClick={() => setIsCreateProjectOpen(true)} variant="contained">CREATE PROJECT</Button>
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
            <Button variant="contained" onClick={() => handleLoggedOutOnClick("company-signup")}>
              Get Started
            </Button>

            {renderLogo()}
          </Toolbar>
      </>
  }

  const renderVendorNav = () => {
    return <>
      <Toolbar>
        {renderHamburger()}
        {renderLogo()}
        <SearchBar />
      </Toolbar>
    </>
  }

  return ( <>
    {snackbarOpen && <CustomSnackbar severity={snackbar.severity} direction="right" message={snackbar.message} open={snackbarOpen} onClose={() => setSnackbarOpen(false)}/>}

      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "0px -3px 10px 0px rgb(151 149 149 / 75%)" }}>
          {!user && renderLoggedOutNav()}
          {user && user.isVendor && renderVendorNav()}
          {user && !user.isVendor && renderCustomerNav()}
        </AppBar>
      </Box>
      {renderSideNav()}
    </>
  )
}

export default Nav;
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
  Divider,
  ListItemIcon, 
  Typography,
  Container,
  Button,
  Dialog,
  DialogContent, 
  AppBar,
  Toolbar,
  InputBase,
} from "@mui/material";
import { 
  Menu,
  Home,
  Search
} from "@mui/icons-material";
import { useContext, useState } from "react";
import CreateProjectMoal from "../Projects/CreateProjectModal";
import { AuthContext } from "../../context/AuthContext";


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
        </List>
      </Box>
    </Drawer>
  }

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" sx={{ backgroundColor: "rgb(43 52 89)" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "right" }}
            >
              Login
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "right" }}
            >
              Sign up
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  // if (!isVendor) {
  //   return (<Grid className="nav-bar-container" container mb={3}>
  //     <Grid item xs={2} alignSelf="center" textAlign="left" pl={2}>
  //       <IconButton onClick={() => setSideNavOpen(true)}>
  //         <Menu style={{color: "ddd"}}/>
  //       </IconButton>
  //     </Grid>

  //     <Grid item xs={2} alignSelf="center" textAlign="left" pl={2}>
  //       <Button onClick={() => setIsCreateProjectOpen(true)} variant="contained">CREATE PROJECT</Button>
  //     </Grid>

  //     <Grid item xs={5} alignSelf="center">
  //       <SearchBar />
  //     </Grid>


  //     <Grid item xs={3} alignSelf="center">
  //       <Container>
  //         <Typography variant="h1" color="white" fontSize={24} fontWeight={800}>ZAX EXCHANGE</Typography>
  //       </Container>
  //     </Grid>

  //     <Dialog
  //       open={isCreateProjectOpen}
  //       onClose={() => setIsCreateProjectOpen(false)}
  //       maxWidth="md"
  //       fullWidth={true}
  //     >
  //       <DialogContent>
  //         <CreateProjectMoal setIsCreateProjectOpen={setIsCreateProjectOpen}/>
  //       </DialogContent>
  //     </Dialog>
  //     {renderSideNav()}
  //   </Grid>)
  // }
  
  return ( <>
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static" sx={{ backgroundColor: "rgb(43 52 89)" }}>
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
        </AppBar>
      </Box>
      {renderSideNav()}
    </>
  )
}

export default Nav;
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
  Container
} from "@mui/material";
import { 
  Menu,
  Home,

} from "@mui/icons-material";
import { useState } from "react";
const Nav = () => {
  const navigate = useNavigate();
  let isVendor = true;
  const [sideNavOpen, setSideNavOpen] = useState(false)
  
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

  const renderNavs = () => {
    if (isVendor) {
      return (<Grid item xs={7}>
        <Stack direction="row" spacing={2}>
          <Link to="/">Home</Link>
          <Link to="/projects">My bids</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
        </Stack>
      </Grid>
      )

    }
    return (<Grid item xs={7}>
      <Stack direction="row" spacing={2}>
        <Link to="/">Home</Link>
        <Link to="/projects">My Projects</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </Stack>
    </Grid>
    )
  };

  

  
  
  return (<Grid className="nav-bar-container" container mb={3}>
    <Grid item xs={2} alignSelf="center" textAlign="left" pl={2}>
      <IconButton onClick={() => setSideNavOpen(true)}>
        <Menu style={{color: "ddd"}}/>
      </IconButton>
    </Grid>

    <Grid item xs={7} alignSelf="center">
      <SearchBar />
    </Grid>


    <Grid item xs={3} alignSelf="center">
      <Container>
        <Typography variant="h1" color="white" fontSize={24} fontWeight={800}>ZAX EXCHANGE</Typography>
      </Container>
    </Grid>

    {renderSideNav()}
  </Grid>)
}

export default Nav;
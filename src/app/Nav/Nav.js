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
} from "@mui/material";
import { 
  Menu,
  Home,

} from "@mui/icons-material";
import { useState } from "react";
import CreateProjectMoal from "../Projects/CreateProjectModal";


const Nav = () => {
  const navigate = useNavigate();
  let isVendor = false;
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

  if (!isVendor) {
    return (<Grid className="nav-bar-container" container mb={3}>
      <Grid item xs={2} alignSelf="center" textAlign="left" pl={2}>
        <IconButton onClick={() => setSideNavOpen(true)}>
          <Menu style={{color: "ddd"}}/>
        </IconButton>
      </Grid>

      <Grid item xs={2} alignSelf="center" textAlign="left" pl={2}>
        <Button onClick={() => setIsCreateProjectOpen(true)} variant="contained">CREATE PROJECT</Button>
      </Grid>

      <Grid item xs={5} alignSelf="center">
        <SearchBar />
      </Grid>


      <Grid item xs={3} alignSelf="center">
        <Container>
          <Typography variant="h1" color="white" fontSize={24} fontWeight={800}>ZAX EXCHANGE</Typography>
        </Container>
      </Grid>

      <Dialog
        open={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogContent>
          <CreateProjectMoal />
        </DialogContent>
      </Dialog>
      {renderSideNav()}
    </Grid>)
  }
  
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
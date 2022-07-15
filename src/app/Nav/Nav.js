import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import "./Nav.scss";
import { Stack, Grid } from "@mui/material";

const Nav = () => {

  let isVendor = true;

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

  

  
  
  return (<Grid className="nav-bar-container" container>
    <SearchBar />
    {renderNavs()}
  </Grid>)
}

export default Nav;
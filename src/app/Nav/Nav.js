import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import "./Nav.scss";

const Nav = () => {

  let isVendor = true;

  const Navs = (<nav>
      <Link to="/">Home</Link>
      <Link to="/bids">My bids</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
    </nav>);

  

  
  
  return (<div className="nav-bar-container">
    <SearchBar />
    {Navs}
  </div>)
}

export default Nav;
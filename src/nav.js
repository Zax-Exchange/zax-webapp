import { Link } from "react-router-dom";

const Nav = () => {

  let isVendor = true;

  if (isVendor) {
    return (<nav>
      <Link to="/">Home</Link>
      <Link to="/bids">My bids</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
    </nav>)

  }
  return (<nav>
    <Link to=""></Link>
  </nav>)
}

export default Nav;
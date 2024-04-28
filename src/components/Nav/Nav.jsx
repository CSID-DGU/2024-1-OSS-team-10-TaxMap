import React from "react";
import "./Nav.css";
import taxMapLogo from "../../assets/images/taxmap-official-logo.png";
function Nav() {
  return (
    <div>
      {/* NavBar*/}
      <div className="nav-bar">
        <a href="/">
          <img src={taxMapLogo} alt="taxMapLogo" className="taxMapLogo"></img>
        </a>
      </div>
    </div>
  );
}

export default Nav;

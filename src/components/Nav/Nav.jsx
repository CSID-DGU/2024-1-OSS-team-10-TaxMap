import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import taxMapLogo from "../../assets/images/taxmap-official-logo.png";
function Nav() {
  return (
    <div>
      {/* NavBar*/}
      <div className="nav-bar">
        <a href="/">
          <img src={taxMapLogo} alt="taxMapLogo" className="taxMapLogo"></img>
        </a>
        <div className="links-container">
          <NavLink to="/map/service" className="service-mode">
            서비스 모드
          </NavLink>
          <NavLink to="/map/department" className="department-mode">
            부처별 모드
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;

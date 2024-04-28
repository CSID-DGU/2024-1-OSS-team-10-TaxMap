import React from "react";
import githubLogo from "../../assets/images/github-logo.png";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">공개 SW프로젝트 | TaxMap</p>
        <div>
          <p className="footer-team">팀장 : 정승환</p>
          <p className="footer-team">팀원 : 박기문, 박지형, 전우현</p>
        </div>
        <div className="footer-bottom-container">
          <span className="footer-copyright">© 2024-1-OSS-team-10-TaxMap</span>
          <img src={githubLogo} alt="GitHub Logo" className="github-logo" />
        </div>
      </div>
    </footer>
  );
}
export default Footer;

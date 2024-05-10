import React, { useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import taxMapLogo from "../../assets/images/taxmap-official-logo.png";
function Nav() {
  // 카테고리 요소에 마우스 hover 시 보이는 세부 내용
  const [hoveredItem, setHoveredItem] = useState("");

  return (
    <div>
      {/* NavBar*/}
      <div className="nav-bar">
        <a href="/">
          <img src={taxMapLogo} alt="taxMapLogo" className="taxMapLogo"></img>
        </a>
        <div className="links-container">
          <div
            className="nav-item"
            onMouseEnter={() => setHoveredItem("service")}
            onMouseLeave={() => setHoveredItem("")}
          >
            <NavLink to="/map/service" className="service-mode">
              서비스 모드
            </NavLink>
            {hoveredItem === "service" && (
              <div className="dropdown-content" style={{ display: "grid" }}>
                <p>행정 / 통일 / 외교</p>
                <p>사회복지향상</p>
                <p>국토개발지원</p>
                <p>안정보장</p>
                <p>보훈향상</p>
                <p>교통 / 물류진흥</p>
                <p>교육 보장</p>
                <p>고용안정</p>
                <p>방송 / 통신진흥</p>
                <p>문화활동</p>
                <p>주거안정</p>
                <p>과학기술진흥</p>
                <p>관광 / 휴양활동</p>
                <p> 보건 / 의료</p>
              </div>
            )}
          </div>
          <div
            className="nav-item"
            onMouseEnter={() => setHoveredItem("department")}
            onMouseLeave={() => setHoveredItem("")}
          >
            <NavLink to="/map/department" className="department-mode">
              부처별 모드
            </NavLink>
            {hoveredItem === "department" && (
              <div className="dropdown-content" style={{ display: "grid" }}>
                <p>
                  5ㆍ18민주화운동 <br />
                  진상규명조사위원회
                </p>
                <p>
                  가습기살균사건과 <br />
                  4.16 세월호참사 특별조사위원회
                </p>
                <p>감사원</p>
                <p>개인정보위원회</p>
                <p>경찰청</p>
                <p>고용노동부</p>
                <p>고위공직자범죄수사처</p>
                <p>과학기수정보통신부</p>
                <p>관세청</p>
                <p>교육부</p>
                <p>국가교육위원회</p>
                <p>국가보훈부</p>
                <p>국가인권위원회</p>
                <p>국가정보원</p>
                <p>국무조정실 및 국무총리비서실</p>
                <p>국민권익위원회</p>
                <p>국방부</p>
                <p>국세청</p>
                <p>국토교통부</p>
                <p>국회</p>
                <p>금융위원회</p>
                <p>기상청</p>
                <p>기획재정부</p>
                <p>농림축산식품부</p>
                <p>농촌진흥청</p>
                <p>대법원</p>
                <p>대통령경호처</p>
                <p>대통령비서실 및 국가안보실</p>
                <p>문화재청</p>
                <p>문화체육관광부</p>
                <p>민주평화통일자문회의</p>
                <p>방송통신위원회</p>
                <p>방위사업청</p>
                <p>법무부</p>
                <p>법제처</p>
                <p>병무청</p>
                <p>보건복지부</p>
                <p>신림청</p>
                <p>산업통상지원부</p>
                <p>새만금개발청</p>
                <p>소방청</p>
                <p>식품의약품안전처</p>
                <p>여성가족부</p>
                <p>외교부</p>
                <p>원자력안전위원회</p>
                <p>인사혁신처</p>
                <p>재외동포청</p>
                <p>조달청</p>
                <p>중소벤처기업부</p>
                <p>중앙선거관리위원회</p>
                <p>진실ㆍ화해를위한과거정리위원회</p>
                <p>질병관리청</p>
                <p>통계청</p>
                <p>통일부</p>
                <p>특허청</p>
                <p>해양경찰청</p>
                <p>해양수산부</p>
                <p>행정안전부</p>
                <p>행정중심복합건설청</p>
                <p>헌법재판소</p>
                <p>환경부</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;

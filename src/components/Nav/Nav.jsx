import React, { useEffect, useState } from "react";
import "./Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import taxMapLogo from "../../assets/images/taxmap-official-logo.png";
import { getDepartments } from "../../services/departmentService"; // 부처별 모드 요소

function Nav() {
  const navigate = useNavigate();
  // 카테고리 요소에 마우스 hover 시 보이는 세부 내용
  const [hoveredItem, setHoveredItem] = useState("");
  const [departments, setDepartments] = useState([]); // 부처별 모드 요소 로딩
  const [isLoading, setIsLoading] = useState(false); // 부처별 모드 요소 로딩

  // 부처 데이터를 서버에서 가져오는 비동기 함수
  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // hoveredItem이 department 일때 fetchDepartments 호출
  useEffect(() => {
    if (hoveredItem === "department" && departments.length === 0) {
      fetchDepartments();
    }
  }, [hoveredItem]);

  const handleDepartmentClick = (department) => {
    navigate(`/map/department?category=${department}`);
  };
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
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  행정 / 통일 / 외교
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  사회복지향상
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  국토개발지원
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  안정보장
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  보훈향상
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  교통 / 물류진흥
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  교육 보장
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  고용안정
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  방송 / 통신진흥
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  문화활동
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  주거안정
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  과학기술진흥
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  관광 / 휴양활동
                </NavLink>
                <NavLink
                  to={{ pathname: "/map/service", search: "?category=" }}
                >
                  {" "}
                  보건 / 의료
                </NavLink>
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
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  departments.map((department, index) => (
                    <NavLink
                      key={index}
                      className="dropdown-item"
                      to={{
                        pathname: "/map/department",
                        search: `?category=${department}`,
                      }}
                    >
                      {department}
                    </NavLink>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;

import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ marker, onClose }) => {
  const [visibleDetails, setVisibleDetails] = useState({});

  const toggleVisibility = (index) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!marker) return null;

  return (
    <div className="sidebar">
      <button onClick={onClose} className="close-btn">
        ✖
      </button>
      {/* <h2>{marker.name}</h2>
      <div>주소 : {marker.address}</div>
      <div>
        총 보조금:{" "}
        {new Intl.NumberFormat("ko-KR", {
          style: "currency",
          currency: "KRW",
        }).format(marker.maxTotalSubsidy)}
      </div>
      <div>
        부처:{" "}
        {marker.govOffices && marker.govOffices.length > 0
          ? marker.govOffices.join(", ")
          : "정보 없음"}
      </div> */}
      {marker.organizations && (
        <div className="organizations-container">
          {marker.organizations.map((org, index) => (
            <div key={index} className="organization-detail">
              <div className="organization-name">{org.name}</div>

              {org.subsidies && org.subsidies.length > 0 ? (
                org.subsidies.map((subsidy, subIndex) => (
                  <div key={subIndex} className="subsidy-detail">
                    <div className="organization-intro">
                      {" "}
                      [{subIndex + 1}] 사업을 소개합니다{" "}
                    </div>
                    <p>
                      사업명: <b>{subsidy.businessName || "정보 없음"}</b>
                    </p>
                    <p>
                      주관 부처: <b>{subsidy.govOffice || "정보 없음"}</b>
                    </p>
                    <p>
                      사업연도: <b>{subsidy.businessYear || "정보 없음"}</b>
                    </p>
                    <div className="tax-expenditure">사용 내역</div>
                    <p>
                      총 사업비:{" "}
                      <b>
                        {new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        }).format(subsidy.totalBusinessExpense || 0)}
                      </b>
                    </p>
                    <p>
                      정부 지원금:{" "}
                      <b>
                        {new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        }).format(subsidy.govExpense || 0)}
                      </b>
                    </p>
                    <p>
                      지방 자치단체 지원금:{" "}
                      <b>
                        {new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        }).format(subsidy.localExpense || 0)}
                      </b>
                    </p>
                    <p>
                      자기 부담금:{" "}
                      <b>
                        {new Intl.NumberFormat("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        }).format(subsidy.selfExpense || 0)}
                      </b>
                    </p>
                    {/* <div>
                      신청 보조금: {subsidy.requestedSubsidy || "정보 없음"}
                    </div>
                    <div>
                      정부 예산:{" "}
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      }).format(subsidy.govBudget || 0)}
                    </div>
                    <p>
                      지방 자치단체 예산:{" "}
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      }).format(subsidy.localBudget || 0)}
                    </p>
                    <div>
                      지급된 보조금:{" "}
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      }).format(subsidy.requestedPaid || 0)}
                    </div>
                    <div>
                      권한 지급금:{" "}
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                      }).format(subsidy.authorityPaid || 0)}
                    </div> */}
                    <button
                      className="subsidy-toggle-btn"
                      onClick={() => toggleVisibility(`${index}-${subIndex}`)}
                    >
                      {visibleDetails[`${index}-${subIndex}`]
                        ? "▲ 숨기기"
                        : "▼ 사업내용 자세히 보기"}
                    </button>
                    {visibleDetails[`${index}-${subIndex}`] && (
                      <div>
                        <p>
                          사업 목적:
                          <b> {subsidy.businessPurpose || "정보 없음"}</b>
                        </p>
                        <p>
                          사업 설명:{" "}
                          <b>{subsidy.businessDescription || "정보 없음"}</b>
                        </p>
                        <div className="separator-subsidy-info"></div>
                      </div>
                    )}
                    {/* <div>
                      사업 기간: {subsidy.businessDuration || "정보 없음"}
                    </div>
                    <div>
                      사업 위치: {subsidy.businessLocation || "정보 없음"}
                    </div> */}
                  </div>
                ))
              ) : (
                <p>해당 조직에 대한 보조금 정보가 없습니다.</p>
              )}
              {index < marker.organizations.length - 1 && (
                <div className="seperator"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

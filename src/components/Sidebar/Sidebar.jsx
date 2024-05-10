import React from "react";
import "./Sidebar.css";

const Sidebar = ({ marker, onClose }) => {
  if (!marker) return null; // 데이터 없으면 렌더링 안함

  return (
    <div className="sidebar">
      <button onClick={onClose} className="close-btn">
        ✖
      </button>
      <h2>{marker.name}</h2>
      <div>주소 : {marker.address}</div>
      <div>
        총 보조금:{" "}
        {new Intl.NumberFormat("ko-KR", {
          style: "currency",
          currency: "KRW",
        }).format(marker.maxTotalSubsidy)}
      </div>
      {marker.organizations && (
        <div className="organizations-container">
          <h3>조직 상세 정보: </h3>
          {marker.organizations.map((org, index) => (
            <div key={index} className="organization-detail">
              <h4>{org.name}</h4>
              <p>대표자: {org.representative}</p>
              <p>전화번호: {org.phoneNumber}</p>
              <p>
                받은 총 보조금:{" "}
                {new Intl.NumberFormat("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                }).format(org.totalReceivedSubsidy)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Sidebar;

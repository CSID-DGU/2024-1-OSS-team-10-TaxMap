import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import btnDislike from "../../assets/opinion/btn-dislike.png";
import btnLike from "../../assets/opinion/btn-like.png";

const Sidebar = ({ marker, onClose }) => {
  const [visibleDetails, setVisibleDetails] = useState({});
  const [subsidyDetails, setSubsidyDetails] = useState({});
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  // 좋아요 증가 함수
  const handleLike = async (id) => {
    try {
      const updatedLikes = (subsidyDetails[id]?.likes || 0) + 1; // 서버로부터 가져온 likes를 사용
      setSubsidyDetails((prev) => ({
        ...prev,
        [id]: { ...prev[id], likes: updatedLikes },
      })); // subsidyDetails 상태 업데이트
      await fetch(`${process.env.REACT_APP_API_URL}/api/subsidy/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: updatedLikes,
          dislikes: subsidyDetails[id]?.dislikes || 0, // 서버로부터 가져온 dislikes를 사용
        }),
      });
    } catch (error) {
      console.error("Error liking subsidy:", error);
    }
  };

  // 나빠요 증가 함수
  const handleDislike = async (id) => {
    try {
      const updatedDislikes = (subsidyDetails[id]?.dislikes || 0) + 1; // 서버로부터 가져온 dislikes를 사용
      setSubsidyDetails((prev) => ({
        ...prev,
        [id]: { ...prev[id], dislikes: updatedDislikes },
      })); // subsidyDetails 상태 업데이트
      await fetch(
        `${process.env.REACT_APP_API_URL}/api/subsidy/dislike/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            likes: subsidyDetails[id]?.likes || 0, // 서버로부터 가져온 likes를 사용
            dislikes: updatedDislikes,
          }),
        }
      );
    } catch (error) {
      console.error("Error disliking subsidy:", error);
    }
  };

  // 사업내용, 사업목적 토클
  const toggleVisibility = (index) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 보조금 상세 정보 id를 통해 json 형태로 가져오기
  const fetchSubsidyDetails = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/subsidy/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setSubsidyDetails((prev) => ({ ...prev, [id]: data }));
        console.log("Fetched Subsidy Data:", data);
        //throw new Error("Failed to fetch subsidy details");
      } else {
        throw new Error("Failed to fetch subsidy details");
      }
    } catch (error) {
      console.error("Error fetching subsidy details:", error);
    }
  };

  useEffect(() => {
    if (marker && marker.organizations) {
      marker.organizations.forEach((org) => {
        if (org.subsidies) {
          org.subsidies.forEach((subsidy) => {
            if (!subsidyDetails[subsidy.id]) {
              fetchSubsidyDetails(subsidy.id);
            }
          });
        }
      });
    }
  }, [marker]);
  if (!marker) return null;

  return (
    <div className="sidebar">
      <button onClick={onClose} className="close-btn">
        ✖
      </button>
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
                      [{subIndex + 1}] {subsidy.businessName || "정보 없음"}{" "}
                    </div>
                    {/* <p>
                      사업명: <b>{subsidy.businessName || "정보 없음"}</b>
                    </p> */}
                    <p>
                      주관 부처: <b>{subsidy.govOffice || "정보 없음"}</b>
                    </p>
                    <p>
                      서비스 주제 :{" "}
                      <b>{subsidy.serviceCategory || "정보 없음"}</b>
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
                      </div>
                    )}
                    <div className="similar-subsidy-projects">
                      유사 보조사업
                    </div>
                    {subsidyDetails[subsidy.id] &&
                      subsidyDetails[subsidy.id].relatedSubsidyBusinesses && (
                        <p>
                          {subsidyDetails[
                            subsidy.id
                          ].relatedSubsidyBusinesses.map(
                            (related, relatedIndex) => (
                              <p key={relatedIndex}>
                                <b>- {related}</b>
                              </p>
                            )
                          )}
                        </p>
                      )}
                    <div className="sharing-opinion">의견을 나눠봐요</div>
                    {subsidyDetails[subsidy.id] && (
                      <div className="opinion-container">
                        <button
                          className="like-btn"
                          onClick={() => handleLike(subsidy.id)}
                        >
                          <img src={btnLike} alt="like" />
                          <span>좋아요</span>
                          <span>{subsidyDetails[subsidy.id].likes || 0}</span>
                        </button>
                        <button
                          className="dislike-btn"
                          onClick={() => handleDislike(subsidy.id)}
                        >
                          <img src={btnDislike} alt="dislike" />
                          <span>나빠요</span>
                          <span>
                            {subsidyDetails[subsidy.id].dislikes || 0}
                          </span>
                        </button>
                      </div>
                    )}
                    <div className="separator"></div>
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

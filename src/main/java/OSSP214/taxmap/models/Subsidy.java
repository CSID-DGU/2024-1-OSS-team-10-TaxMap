package OSSP214.taxmap.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.poiji.annotation.ExcelCellName;
import jakarta.persistence.*;
import lombok.*;


// 보조금 정보, column이 다 varchar(255)라서 정리 필요
// 셀 번호로 하는게 맞나?
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Subsidy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ExcelCellName("중앙관서")
    private String govOffice;

    @ExcelCellName("회계연도")
    private String financialYear;

    @ExcelCellName("사업연도")
    private String businessYear;

    @ExcelCellName("사업명")
    private String businessName;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Organization orgInfo;

    @ExcelCellName("기관명")
    private String orgName;

    @ExcelCellName("대표자명")
    private String representativeName;

    @ExcelCellName("전화번호")
    private String phoneNumber;

    @ExcelCellName("소재지")
    private String address;

    @ExcelCellName("총사업비")
    private long totalBusinessExpense;

    @ExcelCellName("국고보조금")
    private long govExpense;

    @ExcelCellName("지자체부담금")
    private long localExpense;

    @ExcelCellName("자기부담금")
    private long selfExpense;

    @ExcelCellName("교부신청액")
    private String requestedSubsidy;

    @ExcelCellName("국고보조금")
    private long govBudget;

    @ExcelCellName("지자체부담금")
    private long localBudget;

    @ExcelCellName("신청교부")
    private long requestedPaid;

    @ExcelCellName("직권교부")
    private long authorityPaid;

    @ExcelCellName("사업목적")
    @Column(columnDefinition = "TEXT")
    private String businessPurpose;

    @ExcelCellName("사업내용")
    @Column(columnDefinition = "TEXT")
    private String businessDescription;

    @ExcelCellName("사업기간")
    @Column(columnDefinition = "TEXT")
    private String businessDuration;

    @ExcelCellName("사업장소")
    @Column(columnDefinition = "TEXT")
    private String businessLocation;

    @ExcelCellName("대상자수")
    @Column(columnDefinition = "TEXT")
    private String subjectNumber;

    @ExcelCellName("보조금 이외의 경비부담내용")
    @Column(columnDefinition = "TEXT")
    private String miscExpense;

    @ExcelCellName("수익금액의 처리방법")
    @Column(columnDefinition = "TEXT")
    private String proceedsProcessMethod;

    @ExcelCellName("신청자의 자산/부채")
    @Column(columnDefinition = "TEXT")
    private String applierAsset;

    @ExcelCellName("기대효과")
    @Column(columnDefinition = "TEXT")
    private String expectedBenefit;

    @ExcelCellName("성과목표")
    @Column(columnDefinition = "TEXT")
    private String performanceGoal;

    @ExcelCellName("고려사항")
    @Column(columnDefinition = "TEXT")
    private String considerations;
}

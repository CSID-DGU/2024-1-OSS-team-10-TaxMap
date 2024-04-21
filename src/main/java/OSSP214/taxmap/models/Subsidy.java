package OSSP214.taxmap.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.poiji.annotation.ExcelCell;
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

    @ExcelCell(1)
    private String govOffice;

    @ExcelCell(2)
    private String financialYear;

    @ExcelCell(3)
    private String businessYear;

    @ExcelCell(4)
    private String businessName;

    @ManyToOne
    @JsonBackReference // 순환 참조 해결 위해, DTO 구성 후 넘겨주는 방법으로 변경 필요
    @JoinColumn
    private Organization orgInfo;

    @ExcelCell(5)
    private String orgName;

    @ExcelCell(6)
    private String representativeName;

    @ExcelCell(7)
    private String phoneNumber;

    @ExcelCell(8)
    private String address;

    @ExcelCell(9)
    private String totalBusinessExpense;

    @ExcelCell(10)
    private String govExpense;

    @ExcelCell(11)
    private String localExpense;

    @ExcelCell(12)
    private String selfExpense;

    @ExcelCell(13)
    private String requestedSubsidy;

    @ExcelCell(14)
    private String govBudget;

    @ExcelCell(15)
    private String localBudget;

    @ExcelCell(16)
    private String requestedPaid;

    @ExcelCell(17)
    private String authorityPaid;

    @ExcelCell(18)
    @Column(columnDefinition = "TEXT")
    private String businessPurpose;

    @ExcelCell(19)
    @Column(columnDefinition = "TEXT")
    private String businessDescription;

    @ExcelCell(20)
    @Column(columnDefinition = "TEXT")
    private String businessDuration;

    @ExcelCell(21)
    @Column(columnDefinition = "TEXT")
    private String businessLocation;

    @ExcelCell(22)
    @Column(columnDefinition = "TEXT")
    private String subjectNumber;

    @ExcelCell(23)
    @Column(columnDefinition = "TEXT")
    private String miscExpense;

    @ExcelCell(24)
    @Column(columnDefinition = "TEXT")
    private String proceedsProcessMethod;

    @ExcelCell(25)
    @Column(columnDefinition = "TEXT")
    private String applierAsset;

    @ExcelCell(26)
    @Column(columnDefinition = "TEXT")
    private String expectedBenefit;

    @ExcelCell(27)
    @Column(columnDefinition = "TEXT")
    private String performanceGoal;

    @ExcelCell(28)
    @Column(columnDefinition = "TEXT")
    private String considerations;
}

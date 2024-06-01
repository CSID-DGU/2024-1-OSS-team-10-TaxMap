package OSSP214.taxmap.models;

import com.poiji.annotation.ExcelCell;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SubsidyBusiness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ExcelCell(1)
    private String govOffice;

    @ExcelCell(2)
    private String serviceCategory;

    @ExcelCell(3)
    private String businessName;

    @ExcelCell(4)
    private String businessDuration;

    @ExcelCell(5)
    @Column(columnDefinition = "TEXT")
    private String businessDescription;
}

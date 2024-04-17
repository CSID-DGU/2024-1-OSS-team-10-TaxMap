package OSSP214.taxmap.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orgName;

    @ManyToOne
    @JsonBackReference
    @JoinColumn
    private Coords coords;

    private String representativeName;

    private String phoneNumber;

    private String address;

    // private string imageURL;

    @JsonManagedReference // 순환 참조 해결 위해, DTO 구성 후 넘겨주는 방법으로 변경해야 함
    @OneToMany(mappedBy = "orgInfo")
    List<Subsidy> subsidies;
}

package OSSP214.taxmap.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Coords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double latitude;
    private double longitude;

    @JsonManagedReference
    @OneToMany(mappedBy = "coords")
    private List<Organization> organizations;
}

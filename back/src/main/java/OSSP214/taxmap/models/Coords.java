package OSSP214.taxmap.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

// 마커 정보
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(indexes = @Index(name = "coords_index", columnList = "latitude, longitude, address"))
public class Coords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;

    private double latitude;
    private double longitude;

    @OneToMany(mappedBy = "coordsInfo")
    private List<Organization> organizations;
}

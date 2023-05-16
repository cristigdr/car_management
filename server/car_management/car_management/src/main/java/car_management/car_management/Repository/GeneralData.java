package car_management.car_management.Repository;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "general_data")
public class GeneralData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Getter
    @Setter
    @Column(name = "color", nullable = false, length = 50)
    private String color;

    @Getter
    @Setter
    @Column(name = "number_seats", nullable = false, length = 2)
    private Integer nrSeats;

    @Getter
    @Setter
    @Column(name = "number_doors", nullable = false, length = 1)
    private Integer nrDoors;

    @Getter
    @Setter
    @Column(name = "manufacturing_year", nullable = false, length = 4)
    private Integer yearManuf;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    public GeneralData() {}

    public GeneralData(String color, Integer nrSeats, Integer nrDoors, Integer yearManuf, Vehicle vehicle) {
        this.color = color;
        this.nrSeats = nrSeats;
        this.nrDoors = nrDoors;
        this.yearManuf = yearManuf;
        this.vehicle = vehicle;
    }
}

package car_management.car_management.Repository;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tech_specs")
public class TechData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @Column(name = "fuel_type", nullable = false,length = 50)
    private String fuelType;

    @Getter
    @Setter
    @Column(name = "consumption", nullable = false,length = 3)
    private Float consumption;

    @Getter
    @Setter
    @Column(name = "power", nullable = false,length = 4)
    private Integer power;

    @Getter
    @Setter
    @Column(name = "engine_displacement", nullable = false,length = 5)
    private Float engineDisplacement;

    @Getter
    @Setter
    @Column(name = "cylinder_number", nullable = false,length = 2)
    private Integer nrCylinders;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    public TechData() {}
    public TechData(String fuelType, Float consumption, Integer power, Float engineDisplacement, Integer nrCylinders, Vehicle vehicle) {
        this.fuelType = fuelType;
        this.consumption = consumption;
        this.power = power;
        this.engineDisplacement = engineDisplacement;
        this.nrCylinders = nrCylinders;
        this.vehicle = vehicle;
    }
}

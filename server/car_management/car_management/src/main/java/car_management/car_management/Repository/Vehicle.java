package car_management.car_management.Repository;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Column(name = "vehicle_id")
    private Long id;

    @Getter
    @Setter
    @Column(name = "vehicle_type", nullable = false, length = 50)
    private String vehicleType;

    @Getter
    @Setter
    @Column(name = "brand", nullable = false, length = 50)
    private String brand;

    @Getter
    @Setter
    @Column(name = "manufacturing_year", nullable = false, length = 4)
    private Integer yearManuf;

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
    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @Getter
    @Setter
    @OneToOne(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    private TechData techData;

    @Getter
    @Setter
    @Column(name = "plate_number", nullable = false, unique = true,length = 1)
    private String plateNumber;

    @Getter
    @Setter
    @Column(name = "registration_date", nullable = false, length = 4)
    private Date registrationDate;

    @Getter
    @Setter
    @Column(name = "owner", nullable = false, length = 100)
    private String owner;

    public Vehicle(String vehicleType, String brand, Integer yearManuf, String color, Integer nrSeats, Integer nrDoors, List<Review> reviews, TechData techData, String plateNumber, Date registrationDate, String owner) {
        this.vehicleType = vehicleType;
        this.brand = brand;
        this.yearManuf = yearManuf;
        this.color = color;
        this.nrSeats = nrSeats;
        this.nrDoors = nrDoors;
        this.reviews = reviews;
        this.techData = techData;
        this.plateNumber = plateNumber;
        this.registrationDate = registrationDate;
        this.owner = owner;
    }
}

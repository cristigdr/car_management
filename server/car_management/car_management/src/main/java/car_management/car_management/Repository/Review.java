package car_management.car_management.Repository;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Getter
    @Setter
    @Column(name = "review_date", nullable = false, length = 4)
    private Date reviewDate;

    public Review(Vehicle vehicle, Date reviewDate) {
        this.vehicle = vehicle;
        this.reviewDate = reviewDate;
    }
}

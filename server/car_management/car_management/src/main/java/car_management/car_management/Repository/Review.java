package car_management.car_management.Repository;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Vehicle vehicle;

    @Getter
    @Setter
    @Column(name = "review_date", nullable = false, length = 4)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date reviewDate;

    public Review() {}
    public Review(Vehicle vehicle, Date reviewDate) {
        this.vehicle = vehicle;
        this.reviewDate = reviewDate;
    }
}

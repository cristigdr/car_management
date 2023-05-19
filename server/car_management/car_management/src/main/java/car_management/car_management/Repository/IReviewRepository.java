package car_management.car_management.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends CrudRepository<Review, Long> {
    List<Review> findByVehicleIdOrderByReviewDateDesc(Long vehicleId);

    @Query("SELECT r.vehicle.id, MAX(r.reviewDate) AS latest_review_date FROM Review r GROUP BY r.vehicle.id")
    List<Object[]> findLatestReviewDatesByVehicle();

}

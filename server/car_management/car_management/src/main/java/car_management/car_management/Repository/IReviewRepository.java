package car_management.car_management.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends CrudRepository<Review, Long> {
    List<Review> findByVehicleId(Long vehicleId);

}

package car_management.car_management.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IVehicleRepository extends CrudRepository<Vehicle, Long> {

    Vehicle findByplateNumber(String plateNumber);

    List<Vehicle> findByOwner(String owner);

    List<Vehicle> findByRegistrationDateGreaterThanEqual(Date givenDate);

    @Query("SELECT v FROM Vehicle v WHERE v.id IN (" +
            "SELECT r.vehicle.id FROM Review r " +
            "GROUP BY r.vehicle.id " +
            "HAVING MAX(r.reviewDate) < :givenDate)")
    List<Vehicle> findVehiclesWithLastReviewBeforeDate(Date givenDate);

    List<Vehicle> findByOrderByVehicleType();
}

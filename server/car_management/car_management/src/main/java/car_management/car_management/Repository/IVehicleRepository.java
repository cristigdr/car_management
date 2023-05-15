package car_management.car_management.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVehicleRepository extends CrudRepository<Vehicle, Long> {
}

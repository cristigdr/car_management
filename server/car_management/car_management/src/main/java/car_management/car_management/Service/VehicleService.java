package car_management.car_management.Service;

import car_management.car_management.Repository.IVehicleRepository;
import car_management.car_management.Repository.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private IVehicleRepository vehicleRepo;

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepo.save(vehicle);
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepo.findById(id);
    }

    public List<Vehicle> getAllVehicles() {
        return (List<Vehicle>) vehicleRepo.findAll();
    }

    public void deleteVehicle(Long id) {
        vehicleRepo.deleteById(id);
    }
}

package car_management.car_management.Service;

import car_management.car_management.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarManagementService {
    private IVehicleRepository vehicleRepository;
    private ITechDataRepository techDataRepository;
    private IReviewRepository reviewRepository;

    private IGeneralData generalDataRepo;

    @Autowired
    public CarManagementService(IVehicleRepository vehicleRepository, ITechDataRepository techDataRepository, IReviewRepository reviewRepository, IGeneralData generalDataRepo) {
        this.vehicleRepository = vehicleRepository;
        this.techDataRepository = techDataRepository;
        this.reviewRepository = reviewRepository;
        this.generalDataRepo = generalDataRepo;
    }

    public void insertVehicleWithTechDataAndReviewAndGenData(Vehicle vehicle, TechData techData, Review review, GeneralData generalData) {

        vehicle.setTechData(techData);
        vehicle.getReviews().add(review);
        vehicle.setGeneralData(generalData);
        techData.setVehicle(vehicle);
        review.setVehicle(vehicle);
        generalData.setVehicle(vehicle);

        vehicleRepository.save(vehicle);
        techDataRepository.save(techData);
        reviewRepository.save(review);
    }

    public String addReviewToVehicle(Long vehicleId, Review review) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
        if (vehicle != null) {
            review.setVehicle(vehicle);
            reviewRepository.save(review);
            return "Review added successfully.";
        } else {
            return "Error: Vehicle not found.";
        }
    }
}


package car_management.car_management.Service;

import car_management.car_management.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarManagementService {
    private IVehicleRepository vehicleRepository;
    private ITechDataRepository techDataRepository;
    private IReviewRepository reviewRepository;

    @Autowired
    public CarManagementService(IVehicleRepository vehicleRepository, ITechDataRepository techDataRepository, IReviewRepository reviewRepository) {
        this.vehicleRepository = vehicleRepository;
        this.techDataRepository = techDataRepository;
        this.reviewRepository = reviewRepository;
    }

    public void insertVehicleWithTechDataAndReview(Vehicle vehicle, TechData techData, Review review) {
        // Set relationships between entities
        vehicle.setTechData(techData);
        vehicle.getReviews().add(review);
        techData.setVehicle(vehicle);
        review.setVehicle(vehicle);

        // Save entities to the database
        vehicleRepository.save(vehicle);
        techDataRepository.save(techData);
        reviewRepository.save(review);
    }
}


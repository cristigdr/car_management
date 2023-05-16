package car_management.car_management.Service;

import car_management.car_management.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Vehicle> getVehicles() {
        return (List<Vehicle>) vehicleRepository.findAll();
    } //finAll returns an Iterable, that's why we cast the return to List

    public TechData getTechDataByVehicleId(Long vehicleId) {
        return techDataRepository.findByVehicleId(vehicleId);
    }

    public List<Review> getReviewsByVehicleId(Long vehicleId) {
        return reviewRepository.findByVehicleId(vehicleId);
    }

    public GeneralData getGeneralDataByVehicleId(Long vehicleId) {
        return generalDataRepo.findByVehicleId(vehicleId);
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

    public Vehicle updateVehicle(Vehicle updatedVehicle){
        Vehicle existingVehicle = vehicleRepository.findById(updatedVehicle.getId()).orElse(null);

        if(existingVehicle != null){
            existingVehicle.setVehicleType(updatedVehicle.getVehicleType());
            existingVehicle.setBrand(updatedVehicle.getBrand());
            existingVehicle.setPlateNumber(updatedVehicle.getPlateNumber());
            existingVehicle.setRegistrationDate(updatedVehicle.getRegistrationDate());
            existingVehicle.setOwner(updatedVehicle.getOwner());
            return vehicleRepository.save(existingVehicle);
        }
        return null;
    }

    public TechData updateTechData(Long vehicleId, TechData updatedTechData) {
        TechData existingTechData = techDataRepository.findByVehicleId(vehicleId);

        if (existingTechData == null) {
            return null;
        }

        existingTechData.setFuelType(updatedTechData.getFuelType());
        existingTechData.setConsumption(updatedTechData.getConsumption());
        existingTechData.setPower(updatedTechData.getPower());
        existingTechData.setEngineDisplacement(updatedTechData.getEngineDisplacement());
        existingTechData.setNrCylinders(updatedTechData.getNrCylinders());

        return techDataRepository.save(existingTechData);
    }

    public GeneralData updateGeneralData(Long vehicleId, GeneralData updatedGenData) {
        GeneralData existingGenData = generalDataRepo.findByVehicleId(vehicleId);

        if (existingGenData == null) {
            return null;
        }

        existingGenData.setYearManuf(updatedGenData.getYearManuf());
        existingGenData.setColor(updatedGenData.getColor());
        existingGenData.setNrDoors(updatedGenData.getNrDoors());
        existingGenData.setNrSeats(updatedGenData.getNrSeats());

        return generalDataRepo.save(existingGenData);
    }

    public String deleteVehicle(Long id){
        try{
            this.vehicleRepository.deleteById(id);
            return "Deletion Successfully";
        }catch (Exception e){
            return "Failed o delete user with id" + id;
        }
    }
}


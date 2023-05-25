package car_management.car_management.Service;

import car_management.car_management.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CarManagementService {
    private final IVehicleRepository vehicleRepository;
    private final ITechDataRepository techDataRepository;
    private final IReviewRepository reviewRepository;
    private final IGeneralData generalDataRepo;

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
        return reviewRepository.findByVehicleIdOrderByReviewDateDesc(vehicleId);
    }

    public GeneralData getGeneralDataByVehicleId(Long vehicleId) {
        return generalDataRepo.findByVehicleId(vehicleId);
    }

    public Optional<Vehicle> getVehicleById(Long id){
        return this.vehicleRepository.findById(id);
    }

    public Vehicle findByPlateNr(String plateNumber){
        return vehicleRepository.findByplateNumber(plateNumber);
    }

    public List <Vehicle> findByOwner(String owner){
        return vehicleRepository.findByOwnerContaining(owner);
    }

    public List <Vehicle> showVehiclesAfterRegDate(Date date){
        return vehicleRepository.findByRegistrationDateGreaterThanEqual(date);
    }

    public List <Vehicle> showVehiclesWithLastReviewBeforeDate(Date date){
        return vehicleRepository.findVehiclesWithLastReviewBeforeDate(date);
    }

    public List <Vehicle> sortByType(){
        return vehicleRepository.findByOrderByVehicleType();
    }

    public List<Object[]> getLatestReviewForEachVehicle(){
        return reviewRepository.findLatestReviewDatesByVehicle();
    }

    public Vehicle insertVehicleWithTechDataAndReviewAndGenData(Vehicle vehicle, TechData techData, Review review, GeneralData generalData) {

        vehicle.setTechData(techData);
        vehicle.getReviews().add(review);
        vehicle.setGeneralData(generalData);
        techData.setVehicle(vehicle);
        review.setVehicle(vehicle);
        generalData.setVehicle(vehicle);

        Vehicle insertedVehicle = vehicleRepository.save(vehicle);
        techDataRepository.save(techData);
        reviewRepository.save(review);

        return insertedVehicle;
    }

    public Review addReviewToVehicle(Long vehicleId, Review review) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
        if (vehicle != null) {
            review.setVehicle(vehicle);
            return reviewRepository.save(review);
        } else {
            return null;
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

    public String generateCode(String countyAbreviation) {

        final String ALPHABET = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
        final int NUM_DIGITS = 2;
        final int NUM_LETTERS = 3;

        StringBuilder code = new StringBuilder();
        Random random = new Random();

        code.append(countyAbreviation).append(" ");

        for (int i = 0; i < NUM_DIGITS; i++) {
            int digit = random.nextInt(10);
            code.append(digit);
        }

        code.append(" ");

        for (int i = 0; i < NUM_LETTERS; i++) {
            int letterIndex = random.nextInt(ALPHABET.length());
            char letter = ALPHABET.charAt(letterIndex);
            code.append(letter);
        }

        String generatedCode = code.toString();

        Vehicle vehicle = vehicleRepository.findByplateNumber(generatedCode);

        if(vehicle != null){
            generateCode(countyAbreviation);
        }
        return generatedCode;
    }
}


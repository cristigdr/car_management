package car_management.car_management.Controller;

import car_management.car_management.Repository.GeneralData;
import car_management.car_management.Repository.Review;
import car_management.car_management.Repository.TechData;
import car_management.car_management.Repository.Vehicle;
import car_management.car_management.Service.CarManagementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CarManagementController {
    private CarManagementService carService;

    @Autowired
    public CarManagementController(CarManagementService carService){
        this.carService = carService;
    }

    @GetMapping("/getVehicles")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        List<Vehicle> vehicles = carService.getVehicles();
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<String> registerVehicle(@RequestBody Map<String, Object> requestMap) {
        Vehicle vehicle = convertToObject(requestMap.get("vehicle"), Vehicle.class);
        TechData techData = convertToObject(requestMap.get("techData"), TechData.class);
        Review review = convertToObject(requestMap.get("review"), Review.class);
        GeneralData generalData = convertToObject(requestMap.get("generalData"), GeneralData.class);

        carService.insertVehicleWithTechDataAndReviewAndGenData(vehicle, techData, review, generalData);

        return ResponseEntity.ok("Data inserted successfully");
    }

    @PostMapping("/addReview/{id}")
    public ResponseEntity<String> addReview(@PathVariable("id") Long vehicleId, @RequestBody Review review) {
        String result = carService.addReviewToVehicle(vehicleId, review);
        if (result.startsWith("Error")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

    private <T> T convertToObject(Object object, Class<T> objectType) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(object, objectType);
    }

}

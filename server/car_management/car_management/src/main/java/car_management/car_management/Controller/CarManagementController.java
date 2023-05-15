package car_management.car_management.Controller;

import car_management.car_management.Repository.Review;
import car_management.car_management.Repository.TechData;
import car_management.car_management.Repository.Vehicle;
import car_management.car_management.Service.CarManagementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class CarManagementController {
    private CarManagementService carService;

    @Autowired
    public CarManagementController(CarManagementService carService){
        this.carService = carService;
    }

    @PostMapping("/insert")
    @ResponseBody
    public ResponseEntity<String> createVehicleWithTechDataAndReview(@RequestBody Map<String, Object> requestMap) {
        Vehicle vehicle = convertToObject(requestMap.get("vehicle"), Vehicle.class);
        TechData techData = convertToObject(requestMap.get("techData"), TechData.class);
        Review review = convertToObject(requestMap.get("review"), Review.class);

        carService.insertVehicleWithTechDataAndReview(vehicle, techData, review);

        return ResponseEntity.ok("Data inserted successfully");
    }

    private <T> T convertToObject(Object object, Class<T> objectType) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(object, objectType);
    }

}

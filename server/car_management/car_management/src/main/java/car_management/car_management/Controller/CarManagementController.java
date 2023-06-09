package car_management.car_management.Controller;

import car_management.car_management.Repository.GeneralData;
import car_management.car_management.Repository.Review;
import car_management.car_management.Repository.TechData;
import car_management.car_management.Repository.Vehicle;
import car_management.car_management.Service.CarManagementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class CarManagementController {
    private final CarManagementService carService;

    @Autowired
    public CarManagementController(CarManagementService carService){
        this.carService = carService;
    }

    @GetMapping("/getVehicles")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        List<Vehicle> vehicles = carService.getVehicles();
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }


    @GetMapping("/findPlateNr/{plateNr}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Vehicle> getVehicleByPlateNr(@PathVariable("plateNr") String  plateNr) {
        Vehicle vehicle = carService.findByPlateNr(plateNr);
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findOwner/{owner}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List <Vehicle>> getVehiclesByOwner(@PathVariable("owner") String  owner) {
        List<Vehicle> vehicles= carService.findByOwner(owner);
        if (vehicles != null) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/showAfterRegDate/{date}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List <Vehicle>> showVehiclesAfterRegDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        List<Vehicle> vehicles= carService.showVehiclesAfterRegDate(date);
        if (vehicles != null) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/showBeforeLastReview/{date}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List <Vehicle>> showVehiclesBeforeLastReviewDate(@PathVariable@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        List<Vehicle> vehicles= carService.showVehiclesWithLastReviewBeforeDate(date);
        if (vehicles != null) {
            return ResponseEntity.ok(vehicles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getTechData/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<TechData> getTechDataByVehicleId(@PathVariable("id") Long vehicleId) {
        TechData techData = carService.getTechDataByVehicleId(vehicleId);
        if (techData != null) {
            return ResponseEntity.ok(techData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getReviews/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List<Review>> getReviewsByVehicleId(@PathVariable("id") Long vehicleId) {
        List<Review> reviews = carService.getReviewsByVehicleId(vehicleId);
        if (!reviews.isEmpty()) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getVehicle/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Optional<Vehicle>> getVehicleById(@PathVariable("id") Long vehicleId) {
        Optional<Vehicle> vehicle = carService.getVehicleById(vehicleId);
        if (vehicle != null) {
            return ResponseEntity.ok(vehicle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getGeneralData/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<GeneralData> getGeneralDataByVehicleId(@PathVariable("id") Long vehicleId) {
        GeneralData generalData = carService.getGeneralDataByVehicleId(vehicleId);
        if (generalData != null) {
            return ResponseEntity.ok(generalData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/sortByType")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List<Vehicle>> sortVehiclesByType() {
        List<Vehicle> vehicles = carService.sortByType();
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @GetMapping("/latestReviews")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<List<Object[]>> getLatestReview() {
        List<Object[]> latestReviews = carService.getLatestReviewForEachVehicle();
        if (latestReviews != null) {
            return ResponseEntity.ok(latestReviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/generatePlateNr/{county}")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<String> generatePlateNr(@PathVariable("county") String county) {
        String generatedCode = carService.generateCode(county);

        String responseBody = "{\"generatedCode\": \"" + generatedCode + "\"}";

        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @PostMapping("/insert")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Vehicle> registerVehicle(@RequestBody Map<String, Object> requestMap) {
        Vehicle vehicle = convertToObject(requestMap.get("vehicle"), Vehicle.class);
        TechData techData = convertToObject(requestMap.get("techData"), TechData.class);
        Review review = convertToObject(requestMap.get("review"), Review.class);
        GeneralData generalData = convertToObject(requestMap.get("generalData"), GeneralData.class);

        Vehicle newVehicle = carService.insertVehicleWithTechDataAndReviewAndGenData(vehicle, techData, review, generalData);

        return ResponseEntity.ok(newVehicle);
    }

    @PostMapping("/addReview/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Review> addReview(@PathVariable("id") Long vehicleId, @RequestBody Review review) {
        Review savedReview = carService.addReviewToVehicle(vehicleId, review);
        if (savedReview != null) {
            return ResponseEntity.ok(savedReview);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @PutMapping("/updateVehicle")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<Vehicle> updateVehicle(@RequestBody Vehicle vehicle) {
        Vehicle updatedVehicle = carService.updateVehicle(vehicle);
        if (updatedVehicle != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedVehicle);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/updateTechData/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<TechData> updateTechData(@PathVariable("id") Long vehicleId, @RequestBody TechData techData) {
        TechData updatedTechData = carService.updateTechData(vehicleId, techData);
        if (updatedTechData != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedTechData);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/updateGenData/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public ResponseEntity<GeneralData> updateGenData(@PathVariable("id") Long vehicleId, @RequestBody GeneralData generalData) {
        GeneralData updatedgenData = carService.updateGeneralData(vehicleId, generalData);
        if (updatedgenData != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedgenData);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/deleteVehicle/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public String deleteVehicle(@PathVariable("id") Long vehicleId){return this.carService.deleteVehicle(vehicleId);}

    private <T> T convertToObject(Object object, Class<T> objectType) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(object, objectType);
    }

}

package car_management.car_management.Service;

import car_management.car_management.Repository.ITechDataRepository;
import car_management.car_management.Repository.TechData;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

public class TechDataService {
    @Autowired
    private ITechDataRepository techRepo;

    public TechData createTechData(TechData techData) {
        return techRepo.save(techData);
    }

    public Optional<TechData> getTechDataById(Long id) {
        return techRepo.findById(id);
    }

    public List<TechData> getAllTechData() {
        return (List<TechData>)techRepo.findAll();
    }

    public TechData updateTechData(TechData techData) {
        return techRepo.save(techData);
    }

    public void deleteTechData(Long id) {
        techRepo.deleteById(id);
    }
}

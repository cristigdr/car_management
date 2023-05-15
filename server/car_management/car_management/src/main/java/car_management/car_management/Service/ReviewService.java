package car_management.car_management.Service;

import car_management.car_management.Repository.IReviewRepository;
import car_management.car_management.Repository.Review;
import car_management.car_management.Repository.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private IReviewRepository reviewRepo;

    public Review createReview(Vehicle vehicle, Date reviewDate) {
        Review review = new Review(vehicle, reviewDate);
        return reviewRepo.save(review);
    }

    public Review getReviewById(Long id) {
        return reviewRepo.findById(id).orElse(null);
    }

    public List<Review> getAllReviews() {
        return (List<Review>) reviewRepo.findAll();
    }

    public Review updateReview(Review review) {
        return reviewRepo.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepo.deleteById(id);
    }
}

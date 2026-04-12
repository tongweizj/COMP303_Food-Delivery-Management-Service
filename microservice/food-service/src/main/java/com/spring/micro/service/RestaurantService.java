package com.spring.micro.service;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.micro.entity.Restaurant;
import com.spring.micro.repository.RestaurantRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RestaurantService {
	@Autowired
	private final RestaurantRepository restaurantRepository;

	// Constructor injection (Recommended by Spring)
	public RestaurantService(RestaurantRepository restaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	// Retrieve all restaurants
	public Flux<Restaurant> getAll() {
		return restaurantRepository.findAll();
	}

	// Retrieve a single restaurant by ID
	public Mono<Restaurant> getById(String id) {
		return restaurantRepository.findById(id);
	}

	// Create a new restaurant
	public Mono<Restaurant> create(Restaurant r) {
		return restaurantRepository.save(r);
	}

	// Update an existing restaurant
	public Mono<Restaurant> update(String id, Restaurant r) {
		// In WebFlux, we chain reactive operators to handle the "find, then update"
		// flow
		return restaurantRepository.findById(id).flatMap(existingRestaurant -> {
			// Make sure the ID from the path variable is set on the object
			r.setRestaurantId(id);
			// Save and return the updated restaurant
			return restaurantRepository.save(r);
		}).switchIfEmpty(Mono.error(new RuntimeException("Restaurant not found: " + id)));
	}
	public Mono<Restaurant> save(Restaurant restaurant) {
        // ReactiveMongoRepository 的 save 方法自带“存在即更新，不存在即插入”逻辑
        return restaurantRepository.save(restaurant);
    }
	// Delete a restaurant by ID
	// Note: Must return Mono<Void> to ensure the reactive stream pipeline executes
	public Mono<Void> delete(String id) {
		return restaurantRepository.deleteById(id);
	}
}
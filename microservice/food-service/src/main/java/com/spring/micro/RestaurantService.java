package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RestaurantService {

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

	// Delete a restaurant by ID
	// Note: Must return Mono<Void> to ensure the reactive stream pipeline executes
	public Mono<Void> delete(String id) {
		return restaurantRepository.deleteById(id);
	}
}
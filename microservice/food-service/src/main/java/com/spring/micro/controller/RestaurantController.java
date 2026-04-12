package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class RestaurantController {

	private final RestaurantService restaurantService;
	private final MenuItemService menuItemService;

	public RestaurantController(RestaurantService restaurantService,MenuItemService menuItemService) {
		this.restaurantService = restaurantService;
		this.menuItemService = menuItemService;
	}

	// Retrieve all restaurants
	@GetMapping("/api/restaurants")
	public Flux<Restaurant> getAll() {
		return restaurantService.getAll();
	}

	// Retrieve a single restaurant by its ID
	@GetMapping("/api/restaurant/{id}")
	public Mono<RestaurantDetail> getById(@PathVariable String id) {
		Mono<Restaurant> restaurantMono = restaurantService.getById(id);
		Mono<List<MenuItem>> menuItemsMono = menuItemService.getByRestaurantId(id).collectList();
		
		return Mono.zip(restaurantMono, menuItemsMono)
	            .map(tuple -> new RestaurantDetail(tuple.getT1(), tuple.getT2()));
	}

	// Create a new restaurant
	@PostMapping("/api/restaurants")
	public Mono<Restaurant> create(@RequestBody Restaurant restaurant) {
		return restaurantService.create(restaurant);
	}

	// Update an existing restaurant by its ID
	@PutMapping("/api/restaurants/{id}")
	public Mono<Restaurant> updateById(@PathVariable String id, @RequestBody Restaurant restaurant) {
		System.out.println("Updating restaurant: " + id);
		return restaurantService.update(id, restaurant);
	}

	// Delete a restaurant by its ID
	// Note: In WebFlux, void methods must return Mono<Void> to properly signal
	// completion
	@DeleteMapping("/api/restaurants/{id}")
	public Mono<Void> delete(@PathVariable String id) {
		System.out.println("Deleting restaurant: " + id);
		return restaurantService.delete(id);
	}
}
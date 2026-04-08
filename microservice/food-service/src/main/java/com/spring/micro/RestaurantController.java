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

	public RestaurantController(RestaurantService restaurantService) {
		this.restaurantService = restaurantService;
	}

	// 查所有
	@GetMapping("/api/restaurants") 
	public Flux<Restaurant> getAll() {
		return restaurantService.getAll();
	}

	// 查单个
	@GetMapping("/api/restaurant/{id}")
	public Mono<Restaurant> getById(@PathVariable long id) {
		return restaurantService.getById(id);
	}

	// 增
	@PostMapping("/api/restaurant")
	public Mono<Restaurant> create(@RequestBody Restaurant restaurant) {
		return restaurantService.create(restaurant);
	}

	// 改
	@PutMapping("/api/restaurant/{id}")
	public Mono<Restaurant> updateById(@PathVariable long id, @RequestBody Restaurant restaurant) {
		System.out.println("Updating restaurant: " + id);
		return restaurantService.update(id, restaurant);
	}

	// 删
	@DeleteMapping("/api/restaurant/{id}")
	public void delete(@PathVariable long id) {
		System.out.println("Deleting restaurant: " + id);
		restaurantService.delete(id);
	}
}
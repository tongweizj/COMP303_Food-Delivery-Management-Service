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

	// 构造器注入（Spring 推荐）
	public RestaurantService(RestaurantRepository restaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	public Flux<Restaurant> getAll() {
		return restaurantRepository.findAll();
	}

	public Mono<Restaurant> getById(long id) {
		return restaurantRepository.findById(id);
	}

	public Mono<Restaurant> create(Restaurant r) {
		return restaurantRepository.save(r);
	}

	public Mono<Restaurant> update(long id, Restaurant r) {
		r.setRestId(id);
		Mono<Restaurant> updated = restaurantRepository.save(r);
		if (updated == null) {
			throw new RuntimeException("Restaurant not found: " + id);
		}
		return updated;
	}

	public void delete(long id) {
		restaurantRepository.deleteById(id);
	}
}
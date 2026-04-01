package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

	private final RestaurantRepository restaurantRepository;

	// 构造器注入（Spring 推荐）
	public RestaurantService(RestaurantRepository restaurantRepository) {
		this.restaurantRepository = restaurantRepository;
	}

	public List<Restaurant> getAll() {
		return restaurantRepository.findAll();
	}

	public Restaurant getById(long id) {
		return restaurantRepository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found: " + id));
	}

	public Restaurant create(Restaurant r) {
		return restaurantRepository.save(r);
	}

	public Restaurant update(long id, Restaurant r) {
		Restaurant updated = restaurantRepository.update(id, r);
		if (updated == null) {
			throw new RuntimeException("Restaurant not found: " + id);
		}
		return updated;
	}

	public void delete(long id) {
		restaurantRepository.delete(id);
	}
}
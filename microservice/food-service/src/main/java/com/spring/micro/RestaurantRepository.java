package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

@Repository
public class RestaurantRepository {

	private final List<Restaurant> restaurants = new ArrayList<>();
	private final AtomicLong counter = new AtomicLong();

	// 增
	public Restaurant save(Restaurant r) {
		if (r.getRestId() == 0) {
			r.setRestId(counter.incrementAndGet());
		}
		restaurants.add(r);
		return r;
	}

	// 查所有
	public List<Restaurant> findAll() {
		return new ArrayList<>(restaurants); // 返回副本，防止外部修改
	}

	// 查单个
	public Optional<Restaurant> findById(long id) {
		return restaurants.stream().filter(r -> r.getRestId() == id).findFirst();
	}

	// 改
	public Restaurant update(long id, Restaurant newData) {
		return findById(id).map(existing -> {
			existing.setRestName(newData.getRestName());
			existing.setCuisineType(newData.getCuisineType());
			existing.setCity(newData.getCity());
			existing.setRating(newData.getRating());
			existing.setDeliveryTime(newData.getDeliveryTime());
			return existing;
		}).orElse(null); // 或抛异常
	}

	// 删
	public void delete(long id) {
		restaurants.removeIf(r -> r.getRestId() == id);
	}
}
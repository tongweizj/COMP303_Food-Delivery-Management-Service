package com.spring.micro.service;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.micro.entity.Order;
import com.spring.micro.repository.OrderRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class OrderService {

	private final OrderRepository orderRepository;

	// Constructor injection (Recommended by Spring)
	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	// Retrieve all orders
	public Flux<Order> getAll() {
		return orderRepository.findAll();
	}

	// Retrieve a single order by ID
	public Mono<Order> getById(String id) {
		return orderRepository.findById(id);
	}

	// Create a new order
	public Mono<Order> save(Order o) {
		return orderRepository.save(o);
	}

	// Update an existing order
	public Mono<Order> update(String id, Order o) {
		// In WebFlux, we use flatMap to chain operations and switchIfEmpty to handle
		// "Not Found"
		return orderRepository.findById(id).flatMap(existingOrder -> {
			// Ensure the ID from the path variable is set on the object
			o.setOrderId(id);
			// Save and return the updated order
			return orderRepository.save(o);
		}).switchIfEmpty(Mono.error(new RuntimeException("Order not found: " + id)));
	}

	// Delete an order by ID
	// Note: It must return Mono<Void> to ensure the reactive stream is executed
	public Mono<Void> delete(String id) {
		return orderRepository.deleteById(id);
	}
}

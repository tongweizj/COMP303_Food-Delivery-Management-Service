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
public class OrderController {

	private final OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	// Retrieve all orders
	@GetMapping("/api/orders")
	public Flux<Order> getAll() {
		return orderService.getAll();
	}

	// Retrieve a single order by its ID
	@GetMapping("/api/order/{id}")
	public Mono<Order> getById(@PathVariable String id) {
		return orderService.getById(id);
	}

	// Create a new order
	@PostMapping("/api/order")
	public Mono<Order> create(@RequestBody Order order) {
		return orderService.create(order);
	}

	// Update an existing order by its ID
	@PutMapping("/api/order/{id}")
	public Mono<Order> updateById(@PathVariable String id, @RequestBody Order order) {
		System.out.println("Updating order: " + id);
		return orderService.update(id, order);
	}

	// Delete an order by its ID
	// Note: In WebFlux, void methods should return Mono<Void> to properly signal
	// completion
	@DeleteMapping("/api/order/{id}")
	public Mono<Void> delete(@PathVariable String id) {
		System.out.println("Deleting order: " + id);
		return orderService.delete(id);
	}
}

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

//	// Update an existing order
//	public Mono<Order> update(String id, Order o) {
//		// In WebFlux, we use flatMap to chain operations and switchIfEmpty to handle
//		// "Not Found"
//		return orderRepository.findById(id).flatMap(existingOrder -> {
//			// Ensure the ID from the path variable is set on the object
//			o.setOrderId(id);
//			// Save and return the updated order
//			return orderRepository.save(o);
//		}).switchIfEmpty(Mono.error(new RuntimeException("Order not found: " + id)));
//	}

	// Update an existing order (Selective/Incremental Update)
	public Mono<Order> update(String id, Order o) {
	    return orderRepository.findById(id)
	        .flatMap(existingOrder -> {
	            // 1. User ID and Restaurant ID usually don't change after ordering, but update if values are present in the request
	            if (o.getUserId() != null) {
	                existingOrder.setUserId(o.getUserId());
	            }
	            if (o.getRestaurantId() != null) {
	                existingOrder.setRestaurantId(o.getRestaurantId());
	            }

	            // 2. Update order status (this is the most common use of the update interface)
	            if (o.getOrderStatus() != null) {
	                existingOrder.setOrderStatus(o.getOrderStatus());
	            }

	            // 3. Update amount (note that Double is a wrapper class and can be checked for null)
	            if (o.getTotalAmount() != null) {
	                existingOrder.setTotalAmount(o.getTotalAmount());
	            }

	            // 4. Update the list of order items
	            if (o.getItems() != null && !o.getItems().isEmpty()) {
	                existingOrder.setItems(o.getItems());
	            }

	            // 5. Update delivery address and notes
	            if (o.getDeliveryAddress() != null) {
	                existingOrder.setDeliveryAddress(o.getDeliveryAddress());
	            }
	            if (o.getNote() != null) {
	                existingOrder.setNote(o.getNote());
	            }

	            // 6. Order date usually stays the same as the order time unless you specifically want to update it
	            if (o.getOrderDate() != null) {
	                existingOrder.setOrderDate(o.getOrderDate());
	            }

	            // Ensure ID consistency
	            existingOrder.setOrderId(id);

	            // Save and return the updated object
	            return orderRepository.save(existingOrder);
	        })
	        // If ID is not found, throw an exception or return empty
	        .switchIfEmpty(Mono.error(new RuntimeException("Order not found with id: " + id)));
	}
	// Delete an order by ID
	// Note: It must return Mono<Void> to ensure the reactive stream is executed
	public Mono<Void> delete(String id) {
		return orderRepository.deleteById(id);
	}
}

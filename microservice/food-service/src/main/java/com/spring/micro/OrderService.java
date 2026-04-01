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
public class OrderService {
	private final OrderRepository orderRepository;

	// 构造器注入（Spring 推荐）
	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	public Flux<Order> getAll() {
		return orderRepository.findAll();
	}

	public Mono<Order> getById(long id) {
		return orderRepository.findById(id);
	}

	public Mono<Order> create(Order o) {
		return orderRepository.save(o);
	}

	public Mono<Order> update(long id, Order o) {
		o.setOrderId(id);
		Mono<Order> updated = orderRepository.save(o);
		if (updated == null) {
			throw new RuntimeException("Order not found: " + id);
		}
		return updated;
	}

	public void delete(long id) {
		orderRepository.deleteById(id);
	}
}

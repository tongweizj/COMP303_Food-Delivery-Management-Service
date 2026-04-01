package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class OrderService {
	private final OrderRepository orderRepository;

	// 构造器注入（Spring 推荐）
	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	public List<Order> getAll() {
		return orderRepository.findAll();
	}

	public Order getById(long id) {
		return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found: " + id));
	}

	public Order create(Order o) {
		return orderRepository.save(o);
	}

	public Order update(long id, Order o) {
		Order updated = orderRepository.update(id, o);
		if (updated == null) {
			throw new RuntimeException("Order not found: " + id);
		}
		return updated;
	}

	public void delete(long id) {
		orderRepository.delete(id);
	}
}

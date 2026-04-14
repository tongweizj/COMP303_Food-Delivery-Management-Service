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
	            // 1. 用户 ID 和 餐厅 ID 通常在下单后不更改，但如果请求中有值则更新
	            if (o.getUserId() != null) {
	                existingOrder.setUserId(o.getUserId());
	            }
	            if (o.getRestaurantId() != null) {
	                existingOrder.setRestaurantId(o.getRestaurantId());
	            }

	            // 2. 更新订单状态 (这是 update 接口最常用的功能)
	            if (o.getOrderStatus() != null) {
	                existingOrder.setOrderStatus(o.getOrderStatus());
	            }

	            // 3. 更新金额 (注意 Double 是包装类，可以判 null)
	            if (o.getTotalAmount() != null) {
	                existingOrder.setTotalAmount(o.getTotalAmount());
	            }

	            // 4. 更新订单项列表
	            if (o.getItems() != null && !o.getItems().isEmpty()) {
	                existingOrder.setItems(o.getItems());
	            }

	            // 5. 更新送货地址和备注
	            if (o.getDeliveryAddress() != null) {
	                existingOrder.setDeliveryAddress(o.getDeliveryAddress());
	            }
	            if (o.getNote() != null) {
	                existingOrder.setNote(o.getNote());
	            }

	            // 6. 订单日期通常保持下单时间不变，除非你明确想更新它
	            if (o.getOrderDate() != null) {
	                existingOrder.setOrderDate(o.getOrderDate());
	            }

	            // 确保 ID 一致性
	            existingOrder.setOrderId(id);

	            // 保存并返回更新后的对象
	            return orderRepository.save(existingOrder);
	        })
	        // 如果找不到 ID，抛出异常或返回空
	        .switchIfEmpty(Mono.error(new RuntimeException("Order not found with id: " + id)));
	}
	// Delete an order by ID
	// Note: It must return Mono<Void> to ensure the reactive stream is executed
	public Mono<Void> delete(String id) {
		return orderRepository.deleteById(id);
	}
}

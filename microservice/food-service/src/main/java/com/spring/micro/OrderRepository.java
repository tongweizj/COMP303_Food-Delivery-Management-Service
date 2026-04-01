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
public class OrderRepository {
	private final List<Order> orders = new ArrayList<>();
	private final AtomicLong counter = new AtomicLong();

	// 增
	public Order save(Order o) {
		if (o.getOrderId() == 0) {
			o.setOrderId(counter.incrementAndGet());
		}
		orders.add(o);
		return o;
	}

	// 查所有
	public List<Order> findAll() {
		return new ArrayList<>(orders); // 返回副本，防止外部修改
	}

	// 查单个
	public Optional<Order> findById(long id) {
		return orders.stream().filter(o -> o.getOrderId() == id).findFirst();
	}

	// 改
	public Order update(long id, Order newData) {
		return findById(id).map(existing -> {
			existing.setCustomerName(newData.getCustomerName());
			existing.setMenuItemId(newData.getMenuItemId());
			existing.setQuantity(newData.getQuantity());
			existing.setOrderStatus(newData.getOrderStatus());
			existing.setOrderTime(newData.getOrderTime());
			return existing;
		}).orElse(null); // 或抛异常
	}

	// 删
	public void delete(long id) {
		orders.removeIf(r -> r.getOrderId() == id);
	}
}

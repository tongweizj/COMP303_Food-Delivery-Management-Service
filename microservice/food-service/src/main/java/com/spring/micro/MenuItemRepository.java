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
public class MenuItemRepository {
	private final List<MenuItem> menuItems = new ArrayList<>();
	private final AtomicLong counter = new AtomicLong();

	public Optional<MenuItem> findById(long id) {
		return menuItems.stream().filter(m -> m.getMenuItemId() == id).findFirst();
	}

	public List<MenuItem> findAll() {
		return new ArrayList<>(menuItems); // 返回副本，防止外部修改
	}

	// 增
	public MenuItem save(MenuItem m) {
		if (m.getMenuItemId() == 0) {
			m.setMenuItemId(counter.incrementAndGet());
		}
		menuItems.add(m);
		return m;
	}

	// 改
	public MenuItem update(long id, MenuItem newData) {
		return findById(id).map(existing -> {
			existing.setItemName(newData.getItemName());
			existing.setCategory(newData.getCategory());
			existing.setPrice(newData.getPrice());
			existing.setAvailability(newData.isAvailability());
			existing.setRestId(newData.getRestId());
			return existing;
		}).orElse(null); // 或抛异常
	}

	// 删
	public void delete(long id) {
		menuItems.removeIf(m -> m.getRestId() == id);
	}
}

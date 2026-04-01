package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MenuItemService {
	private final MenuItemRepository menuItemReposityory;

	public MenuItemService(MenuItemRepository menuItemReposityory) {
		this.menuItemReposityory = menuItemReposityory;
	}

	public List<MenuItem> getAll() {
		return menuItemReposityory.findAll();
	}

	public MenuItem getById(long id) {
		return menuItemReposityory.findById(id).orElseThrow(() -> new RuntimeException("MenuItem not found: " + id));
	}

	public MenuItem create(MenuItem m) {
		return menuItemReposityory.save(m);
	}

	public MenuItem update(long id, MenuItem m) {
		MenuItem updated = menuItemReposityory.update(id, m);
		if (updated == null) {
			throw new RuntimeException("MenuItem not found: " + id);
		}
		return updated;
	}

	public void delete(long id) {
		menuItemReposityory.delete(id);
	}
}

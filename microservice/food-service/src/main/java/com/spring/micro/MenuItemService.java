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
public class MenuItemService {
	private final MenuItemRepository menuItemReposityory;

	public MenuItemService(MenuItemRepository menuItemReposityory) {
		this.menuItemReposityory = menuItemReposityory;
	}

	public Flux<MenuItem> getAll() {
		return menuItemReposityory.findAll();
	}

	public Mono<MenuItem> getById(String id) {
		return menuItemReposityory.findById(id);
	}

	public Mono<MenuItem> save(MenuItem m) {
		if (m.getMenuItemId() != null && m.getMenuItemId().isEmpty()) {
            m.setMenuItemId(null);
        }
		return menuItemReposityory.save(m);
	}

	public Mono<MenuItem> update(String id, MenuItem m) {
		m.setMenuItemId(id);
		Mono<MenuItem> updated = menuItemReposityory.save(m);
		if (updated == null) {
			throw new RuntimeException("MenuItem not found: " + id);
		}
		return updated;
	}

	public Mono<Void> delete(String id) {
		return menuItemReposityory.deleteById(id);
	}

	public Mono<String> deleteById(String id) {
		// TODO Auto-generated method stub
		return null;
	}
}

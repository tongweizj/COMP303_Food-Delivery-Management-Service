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

	public Mono<MenuItem> getById(long id) {
		return menuItemReposityory.findById(id);
	}

	public Mono<MenuItem> create(MenuItem m) {
		return menuItemReposityory.save(m);
	}

	public Mono<MenuItem> update(long id, MenuItem m) {
		m.setMenuItemId(id);
		Mono<MenuItem> updated = menuItemReposityory.save(m);
		if (updated == null) {
			throw new RuntimeException("MenuItem not found: " + id);
		}
		return updated;
	}

	public void delete(long id) {
		menuItemReposityory.deleteById(id);
	}
}

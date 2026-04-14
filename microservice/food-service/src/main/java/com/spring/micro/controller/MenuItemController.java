package com.spring.micro.controller;

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

import com.spring.micro.entity.MenuItem;
import com.spring.micro.service.MenuItemService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/menuitems")
public class MenuItemController {
	private final MenuItemService menuItemService;

	public MenuItemController(MenuItemService menuItemService) {
		this.menuItemService = menuItemService;
	}

	// Find all
	@GetMapping
	public Flux<MenuItem> getAll() {
		return menuItemService.getAll();
	}

	// Find by ID
	@GetMapping("/{id}")
	public Mono<MenuItem> getById(@PathVariable String id) {
		return menuItemService.getById(id);
	}
	// Find menu items by restaurant ID
	@GetMapping("/restaurant/{restId}")
	public Flux<MenuItem> getByRestaurantId(@PathVariable String restId) {
	    return menuItemService.getByRestaurantId(restId);
	}
	// Create
	@PostMapping
	public Mono<MenuItem> create(@RequestBody MenuItem m) {
		return menuItemService.save(m);
	}

	// Update
	@PutMapping("/{id}")
	public Mono<MenuItem> updateById(@PathVariable String id, @RequestBody MenuItem m) {
		System.out.println("Updating menuItem: " + id);
		return menuItemService.update(id, m);
	}

	// Delete
	@DeleteMapping("/{id}")
	public void delete(@PathVariable String id) {
		System.out.println("Deleting menuItem: " + id);
		menuItemService.delete(id);
	}
}

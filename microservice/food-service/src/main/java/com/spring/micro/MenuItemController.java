package com.spring.micro;

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

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class MenuItemController {
	private final MenuItemService menuItemService;

	public MenuItemController(MenuItemService menuItemService) {
		this.menuItemService = menuItemService;
	}

	// 查所有
	@GetMapping("/api/menuitems")
	public Flux<MenuItem> getAll() {
		return menuItemService.getAll();
	}

	// 查单个
	@GetMapping("/api/menuitem/{id}")
	public Mono<MenuItem> getById(@PathVariable String id) {
		return menuItemService.getById(id);
	}

	// 增
	@PostMapping("/api/menuitem")
	public Mono<MenuItem> create(@RequestBody MenuItem m) {
		return menuItemService.save(m);
	}

	// 改
	@PutMapping("/api/menuitem/{id}")
	public Mono<MenuItem> updateById(@PathVariable String id, @RequestBody MenuItem m) {
		System.out.println("Updating menuItem: " + id);
		return menuItemService.update(id, m);
	}

	// 删
	@DeleteMapping("/api/menuitem/{id}")
	public void delete(@PathVariable String id) {
		System.out.println("Deleting menuItem: " + id);
		menuItemService.delete(id);
	}
}

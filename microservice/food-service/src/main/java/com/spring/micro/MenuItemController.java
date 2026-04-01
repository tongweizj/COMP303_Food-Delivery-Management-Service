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
@RequestMapping("/menuitems")
public class MenuItemController {
	private final MenuItemService menuItemService;

	public MenuItemController(MenuItemService menuItemService) {
		this.menuItemService = menuItemService;
	}

	// 查所有
	@GetMapping
	public Flux<MenuItem> getAll() {
		return menuItemService.getAll();
	}

	// 查单个
	@GetMapping("/{id}")
	public Mono<MenuItem> getById(@PathVariable long id) {
		return menuItemService.getById(id);
	}

	// 增
	@PostMapping
	public Mono<MenuItem> create(@RequestBody MenuItem m) {
		return menuItemService.create(m);
	}

	// 改
	@PutMapping("/{id}")
	public Mono<MenuItem> updateById(@PathVariable long id, @RequestBody MenuItem m) {
		System.out.println("Updating menuItem: " + id);
		return menuItemService.update(id, m);
	}

	// 删
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id) {
		System.out.println("Deleting menuItem: " + id);
		menuItemService.delete(id);
	}
}

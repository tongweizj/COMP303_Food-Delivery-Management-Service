package com.spring.micro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.thymeleaf.spring6.context.webflux.IReactiveDataDriverContextVariable;
import org.thymeleaf.spring6.context.webflux.ReactiveDataDriverContextVariable;

import reactor.core.publisher.Mono;


@Controller
public class MenuItemWebController {
	@Autowired
    private  MenuItemService menuItemService;
    // Inject the service to fetch data for the views
    public MenuItemWebController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }
	@GetMapping("/menuitems")
	public String foods(Model model) {
		IReactiveDataDriverContextVariable reactiveData = 
	            new ReactiveDataDriverContextVariable(menuItemService.getAll(), 1);
	        model.addAttribute("menuitems", reactiveData);

		return "menuitem/list"; // Corresponds to templates/index.html
	}
	
	@GetMapping("/menuitem/create")
	public String createFood(Model model) {
		model.addAttribute("menuItem", new MenuItem());
		return "menuitem/form"; // Corresponds to templates/index.html
	}
	
	@GetMapping("/menuitem/{id}/edit")
	public Mono<String> editFood(@PathVariable("id") String id, Model model) {

		return menuItemService.getById(id)
	            // 2. Put the found item into the model
	            .doOnNext(item -> {
	                model.addAttribute("menuItem", item);
	                // The key "menuItem" here must be consistent with the variable name in the details page template
	                System.out.println("Displaying details for: " + item.getItemName());
	            })
	            // 3. Return the logical view name after success
	            .thenReturn("menuitem/form")
	            // 4. Fault tolerance: If the ID cannot be found in the database, redirect back to the list page to avoid page crash
	            .defaultIfEmpty("redirect:/menuitems"); // Corresponds to templates/index.html
	}
	
	@GetMapping("/menuitem/{id}")
	public Mono<String> detailFood(@PathVariable("id") String id, Model model) {

		return menuItemService.getById(id)
	            // 2. Put the found item into the model
	            .doOnNext(item -> {
	                model.addAttribute("menuItem", item);
	                // The key "menuItem" here must be consistent with the variable name in the details page template
	                System.out.println("Displaying details for: " + item.getItemName());
	            })
	            // 3. Return the logical view name after success
	            .thenReturn("menuitem/detail")
	            // 4. Fault tolerance: If the ID cannot be found in the database, redirect back to the list page to avoid page crash
	            .defaultIfEmpty("redirect:/menuitems");
	}
	
	@PostMapping("/menuitem/save")
	public Mono<String> saveMenuItem(@ModelAttribute("menuItem") MenuItem menuItem) {
	    return menuItemService.save(menuItem) // Call Reactive Repository
	            .thenReturn("redirect:/menuitems");
	}
	
	@GetMapping("/menuitem/delete/{id}")
	public Mono<String> deleteMenuItem(@PathVariable String id) {
	    return menuItemService.delete(id)
	            .doOnSuccess(v -> System.out.println("Deleted menu item: " + id))
	            .then(Mono.just("redirect:/menuitems"));
	}
}
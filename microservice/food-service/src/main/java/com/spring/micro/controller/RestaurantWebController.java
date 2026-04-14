package com.spring.micro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.thymeleaf.spring6.context.webflux.IReactiveDataDriverContextVariable;
import org.thymeleaf.spring6.context.webflux.ReactiveDataDriverContextVariable;

import com.spring.micro.entity.Restaurant;
import com.spring.micro.service.RestaurantService;

import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/restaurants")
public class RestaurantWebController {
	@Autowired
    private  RestaurantService restaurantService;

    // Inject the service to fetch data for the views
    public RestaurantWebController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // List all restaurants
    @GetMapping
    public String listRestaurants(Model model) {
        IReactiveDataDriverContextVariable reactiveData = 
            new ReactiveDataDriverContextVariable(restaurantService.getAll(), 1);
        model.addAttribute("restaurants", reactiveData);
        return "restaurant/list"; 
    }
    
    // Show form to create a new restaurant
    @GetMapping("/create")
    public String createRestaurantForm(Model model) {
        // Pass an empty Restaurant object so the Thymeleaf form has something to bind to
        model.addAttribute("restaurant", new Restaurant());
        return "restaurant/form"; // Maps to templates/restaurant/form.html
    }
    
    // Show form to edit an existing restaurant
    @GetMapping("/edit/{id}")
    public String editRestaurantForm(@PathVariable String id, Model model) {
        // Fetch the specific restaurant (Mono) and add it to the model
        model.addAttribute("restaurant", restaurantService.getById(id));
        return "restaurant/form"; // Maps to templates/restaurant/form.html
    }
    
    // Show details of a single restaurant
//    @GetMapping("/{id}")
//    public String detailRestaurant(@PathVariable String id, Model model) {
//        // Fetch the specific restaurant (Mono) and add it to the model
//        model.addAttribute("restaurant", restaurantService.getById(id));
//        return "restaurant/detail"; // Maps to templates/restaurant/detail.html
//    }
    @GetMapping("/{id}")
    public Mono<String> detailRestaurant(@PathVariable String id, Model model) {
        return restaurantService.getById(id)
            .doOnNext(restaurant -> model.addAttribute("restaurant", restaurant))
            .map(restaurant -> "restaurant/detail") // Return view name only when data arrives
            .defaultIfEmpty("error/404"); // If restaurant not found, can redirect to 404
    }
    /**
     * Unified save interface for handling creation and updates
     * @param restaurant Object automatically bound from the form
     * @return The return value here must be Mono<String> for view redirection in a WebFlux environment
     */
    @PostMapping("/save")
    public Mono<String> saveRestaurant(@ModelAttribute("restaurant") Restaurant restaurant) {
    	// Critical fix: If ID is an empty string, force it to null
        if (restaurant.getRestaurantId() != null && restaurant.getRestaurantId().isEmpty()) {
            restaurant.setRestaurantId(null);
        }
        // 1. Call the reactive service layer to save data
        // 2. Use .then() to ensure the save action completes before executing subsequent operations
        // 3. Return "redirect:/restaurant/list" to tell the browser to redirect
        return restaurantService.save(restaurant)
        		.doOnNext(saved -> System.out.println("Saved with ID: " + saved.getRestaurantId()))
                .then(Mono.just("redirect:/restaurants"))
                .onErrorResume(e -> {
                    // If an error occurs, log it and jump back to the form page (optional)
                    System.err.println("Save failed: " + e.getMessage());
                    return Mono.just("restaurant/form");
                });
    }
    @GetMapping("/delete/{id}")
    public Mono<String> deleteRestaurant(@PathVariable String id) {
        return restaurantService.delete(id)
                .then(Mono.just("redirect:/restaurants"));
    }
}

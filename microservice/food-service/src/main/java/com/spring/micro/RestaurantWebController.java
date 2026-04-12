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
public class RestaurantWebController {
	@Autowired
    private  RestaurantService restaurantService;

    // Inject the service to fetch data for the views
    public RestaurantWebController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // List all restaurants
    @GetMapping("/restaurants")
    public String listRestaurants(Model model) {
        // Fetch all restaurants (Flux) and add them to the model
    	// Wrap Flux, tell Thymeleaf this is a reactive stream, processing it item by item
        IReactiveDataDriverContextVariable reactiveData = 
            new ReactiveDataDriverContextVariable(restaurantService.getAll(), 1);
        model.addAttribute("restaurants", reactiveData);
        return "restaurant/list"; // Maps to templates/restaurant/list.html
    }
    
    // Show form to create a new restaurant
    @GetMapping("/restaurant/create")
    public String createRestaurantForm(Model model) {
        // Pass an empty Restaurant object so the Thymeleaf form has something to bind to
        model.addAttribute("restaurant", new Restaurant());
        return "restaurant/form"; // Maps to templates/restaurant/form.html
    }
    
    // Show form to edit an existing restaurant
    @GetMapping("/restaurant/edit/{id}")
    public String editRestaurantForm(@PathVariable String id, Model model) {
        // Fetch the specific restaurant (Mono) and add it to the model
        model.addAttribute("restaurant", restaurantService.getById(id));
        return "restaurant/form"; // Maps to templates/restaurant/form.html
    }
    
    // Show details of a single restaurant
    @GetMapping("/restaurant/{id}")
    public String detailRestaurant(@PathVariable String id, Model model) {
        // Fetch the specific restaurant (Mono) and add it to the model
        model.addAttribute("restaurant", restaurantService.getById(id));
        return "restaurant/detail"; // Maps to templates/restaurant/detail.html
    }
    /**
     * Unified save interface for handling creation and updates
     * @param restaurant Object automatically bound from the form
     * @return The return value here must be Mono<String> for view jumping in the WebFlux environment
     */
    @PostMapping("/restaurant/save")
    public Mono<String> saveRestaurant(@ModelAttribute("restaurant") Restaurant restaurant) {
    	// Key fix: If ID is an empty string, force it to null
        if (restaurant.getRestaurantId() != null && restaurant.getRestaurantId().isEmpty()) {
            restaurant.setRestaurantId(null);
        }
        // 1. Call the reactive service layer to save data
        // 2. Use .then() to ensure subsequent operations are executed after the save action is completed
        // 3. Return "redirect:/restaurants" to tell the browser to redirect
        return restaurantService.save(restaurant)
        		.doOnNext(saved -> System.out.println("Saved with ID: " + saved.getRestaurantId()))
                .then(Mono.just("redirect:/restaurants"))
                .onErrorResume(e -> {
                    // If an error occurs, you can log it and redirect back to the form page (optional)
                    System.err.println("Save failed: " + e.getMessage());
                    return Mono.just("restaurant/form");
                });
    }
}

package com.spring.micro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RestaurantWebController {

    private final RestaurantService restaurantService;

    // Inject the service to fetch data for the views
    public RestaurantWebController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // List all restaurants
    @GetMapping("/restaurants")
    public String listRestaurants(Model model) {
        // Fetch all restaurants (Flux) and add them to the model
        model.addAttribute("restaurants", restaurantService.getAll());
        return "restaurant/list"; // Maps to templates/restaurant/list.html
    }
    
    // Show form to create a new restaurant
    @GetMapping("/restaurant/new")
    public String createRestaurantForm(Model model) {
        // Pass an empty Restaurant object so the Thymeleaf form has something to bind to
        model.addAttribute("restaurant", new Restaurant());
        return "restaurant/form"; // Maps to templates/restaurant/form.html
    }
    
    // Show form to edit an existing restaurant
    @GetMapping("/restaurant/{id}/edit")
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
}

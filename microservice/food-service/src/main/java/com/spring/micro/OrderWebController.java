package com.spring.micro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class OrderWebController {

    private final OrderService orderService;

    // Inject the service to fetch data for the views
    public OrderWebController(OrderService orderService) {
        this.orderService = orderService;
    }

    // List all orders
    @GetMapping("/orders")
    public String listOrders(Model model) {
        // Fetch all orders (Flux) and add them to the model for Thymeleaf to render
        model.addAttribute("orders", orderService.getAll());
        return "order/list"; // Maps to templates/order/list.html
    }
    
    // Show form to create a new order
    @GetMapping("/order/new")
    public String createOrderForm(Model model) {
        // Pass an empty Order object so the Thymeleaf form has an object to bind inputs to
        model.addAttribute("order", new Order());
        return "order/form"; // Maps to templates/order/form.html
    }
    
    // Show form to edit an existing order
    @GetMapping("/order/{id}/edit")
    public String editOrderForm(@PathVariable String id, Model model) {
        // Fetch the specific order (Mono) using the ID from the URL and add it to the model
        model.addAttribute("order", orderService.getById(id));
        return "order/form"; // Maps to templates/order/form.html
    }
    
    // Show details of a single order
    @GetMapping("/order/{id}")
    public String detailOrder(@PathVariable String id, Model model) {
        // Fetch the specific order (Mono) using the ID from the URL and add it to the model
        model.addAttribute("order", orderService.getById(id));
        return "order/detail"; // Maps to templates/order/detail.html
    }
}

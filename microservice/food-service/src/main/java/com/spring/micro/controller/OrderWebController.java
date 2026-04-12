package com.spring.micro;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import reactor.core.publisher.Mono;

@Controller
public class OrderWebController {
	@Autowired
    private final OrderService orderService;
	@Autowired
    private CustomerService customerService;
	@Autowired
    private RestaurantService restaurantService;
	@Autowired
    private MenuItemService menuItemService;
    

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
    public Mono<String> createOrderForm(Model model) {
        // Pass an empty Order object so the Thymeleaf form has an object to bind inputs to
        model.addAttribute("order", new Order());
     
		return Mono.zip(
                customerService.getAllCustomers().collectList(),
                restaurantService.getAll().collectList(),
                menuItemService.getAll().collectList()
            ).doOnNext(tuple -> {
                model.addAttribute("customers", tuple.getT1());
                model.addAttribute("restaurants", tuple.getT2());
                model.addAttribute("menuItems", tuple.getT3());
            }).thenReturn("order/form");
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
    
    @PostMapping("/order/save")
    public Mono<String> saveOrder(@ModelAttribute("order") Order order) {
        // 1. 如果是新订单，确保生成时间
        if (order.getOrderId() == null || order.getOrderId().isEmpty()) {
            order.setOrderId(null); // 触发 MongoDB 自动生成
            order.setOrderDate(LocalDateTime.now());
        }

        // 2. 默认状态 (如果是新建)
        if (order.getOrderStatus() == null) {
            order.setOrderStatus("Placed");
        }

        return orderService.save(order)
                .thenReturn("redirect:/orders");
    }
	@GetMapping("/order/delete/{id}")
	public Mono<String> deleteOrder(@PathVariable String id) {
	    return orderService.delete(id)
	            .doOnSuccess(v -> System.out.println("Deleted order: " + id))
	            .then(Mono.just("redirect:/orders"));
	}
}

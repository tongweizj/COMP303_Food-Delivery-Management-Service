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
    private final RestaurantService restaurantService;

    // Inject the service to fetch data for the views
    public RestaurantWebController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // List all restaurants
    @GetMapping("/restaurants")
    public String listRestaurants(Model model) {
        // Fetch all restaurants (Flux) and add them to the model
    	// 包装 Flux，告诉 Thymeleaf 这是一个响应式流，逐条处理
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
     * 处理创建和更新的统一保存接口
     * @param restaurant 自动从表单绑定的对象
     * @return 这里的返回值必须是 Mono<String> 用于 WebFlux 环境下的视图跳转
     */
    @PostMapping("/restaurant/save")
    public Mono<String> saveRestaurant(@ModelAttribute("restaurant") Restaurant restaurant) {
    	// 关键修正：如果 ID 是空字符串，强制设为 null
        if (restaurant.getRestaurantId() != null && restaurant.getRestaurantId().isEmpty()) {
            restaurant.setRestaurantId(null);
        }
        // 1. 调用响应式服务层保存数据
        // 2. 使用 .then() 确保保存动作完成后再执行后续操作
        // 3. 返回 "redirect:/restaurant/list" 告诉浏览器跳转
        return restaurantService.save(restaurant)
        		.doOnNext(saved -> System.out.println("Saved with ID: " + saved.getRestaurantId()))
                .then(Mono.just("redirect:/restaurants"))
                .onErrorResume(e -> {
                    // 如果发生错误，可以记录日志并跳转回表单页（可选）
                    System.err.println("Save failed: " + e.getMessage());
                    return Mono.just("restaurant/form");
                });
    }
}

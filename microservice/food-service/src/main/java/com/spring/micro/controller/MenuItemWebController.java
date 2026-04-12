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

import com.spring.micro.entity.MenuItem;
import com.spring.micro.service.MenuItemService;

import reactor.core.publisher.Mono;


@Controller
@RequestMapping("/menuitems")
public class MenuItemWebController {
	@Autowired
    private  MenuItemService menuItemService;
    // Inject the service to fetch data for the views
    public MenuItemWebController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }
	@GetMapping
	public String foods(Model model) {
		IReactiveDataDriverContextVariable reactiveData = 
	            new ReactiveDataDriverContextVariable(menuItemService.getAll(), 1);
	        model.addAttribute("menuitems", reactiveData);

		return "menuitem/list"; // 对应 templates/index.html
	}
	
	@GetMapping("/create")
	public String createFood(Model model) {
		model.addAttribute("menuItem", new MenuItem());
		return "menuitem/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/{id}/edit")
	public Mono<String> editFood(@PathVariable("id") String id, Model model) {

		return menuItemService.getById(id)
	            // 2. 将查到的 item 放入 model 中
	            .doOnNext(item -> {
	                model.addAttribute("menuItem", item);
	                // 这里的 key "menuItem" 必须和详情页模板中的变量名一致
	                System.out.println("Displaying details for: " + item.getItemName());
	            })
	            // 3. 成功后返回逻辑视图名
	            .thenReturn("menuitem/form")
	            // 4. 容错处理：如果数据库查不到这个 ID，重定向回列表页，避免页面崩掉
	            .defaultIfEmpty("redirect:/menuitems"); // 对应 templates/index.html
	}
	
	@GetMapping("/{id}")
	public Mono<String> detailFood(@PathVariable("id") String id, Model model) {

		return menuItemService.getById(id)
	            // 2. 将查到的 item 放入 model 中
	            .doOnNext(item -> {
	                model.addAttribute("menuItem", item);
	                // 这里的 key "menuItem" 必须和详情页模板中的变量名一致
	                System.out.println("Displaying details for: " + item.getItemName());
	            })
	            // 3. 成功后返回逻辑视图名
	            .thenReturn("menuitem/detail")
	            // 4. 容错处理：如果数据库查不到这个 ID，重定向回列表页，避免页面崩掉
	            .defaultIfEmpty("redirect:/menuitems");
	}
	
	@PostMapping("/save")
	public Mono<String> saveMenuItem(@ModelAttribute("menuItem") MenuItem menuItem) {
	    return menuItemService.save(menuItem) // 调用 Reactive Repository
	            .thenReturn("redirect:/menuitems");
	}
	
	@GetMapping("/delete/{id}")
	public Mono<String> deleteMenuItem(@PathVariable String id) {
	    return menuItemService.delete(id)
	            .doOnSuccess(v -> System.out.println("Deleted menu item: " + id))
	            .then(Mono.just("redirect:/menuitems"));
	}
}
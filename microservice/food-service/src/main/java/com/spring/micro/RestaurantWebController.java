package com.spring.micro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RestaurantWebController {
	@GetMapping("/restaurants")
	public String orders(Model model) {

		return "restaurant/list"; // 对应 templates/index.html
	}
	
	@GetMapping("/restaurant/new")
	public String createorder(Model model) {

		return "restaurant/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/restaurant/{id}/edit")
	public String editorder(Model model) {

		return "restaurant/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/restaurant/{id}")
	public String detailorder(Model model) {

		return "restaurant/detail"; // 对应 templates/index.html
	}

}

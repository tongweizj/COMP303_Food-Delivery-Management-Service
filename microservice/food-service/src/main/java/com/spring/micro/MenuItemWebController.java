package com.spring.micro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MenuItemWebController {

	@GetMapping("/menuitems")
	public String foods(Model model) {

		return "menuitem/list"; // 对应 templates/index.html
	}
	
	@GetMapping("/menuitem/new")
	public String createFood(Model model) {

		return "menuitem/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/menuitem/{id}/edit")
	public String editFood(Model model) {

		return "menuitem/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/menuitem/{id}")
	public String detailFood(Model model) {

		return "menuitem/detail"; // 对应 templates/index.html
	}
}
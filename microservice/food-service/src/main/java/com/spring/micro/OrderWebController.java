package com.spring.micro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OrderWebController {
	@GetMapping("/orders")
	public String orders(Model model) {

		return "order/list"; // 对应 templates/index.html
	}
	
	@GetMapping("/order/new")
	public String createorder(Model model) {

		return "order/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/order/{id}/edit")
	public String editorder(Model model) {

		return "order/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/order/{id}")
	public String detailorder(Model model) {

		return "order/detail"; // 对应 templates/index.html
	}
}

package com.spring.micro;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomerWebController {
	@GetMapping("/customers")
	public String customers(Model model) {

		return "customer/list"; // 对应 templates/index.html
	}
	
	@GetMapping("/customer/new")
	public String createCustomer(Model model) {

		return "customer/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/customer/{id}/edit")
	public String editCustomer(Model model) {

		return "customer/form"; // 对应 templates/index.html
	}
	
	@GetMapping("/customer/{id}")
	public String detailCustomer(Model model) {

		return "customer/detail"; // 对应 templates/index.html
	}
}

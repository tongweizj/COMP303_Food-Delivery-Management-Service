package com.spring.micro.controller;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("/api")
	public String home(Model model) {
		model.addAttribute("apiName", "Restaurant Management API");
		model.addAttribute("version", "v1.0");
		return "index"; 
	}
}
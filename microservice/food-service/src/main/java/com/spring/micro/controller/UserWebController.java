package com.spring.micro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.thymeleaf.spring6.context.webflux.IReactiveDataDriverContextVariable;
import org.thymeleaf.spring6.context.webflux.ReactiveDataDriverContextVariable;

import com.spring.micro.entity.User;
import com.spring.micro.service.UserService;

import reactor.core.publisher.Mono;

@Controller
public class UserWebController {
	@Autowired
    private UserService userService;
	
	@GetMapping("/users")
	public String users(Model model) {
		// Use ReactiveDataDriver mode to handle the user list
        IReactiveDataDriverContextVariable reactiveData = 
                new ReactiveDataDriverContextVariable(userService.getAllUsers(), 1);
        model.addAttribute("users", reactiveData);

		return "user/list"; 
	}
	
	@GetMapping("/users/create")
	public String createUser(Model model) {
		model.addAttribute("user", new User());

		return "user/form";
	}
	
	@GetMapping("/users/{id}/edit")
	public Mono<String> editUser(@PathVariable String id,Model model) {

		return userService.getUserById(id)
                .doOnNext(c -> model.addAttribute("user", c))
                .thenReturn("user/form");
	}
	
	@GetMapping("/users/{id}")
	public Mono<String> detailUser(@PathVariable String id, Model model) {

		return userService.getUserById(id)
                .doOnNext(c -> model.addAttribute("user", c))
                .thenReturn("user/detail");
	}
	@PostMapping("/users/save")
	public Mono<String> saveUser(@ModelAttribute("user") User user) {
	    // Force handling: If ID is an empty string (Thymeleaf might pass "" in create mode), set to null so MongoDB generates a new ID
	    if (user.getId() != null && user.getId().isEmpty()) {
	        user.setId(null);
	    }
	    
	    return userService.save(user)
	            .thenReturn("redirect:/users");
	}
	
	@GetMapping("/users/delete/{id}")
	public Mono<String> deleteUser(@PathVariable String id) {
	    // Call service to execute delete logic
	    return userService.deleteUser(id)
	            .doOnSuccess(v -> System.out.println("User deleted: " + id))
	            .then(Mono.just("redirect:/users"));
	}
}

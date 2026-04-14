package com.spring.micro.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.micro.dto.LoginRequest;
import com.spring.micro.dto.LoginResponse;
import com.spring.micro.entity.User;
import com.spring.micro.security.JwtUtil;
import com.spring.micro.service.UserService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class UserController {
	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * Endpoint to handle user login requests from the React frontend. Expects a
	 * JSON body containing 'username' and 'password'.
	 */
	@PostMapping("/api/auth/signup")
	public Mono<User> createUser(@RequestBody User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		return userService.save(user);
	}

	@PostMapping("/api/auth/login")
	public Mono<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
		return userService.login(loginRequest);
	}

	@GetMapping("/api/users")
	public Flux<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/api/users/{id}")
	public Mono<User> getUserById(@PathVariable String id) {
		return userService.getUserById(id);
	}

//    @GetMapping("/api/users/profile")
//    public Mono<User> getUserProfile(@RequestHeader("Authorization") String authHeader) {
//    	System.out.println("==== AUTH HEADER START ====");
//        System.out.println(authHeader);
//        System.out.println("==== AUTH HEADER END ====");
//        return userService.getUserProfile(authHeader);
//    }

	@GetMapping("/api/users/profile")
	public Mono<User> getProfile(
			org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken authentication) {
		System.out.println("==== AUTH HEADER START ====");
		System.out.println(authentication);
		String email = authentication.getToken().getSubject();

		return userService.getUserProfile(email);
	}

	@GetMapping("/api/me")
	public Map<String, Object> getCurrentUser(
			org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken authentication) {
		// 1. Get all Claims
		Map<String, Object> attributes = authentication.getTokenAttributes();

		// 2. Extract information
		String email = authentication.getToken().getSubject(); // This is the username you stored
		String role = authentication.getToken().getClaimAsString("role");// Corresponds to the .claim("role", role) when
																			// you generated the token
		System.out.println(role);

		// 3. Assemble the return result (similar to Express response structure)
		Map<String, Object> response = new HashMap<>();
		response.put("email", email);
		response.put("role", role);
		return response;
	}

	@PutMapping("/api/users/profile")
	public Mono<User> getUserProfile(@RequestHeader("Authorization") String authHeader, @RequestBody User user) {
		System.out.println("==== AUTH HEADER START ====");
		System.out.println(authHeader);
		System.out.println("==== AUTH HEADER END ====");
		return userService.updateUser(authHeader, user);
	}

	@PutMapping("/api/users/{id}")
	public Mono<User> updateUser(@PathVariable String id, @RequestBody User user) {
		return userService.updateUser(id, user);
	}

	@DeleteMapping("/api/users/{id}")
	public String deleteUser(@PathVariable String id) {
		userService.deleteUser(id);
		return "User deleted successfully with id: " + id;
	}
}

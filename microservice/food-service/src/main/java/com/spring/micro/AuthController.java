package com.spring.micro;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private JwtUtil jwtUtil;

	/**
	 * Endpoint to handle user login requests from the React frontend. Expects a
	 * JSON body containing 'username' and 'password'.
	 */
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		String role;

		if ("admin".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
			role = "ROLE_ADMIN";
		} else if ("user".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
			role = "ROLE_USER";
		} else {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Invalid username or password");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
		}

		// JWT Token
		String realJwtToken = jwtUtil.generateToken(loginRequest.getUsername(), role);

		Map<String, String> responseData = new HashMap<>();
		responseData.put("token", realJwtToken);
		responseData.put("username", loginRequest.getUsername());
		responseData.put("role", role);
		responseData.put("message", "Login successful!");

		return ResponseEntity.ok(responseData);
	}
}

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

		// TODO: Replace this hardcoded check with real database authentication later.
		// For now, we mock a successful login if the username is "admin" and password
		// is "password".
		if ("admin".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
			String role = "ROLE_USER";
			if ("admin".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
				role = "ROLE_ADMIN";
			} else if ("user".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
				role = "ROLE_USER"; // 假設這是一般使用者的帳密
			} else {
				Map<String, String> errorResponse = new HashMap<>();
				errorResponse.put("message", "Invalid username or password");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
			}

			// If credentials are correct, generate a JWT token.
			// Note: This is a mocked token string. In the next step, we will use a JwtUtil
			// class to generate a real one.
			String realJwtToken = jwtUtil.generateToken(loginRequest.getUsername(), role);

			Map<String, String> responseData = new HashMap<>();
			responseData.put("token", realJwtToken); // 把真 Token 放進去
			responseData.put("username", loginRequest.getUsername());
			responseData.put("role", role);
			responseData.put("message", "Login successful!");

			// Return 200 OK with the token
			return ResponseEntity.ok(responseData);

		} else {
			// If credentials do not match, return 401 Unauthorized.
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Invalid username or password");

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
		}
	}
}

package com.spring.micro;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private JwtUtil jwtUtil;

	// 注入剛才寫好的 Repository 與 加密器
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * Endpoint to handle user login requests from the React frontend. Expects a
	 * JSON body containing 'username' and 'password'.
	 */
	@PostMapping("/login")
	public Mono<ResponseEntity<Map<String, String>>> login(@RequestBody LoginRequest loginRequest) {

		System.out.println("BRIAN DEBUG-LOGIN: " + loginRequest.getUsername());
		System.out.println("BRIAN DEBUG-LOGIN: " + loginRequest.getPassword());

		// 💡 開發用寫死邏輯：如果帳號是 admin 且密碼是 password
		if ("admin".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
			String role = "ROLE_ADMIN";
			String token = jwtUtil.generateToken(loginRequest.getUsername(), role);

			Map<String, String> responseData = new HashMap<>();
			responseData.put("token", token);
			responseData.put("username", loginRequest.getUsername());
			responseData.put("role", role);
			responseData.put("message", "Admin Login successful (Dev Mode)!");

			return Mono.just(ResponseEntity.ok(responseData));
		}

		// 1. 透過帳號去 MongoDB 尋找使用者
		return userRepository.findByUsername(loginRequest.getUsername())

				// 2. 如果資料庫有找到這個帳號
				.flatMap(user -> {
					// 3. 驗證密碼：使用 passwordEncoder.matches (明文密碼, 資料庫裡的加密密碼)
					if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

						// 密碼正確，產生真正的 JWT Token
						String realJwtToken = jwtUtil.generateToken(user.getUsername(), user.getRole());

						Map<String, String> responseData = new HashMap<>();
						responseData.put("token", realJwtToken);
						responseData.put("username", user.getUsername());
						responseData.put("role", user.getRole());
						responseData.put("message", "Login successful!");

						return Mono.just(ResponseEntity.ok(responseData));

					} else {
						// 密碼錯誤
						Map<String, String> errorResponse = new HashMap<>();
						errorResponse.put("message", "Invalid username or password");
						return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse));
					}
				})

				// 4. 如果資料庫裡根本沒有這個帳號 (Mono 為空)
				.switchIfEmpty(Mono.defer(() -> {
					Map<String, String> errorResponse = new HashMap<>();
					errorResponse.put("message", "Invalid username or password"); // 為了安全，不要明確告訴前端是帳號錯還是密碼錯
					return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse));
				}));
	}

	@PostMapping("/signup")
	public Mono<ResponseEntity<Map<String, String>>> signup(@RequestBody SignupRequest signupRequest) {

		// 簡單的欄位驗證
		if (signupRequest.getUsername() == null || signupRequest.getPassword() == null) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Username and password are required!");
			return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse));
		}

		// 1. 先去資料庫找這個帳號存不存在
		return userRepository.findByUsername(signupRequest.getUsername())

				// 2. 如果找到了 (有值)，代表帳號已被使用，回傳 400 錯誤
				.flatMap(existingUser -> {
					Map<String, String> response = new HashMap<>();
					response.put("message", "Username already exists!");
					return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response));
				})

				// 3. 如果沒找到 (Mono 是空的)，才執行儲存邏輯
				.switchIfEmpty(Mono.defer(() -> {

					// 建立新的 User 實體
					User newUser = new User();
					newUser.setUsername(signupRequest.getUsername());
					// 這裡執行密碼加密
					newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
					newUser.setName(signupRequest.getName());
					newUser.setRole("ROLE_USER"); // 預設給予一般使用者權限

					// 將 User 存入 MongoDB
					return userRepository.save(newUser).map(savedUser -> {
						Map<String, String> response = new HashMap<>();
						response.put("message", "User " + savedUser.getUsername() + " registered successfully!");
						return ResponseEntity.status(HttpStatus.CREATED).body(response);
					});
				}));
	}
}

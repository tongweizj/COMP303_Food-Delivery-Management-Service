package com.spring.micro.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.spring.micro.dto.LoginRequest;
import com.spring.micro.dto.LoginResponse;
import com.spring.micro.entity.User;
import com.spring.micro.repository.UserRepository;
import com.spring.micro.security.JwtUtil;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	
    public Flux<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Mono<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Mono<User> getUserProfile(String email) {
        return userRepository.findByEmail(email);
    }
//    public Mono<User> save(User user) {
//        if (user.getEmail() == null || user.getEmail().isBlank()
//                || user.getPassword() == null || user.getPassword().isBlank()) {
//            return Mono.error(new ResponseStatusException(
//                    HttpStatus.BAD_REQUEST, "User email and password are required!"));
//        }
//
//        return userRepository.findByEmail(user.getEmail())
//                .flatMap(existingUser -> Mono.<User>error(new ResponseStatusException(
//                        HttpStatus.BAD_REQUEST, "User email already exists!")))
//                .switchIfEmpty(Mono.defer(() -> {
//                    User newUser = new User();
//                    newUser.setEmail(user.getEmail());
//                    newUser.setName(user.getName());
//                    newUser.setPassword(passwordEncoder.encode(user.getPassword()));
//                    newUser.setRole("USER");
//
//                    return userRepository.save(newUser);
//                }));
//    }
    public Mono<User> save(User user) {
        // If it's a new user (id is null/empty), both email and password are required
        if (user.getId() == null || user.getId().isEmpty()) {
            if (user.getEmail() == null || user.getPassword() == null || user.getPassword().isEmpty()) {
                return Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST, "User email and password are required!"));
            }
        } else {
            // If updating user info, email cannot be empty, but password can be empty (meaning no password change)
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return Mono.error(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required!"));
            }
        }

        // Handle password logic during update: if new password is empty, retrieve the old password from the database and fill it back
        if (user.getId() != null && (user.getPassword() == null || user.getPassword().isEmpty())) {
            return userRepository.findById(user.getId())
                .map(oldUser -> {
                    user.setPassword(oldUser.getPassword()); // Restore old password
                    return user;
                })
                .flatMap(userRepository::save);
        }

        return userRepository.save(user);
    }
    
    public Mono<LoginResponse> login(LoginRequest loginRequest) {

        if (loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()
                || loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
            return Mono.error(new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Username and password are required"));
        }

        if ("admin".equals(loginRequest.getEmail()) && "password".equals(loginRequest.getPassword())) {
            String role = "ROLE_ADMIN";
            String token = jwtUtil.generateToken(loginRequest.getEmail(), role);

            return Mono.just(new LoginResponse(
                    token,
                    loginRequest.getEmail(),
                    role,
                    "Admin Login successful (Dev Mode)!"
            ));
        }

        return userRepository.findByEmail(loginRequest.getEmail())
                .flatMap(user -> {
                    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                        return Mono.<LoginResponse>error(new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED, "Invalid username or password"));
                    }

                    String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

                    return Mono.just(new LoginResponse(
                            token,
                            user.getEmail(),
                            user.getRole(),
                            "Login successful!"
                    ));
                })
                .switchIfEmpty(Mono.error(new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Invalid username or password")));
    }
    
    
    public Mono<User> updateUser(String authHeader, User user) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new RuntimeException("Missing or invalid Authorization header"));
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        System.out.println("==== updateUser START ====");
        System.out.println("TOKEN: " + token);
        System.out.println("EMAIL: " + email);
        System.out.println("==== updateUser END ====");

        return userRepository.findByEmail(email)
                .switchIfEmpty(Mono.error(new RuntimeException("User not found: " + email)))
                .flatMap(existingUser -> {
                    // Only update allowed fields
                    existingUser.setName(user.getName());

                    // If you allow email updates, uncomment this line
                    // existingUser.setEmail(user.getEmail());
                    existingUser.setAddress(user.getAddress());
                    existingUser.setPhoneNumber(user.getPhoneNumber());

                    // If you allow password updates, encrypt it before saving
                    if (user.getPassword() != null && !user.getPassword().isBlank()) {
                        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
                    }

                    return userRepository.save(existingUser);
                });
    }

    
    
    public Mono<Void> deleteUser(String id) {
        return userRepository.deleteById(id);
    }
    
    
}

package com.spring.micro.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

	// 1. Use @Value to read jwt.secret from application.properties
	@Value("${jwt.secret}")
	private String secret;

	// 2. Use @Value to read the expiration time
	@Value("${jwt.expiration}")
	private long expirationTime;

	private Key key;

	// 3. @PostConstruct ensures this method runs after @Value values are successfully injected
	@PostConstruct
	public void init() {
		// Convert the read secret string into a Key object required for the JWT algorithm
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}

	/**
	 * Generate a new JWT token for the user.
	 */
	public String generateToken(String username, String role) {
		
		return Jwts.builder().setSubject(username) // Put the user's account into the Token content
				.claim("role", role).setIssuedAt(new Date(System.currentTimeMillis())) // Issued at time
				.setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // Expiration time
				.signWith(key, SignatureAlgorithm.HS256) // Sign with our key and digital signature
				.compact();
	}

	/**
	 * Validate the token (checks signature and expiration).
	 */
	public boolean validateToken(String token) {
		try {
			// If no Exception is thrown, it means the token was issued by us and hasn't expired
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			// Token has been tampered with or has expired
			return false;
		}
	}

	/**
	 * Extract the username and role from the token.
	 */
	// 1. Unified parsing method
	private Claims extractAllClaims(String token) {
	    return Jwts.parserBuilder()
	            .setSigningKey(key)
	            .build()
	            .parseClaimsJws(token)
	            .getBody();
	}

	// 2. Extract Username
	public String extractUsername(String token) {
	    return extractAllClaims(token).getSubject();
	}

	// 3. Extract Role
	public String extractRole(String token) {
	    return extractAllClaims(token).get("role", String.class);
	}
}
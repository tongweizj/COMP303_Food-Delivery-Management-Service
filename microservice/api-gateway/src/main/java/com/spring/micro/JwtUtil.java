package com.spring.micro;

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

	// 3. @PostConstruct ensures that this method will only execute after @Value has successfully injected the value
	@PostConstruct
	public void init() {
		// Convert the read string secret key into the Key object needed for the JWT algorithm
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}

	/**
	 * Generate a new JWT token for the user.
	 */
	public String generateToken(String username, String role) {
		return Jwts.builder().setSubject(username) // Put the user's account into the Token content
				.claim("role", role)
				.setIssuedAt(new Date(System.currentTimeMillis())) // Issue time
				.setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // Expiration time
				.signWith(key, SignatureAlgorithm.HS256) // Use our secret key plus a digital signature
				.compact();
	}

	/**
	 * Validate the token (checks signature and expiration).
	 */
	public boolean validateToken(String token) {
		try {
			// If this line does not throw an Exception, it means that this Token was issued by us and has not expired yet
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			// Token has been tampered with or has expired
			return false;
		}
	}

	/**
	 * Extract the username from the token.
	 */
	public String extractUsername(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}
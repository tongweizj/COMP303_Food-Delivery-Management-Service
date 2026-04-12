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

	// 1. 使用 @Value 讀取 application.properties 裡的 jwt.secret
	@Value("${jwt.secret}")
	private String secret;

	// 2. 使用 @Value 讀取過期時間
	@Value("${jwt.expiration}")
	private long expirationTime;

	private Key key;

	// 3. @PostConstruct 確保這個方法會在 @Value 成功注入值之後才執行
	@PostConstruct
	public void init() {
		// 在這裡把讀取到的字串密鑰，轉換成 JWT 演算法需要的 Key 物件
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}

	/**
	 * Generate a new JWT token for the user.
	 */
	public String generateToken(String username, String role) {
		return Jwts.builder().setSubject(username) // 把使用者的帳號放進 Token 的內容裡
				.claim("role", role).setIssuedAt(new Date(System.currentTimeMillis())) // 發放時間
				.setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // 過期時間
				.signWith(key, SignatureAlgorithm.HS256) // 使用我們的密鑰加上數位簽章
				.compact();
	}

	/**
	 * Validate the token (checks signature and expiration).
	 */
	public boolean validateToken(String token) {
		try {
			// 如果這行沒有拋出 Exception，就代表這張 Token 是我們發的，而且還沒過期
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			// Token 被竄改、或是已經過期了
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
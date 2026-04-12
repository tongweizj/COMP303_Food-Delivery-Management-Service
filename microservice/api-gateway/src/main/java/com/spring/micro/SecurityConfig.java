package com.spring.micro;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				// 1. Enable CORS (Customizer.withDefaults() will automatically apply your global CorsConfig)
				.cors(Customizer.withDefaults())

				// 2. Disable CSRF protection (usually disabled when developing REST APIs)
				.csrf(csrf -> csrf.disable())

				// 3. Set API authorization rules
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/login").permitAll() // Open login API for everyone to access
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow all frontend cross-domain OPTIONS pre-check requests
						.anyRequest().authenticated() // All other requests need to carry valid credentials (Token)
				)

				// 4. Close the default HTTP Basic authentication pop-up window (because we are preparing to use JWT)
				.httpBasic(basic -> basic.disable());

		return http.build();
	}
}

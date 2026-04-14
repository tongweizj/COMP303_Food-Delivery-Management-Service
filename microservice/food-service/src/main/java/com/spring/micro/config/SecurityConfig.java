package com.spring.micro.config;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;



@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
	@Value("${jwt.secret}")
    private String jwtSecret;
	// 1. Note that the return type and parameters are all changed to the WebFlux-specific Web versions!
	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
		http
				// 2. Disable CSRF
				.csrf(csrf -> csrf.disable())

				// 3. WebFlux uses authorizeExchange instead of authorizeHttpRequests
				.authorizeExchange(
						exchanges -> exchanges
						// preflight
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()

                        // auth public
                        .pathMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                         // users protected
                        .pathMatchers("/api/users/**").authenticated()
                                                
                        // restaurants write protected
                        .pathMatchers(HttpMethod.GET, "/api/restaurants/**").permitAll()
                        .pathMatchers(HttpMethod.POST, "/api/restaurants/**").authenticated()
                        .pathMatchers(HttpMethod.PUT, "/api/restaurants/**").authenticated()
                        .pathMatchers(HttpMethod.DELETE, "/api/restaurants/**").authenticated()

                        // menuitems write protected
                        .pathMatchers(HttpMethod.GET, "/api/menuitems/**").permitAll()
                        .pathMatchers(HttpMethod.POST, "/api/menuitems/**").authenticated()
                        .pathMatchers(HttpMethod.PUT, "/api/menuitems/**").authenticated()
                        .pathMatchers(HttpMethod.DELETE, "/api/menuitems/**").authenticated()

                        // orders all protected
                        .pathMatchers("/api/orders/**").authenticated()

                        .anyExchange().permitAll()
				)
				.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtDecoder(jwtDecoder())))
				// 4. Disable default login and Basic authentication
				.httpBasic(basic -> basic.disable())
				.formLogin(form -> form.disable());

		return http.build();
	}
	  @Bean
	    public ReactiveJwtDecoder jwtDecoder() {
	        SecretKey key = new SecretKeySpec(
	                jwtSecret.getBytes(StandardCharsets.UTF_8),
	                "HmacSHA256"
	        );
	        return NimbusReactiveJwtDecoder.withSecretKey(key).build();
	    }
	  

	// Add this Bean so Spring can manage the password encoder for us
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
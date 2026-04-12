package com.spring.micro;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

	// 1. 注意這裡回傳的型態與參數，全部換成 WebFlux 專用的 Web 版本！
	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
		http
				// 2. 關閉 CSRF
				.csrf(csrf -> csrf.disable())

				// 3. WebFlux 是用 authorizeExchange 而不是 authorizeHttpRequests
				.authorizeExchange(exchanges -> exchanges.pathMatchers("/api/auth/login").permitAll() // 開放登入 API
						.pathMatchers(HttpMethod.OPTIONS).permitAll() // 開放跨域預檢
						.anyExchange().permitAll()
//						.anyExchange().authenticated() // 其他都要驗證,因为这一条把所有的其他业务url全部蓝调了，暂时改为上面那条，
				)

				// 4. 關閉預設的登入與 Basic 驗證
				.httpBasic(basic -> basic.disable()).formLogin(form -> form.disable());

		return http.build();
	}
}
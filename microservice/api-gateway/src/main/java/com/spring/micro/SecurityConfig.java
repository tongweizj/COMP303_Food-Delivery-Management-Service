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
				// 1. 啟用 CORS (Customizer.withDefaults() 會自動套用你寫的全域 CorsConfig)
				.cors(Customizer.withDefaults())

				// 2. 關閉 CSRF 防護 (開發 REST API 時通常會關閉)
				.csrf(csrf -> csrf.disable())

				// 3. 設定 API 的授權規則
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/auth/login").permitAll() // 開放登入 API 讓所有人存取
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // 放行所有前端跨域的 OPTIONS 預檢請求
						.anyRequest().authenticated() // 其他所有請求都需要帶上有效憑證 (Token)
				)

				// 4. 關閉預設的 HTTP Basic 認證彈跳視窗 (因為我們準備使用 JWT)
				.httpBasic(basic -> basic.disable());

		return http.build();
	}
}

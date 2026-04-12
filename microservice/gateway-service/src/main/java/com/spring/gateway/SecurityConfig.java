package com.spring.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                // REST API 开发阶段通常先关掉 CSRF，避免 POST/PUT/DELETE 直接 403
                .csrf(ServerHttpSecurity.CsrfSpec::disable)

                .authorizeExchange(exchanges -> exchanges
                        // 餐厅查询公开
                        .pathMatchers(HttpMethod.GET, "/api/restaurants/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/restaurant/**").permitAll()

                        // 餐厅写操作需要登录
                        .pathMatchers(HttpMethod.POST, "/api/restaurants/**").authenticated()
                        .pathMatchers(HttpMethod.PUT, "/api/restaurant/**").authenticated()
                        .pathMatchers(HttpMethod.DELETE, "/api/restaurant/**").authenticated()

                        // 例如登录接口公开
                        .pathMatchers("/api/auth/**").permitAll()

                        // 其他请求先按你的需要决定
                        .anyExchange().permitAll()
                )

                // 先用 Basic Auth 测试最简单
                .httpBasic(basic -> {})

                // 先关掉默认表单登录页
                .formLogin(form -> form.disable())

                .build();
    }
}

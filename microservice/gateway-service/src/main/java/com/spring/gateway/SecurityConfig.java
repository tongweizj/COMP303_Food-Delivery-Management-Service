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
                		// preflight
                        .pathMatchers(HttpMethod.OPTIONS).permitAll()

                        // auth public
                        .pathMatchers(HttpMethod.POST, "/api/auth/**").permitAll()

                        // public read
                        .pathMatchers(HttpMethod.GET, "/api/restaurants/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/menuitems/**").permitAll()

                        // users protected
                        .pathMatchers("/api/users/**").authenticated()

                        // restaurants write protected
                        .pathMatchers(HttpMethod.POST, "/api/restaurants/**").authenticated()
                        .pathMatchers(HttpMethod.PUT, "/api/restaurants/**").authenticated()
                        .pathMatchers(HttpMethod.DELETE, "/api/restaurants/**").authenticated()

                        // menuitems write protected
                        .pathMatchers(HttpMethod.POST, "/api/menuitems/**").authenticated()
                        .pathMatchers(HttpMethod.PUT, "/api/menuitems/**").authenticated()
                        .pathMatchers(HttpMethod.DELETE, "/api/menuitems/**").authenticated()

                        // orders all protected
                        .pathMatchers("/api/orders/**").authenticated()

                        .anyExchange().permitAll()
                )

                // 先用 Basic Auth 测试最简单
                .httpBasic(basic -> {})

                // 先关掉默认表单登录页
                .formLogin(form -> form.disable())

                .build();
    }
}

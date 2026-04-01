package com.spring.micro;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;
import org.springframework.web.client.RestClientException;

@EnableDiscoveryClient
@SpringBootApplication
public class FoodServiceApplication {

    public static void main(String[] args) {
        // 这一行就会启动整个 Web 服务器并保持运行
        SpringApplication.run(FoodServiceApplication.class, args);
        
        System.out.println("Food Service 已启动，请访问 http://localhost:8081/");
    }
}

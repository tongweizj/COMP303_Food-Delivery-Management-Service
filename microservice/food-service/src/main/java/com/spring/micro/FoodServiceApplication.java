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
        // This line will start the entire web server and keep it running
        SpringApplication.run(FoodServiceApplication.class, args);
        
        System.out.println("Food Service started, please visit http://localhost:8081/");
    }
}

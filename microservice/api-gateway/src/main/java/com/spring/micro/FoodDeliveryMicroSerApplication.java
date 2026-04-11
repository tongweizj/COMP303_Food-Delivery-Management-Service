package com.spring.micro;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClientException;

@EnableDiscoveryClient
@SpringBootApplication
public class FoodDeliveryMicroSerApplication {

	public static void main(String[] args) throws RestClientException, IOException {
		SpringApplication.run(FoodDeliveryMicroSerApplication.class, args);
		System.out.print("API-Gateway is running");
	}

}

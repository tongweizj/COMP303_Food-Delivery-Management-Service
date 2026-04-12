package com.spring.micro;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class EmployeeServiceController {

	@GetMapping("/employee") // 2. Map request path
	public String getEmployee() {
		String baseUrl = "http://localhost:8084/real-data-source"; // Note: Cannot call itself, causing an infinite loop
		RestTemplate restTemplate = new RestTemplate();

		try {
			ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.GET, getHeaders(),
					String.class);
			return response.getBody();
		} catch (Exception ex) {
			return "Error: " + ex.getMessage(); // 3. Return safely when an error occurs
		}
	}

	private HttpEntity<?> getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
		return new HttpEntity<>(headers);
	}
}

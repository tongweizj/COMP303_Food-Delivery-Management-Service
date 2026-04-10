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

	@GetMapping("/employee") // 2. 映射请求路径
	public String getEmployee() {
		String baseUrl = "http://localhost:8084/real-data-source"; // 注意：不能自己调自己导致死循环
		RestTemplate restTemplate = new RestTemplate();

		try {
			ResponseEntity<String> response = restTemplate.exchange(baseUrl, HttpMethod.GET, getHeaders(),
					String.class);
			return response.getBody();
		} catch (Exception ex) {
			return "Error: " + ex.getMessage(); // 3. 发生错误时安全返回
		}
	}

	private HttpEntity<?> getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
		return new HttpEntity<>(headers);
	}
}

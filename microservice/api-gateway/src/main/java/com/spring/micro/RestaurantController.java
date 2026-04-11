package com.spring.micro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:5173")
public class RestaurantController {

	@Autowired
	private RestTemplate restTemplate;

	private final String MICROSERVICE_URL = "http://food-service/api/restaurants";

	@GetMapping
	public ResponseEntity<?> getAllRestaurants() {
		try {
			ResponseEntity<String> response = restTemplate.getForEntity(MICROSERVICE_URL, String.class);
			return ResponseEntity.ok(response.getBody());
		} catch (Exception ex) {
			return ResponseEntity.status(500).body("Error: " + ex.getMessage());
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getRestaurantById(@PathVariable String id) {
		try {
			ResponseEntity<String> response = restTemplate.getForEntity(MICROSERVICE_URL + "/" + id, String.class);
			return ResponseEntity.ok(response.getBody());
		} catch (Exception ex) {
			return ResponseEntity.status(500).body("Error: " + ex.getMessage());
		}
	}

	@PostMapping
	public ResponseEntity<?> createRestaurant(@RequestBody Object restaurantData) {
		try {
			System.out.printf("Restaurant Data: " + restaurantData);
			ResponseEntity<String> response = restTemplate.postForEntity(MICROSERVICE_URL, restaurantData,
					String.class);

			return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
		} catch (Exception ex) {
			return ResponseEntity.status(500).body("Error: " + ex.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateRestaurant(@PathVariable String id, @RequestBody Object restaurantData) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<>(restaurantData, headers);

			ResponseEntity<String> response = restTemplate.exchange(MICROSERVICE_URL + "/" + id, HttpMethod.PUT,
					requestEntity, String.class);

			return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
		} catch (Exception ex) {
			return ResponseEntity.status(500).body("Error: " + ex.getMessage());
		}
	}
}

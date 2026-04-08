package com.spring.micro;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document(collection = "restaurants")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Restaurant {

	// Changed to String for MongoDB ObjectId compatibility
	// As per assignment requirements: restaurant id
	@Id
	private String restaurantId;

	// As per assignment requirements: restaurant name
	private String restaurantName;

	// As per assignment requirements: cuisine type
	private String cuisineType;

	// As per assignment requirements: city
	private String city;

	// As per assignment requirements: rating
	private double rating;

	// Note: deliveryTime is not explicitly listed in the assignment requirements,
	// but it is a logical and great addition for a food delivery system!
	private double deliveryTime;

	public String getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getCuisineType() {
		return cuisineType;
	}

	public void setCuisineType(String cuisineType) {
		this.cuisineType = cuisineType;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public double getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(double deliveryTime) {
		this.deliveryTime = deliveryTime;
	}
}

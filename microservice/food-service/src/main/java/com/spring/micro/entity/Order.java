package com.spring.micro.entity;

/* Author: Wei Tong 301034450
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




@Document(collection = "orders")
public class Order {
	// In MongoDB, it is highly recommended to use String for the auto-generated
	// ObjectId
	@Id
	private String orderId;

	// As per assignment requirements: user id
	private String userId;

	// As per assignment requirements: restaurant id
	private String restaurantId;

	// As per assignment requirements: list of food items (ids or embedded items)
	// This example stores a list of food item IDs.
	// If you want to track quantities, consider creating an Embedded Object, such
	// as List<OrderItem>,
	// but keeping it as a simple List<String> also meets the basic assignment
	// requirements.
//	private List<String> foodItemIds;
	private List<OrderItem> items;

	// As per assignment requirements: total amount
	private Double totalAmount;

	// For status, please use: Placed, Preparing, Delivered, Cancelled
	private String orderStatus;

	// As per assignment requirements: order date
	private LocalDateTime orderDate = LocalDateTime.now();
	// Additional: Delivery address (essential for ordering)
    private String deliveryAddress;
    
    // Additional: User notes
    private String note;
	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	// Constructors (It is recommended to have at least a no-argument constructor)
	public Order() {
	}

	// --- Getters and Setters below ---
	
	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}


	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}
}

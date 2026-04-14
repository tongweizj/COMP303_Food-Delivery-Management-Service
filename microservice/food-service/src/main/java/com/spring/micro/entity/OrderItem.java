package com.spring.micro.entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
	    private String foodItemId;
	    private String foodName; // Redundant storage: prevent historical orders from changing if menu prices/names are modified
		private Integer quantity;
	    private Double unitPrice; // Redundant storage: snapshot unit price at the time of order
	    private String imageUrl; 
	    
	    public String getFoodItemId() {
			return foodItemId;
		}
		public void setFoodItemId(String foodItemId) {
			this.foodItemId = foodItemId;
		}
		public String getFoodName() {
			return foodName;
		}
		public void setFoodName(String foodName) {
			this.foodName = foodName;
		}
		public Integer getQuantity() {
			return quantity;
		}
		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}
		public Double getUnitPrice() {
			return unitPrice;
		}
		public void setUnitPrice(Double unitPrice) {
			this.unitPrice = unitPrice;
		}
		public String getImageUrl() {
			return imageUrl;
		}
		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}

}

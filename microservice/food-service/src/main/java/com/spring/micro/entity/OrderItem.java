package com.spring.micro.entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
	    private String foodItemId;
	    private String foodName; // 冗余存储：防止菜单价格/名字改了后，历史订单也跟着变
		private Integer quantity;
	    private Double unitPrice; // 冗余存储：下单时的快照单价
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

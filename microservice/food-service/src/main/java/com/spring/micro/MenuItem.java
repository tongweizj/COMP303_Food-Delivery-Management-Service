package com.spring.micro;

/* Author: Wei Tong
 * COMP 303 - Enterprise App Development
 * Assign 3
 */

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "menuItems") // Recommended to explicitly specify the collection name
public class MenuItem {

    @Id
    private String menuItemId;    // Recommended to use wrapper class Long
    
    private String itemName;
    
    private String category;
    
    private double price;       // double can be used for simple assignments, BigDecimal is recommended for professional projects
    
    private boolean availability;
    
    private String restId;        // Maintain consistency

	public String getMenuItemId() {
		return menuItemId;
	}

	public void setMenuItemId(String menuItemId) {
		this.menuItemId = menuItemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isAvailability() {
		return availability;
	}

	public void setAvailability(boolean availability) {
		this.availability = availability;
	}

	public String getRestId() {
		return restId;
	}

	public void setRestId(String restId) {
		this.restId = restId;
	}

    
}
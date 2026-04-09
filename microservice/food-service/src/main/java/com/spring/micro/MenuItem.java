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
@Document(collection = "menuItems") // 建议显式指定集合名
public class MenuItem {

    @Id
    private long menuItemId;    // 建议使用包装类 Long
    
    private String itemName;
    
    private String category;
    
    private double price;       // 简单作业可用 double，专业项目建议 BigDecimal
    
    private boolean availability;
    
    private long restId;        // 保持一致性

	public long getMenuItemId() {
		return menuItemId;
	}

	public void setMenuItemId(Long menuItemId) {
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

	public Long getRestId() {
		return restId;
	}

	public void setRestId(Long restId) {
		this.restId = restId;
	}

    
}
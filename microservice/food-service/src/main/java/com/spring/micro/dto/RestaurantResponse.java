package com.spring.micro.dto;

import java.util.List;

import com.spring.micro.entity.MenuItem;
import com.spring.micro.entity.Restaurant;

public class RestaurantResponse {

    private Restaurant restaurant;
    private List<MenuItem> menuItems;

    public RestaurantResponse() {
    }

    public RestaurantResponse(Restaurant restaurant, List<MenuItem> menuItems) {
        this.restaurant = restaurant;
        this.menuItems = menuItems;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }
}

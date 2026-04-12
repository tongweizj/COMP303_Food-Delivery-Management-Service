package com.spring.micro;

import java.util.List;

public class RestaurantDetail {

    private Restaurant restaurant;
    private List<MenuItem> menuItems;

    public RestaurantDetail() {
    }

    public RestaurantDetail(Restaurant restaurant, List<MenuItem> menuItems) {
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

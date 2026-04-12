package com.spring.micro;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id; // 對應作業要求的 user id
    
    // 登入用欄位
    private String username; 
    private String password; 
    private String role; // 權限控管用，例如 ROLE_USER, ROLE_ADMIN
    
    // 作業要求的其他欄位 [cite: 54, 56, 57, 58]
    private String name;
    private String email;
    private String phoneNumber;
    private String address;

    // --- 以下為 Getters & Setters ---
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
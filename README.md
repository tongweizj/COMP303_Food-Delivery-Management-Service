# Food Delivery Management System (Microservices)

A full-stack enterprise application built with a **React** frontend and a **Java Spring Boot** microservices backend, utilizing **Spring Cloud** for service orchestration and **MongoDB** for persistent storage.

## 🏗 Architecture Overview

The system follows a modern microservices pattern:

- **Discovery Server (Eureka)**: Acts as the service registry where all microservices register themselves.
- **API Gateway**: The single entry point for the frontend, handling routing and load balancing.
- **Food Service**: A RESTful microservice managing menu items and restaurant data.
- **Database**: MongoDB (NoSQL) for flexible data modeling of food items.

---

## 🛠 Tech Stack

### Backend

- **Java 17+**
- **Spring Boot 3.x / 4.x**
- **Spring Cloud Netflix Eureka** (Service Discovery)
- **Spring Cloud Gateway** (API Routing)
- **Spring Data MongoDB** (Data Persistence)
- **Maven** (Dependency Management)

### Frontend

- **React.js**
- **Axios** (HTTP Client for API calls)
- **CSS Modules**

---

## 🚀 Getting Started

### 1. Prerequisites

- **MongoDB**: Ensure MongoDB is running on `localhost:27017`.
- **JDK 17** or higher installed.
- **Node.js & npm** installed.

### 2. Backend Setup (Run in order)

1.  **Eureka Server**:

`microservice/eureka-server`

Access Dashboard: `http://localhost:8761`

2.  **Food Service**:

`microservice/food-service`

- API URL: `http://localhost:8081`
- [Postman help doc](./Postman.html)

3. **API Gateway**:
   Do not finish!

### 3. Frontend Setup

```bash
cd client
npm install
<<<<<<< HEAD
npm dev
=======
npm run dev
>>>>>>> d254c480de497cb2a8159b0e9476b7ae6c39c844
```

_Access Application: ` http://localhost:5173/`_

---

## 📁 Directory Structure

```text
.
├── client/                  # React Frontend Application
└── microservice/            # Java Microservices Root
    ├── eureka-server/       # Service Registry (Port: 8761)
    ├── api-gateway/         # Edge Service / Router (Port: 8080)
    └── food-service/        # Business Logic & MongoDB (Port: 8081)
```

---

## ⚠️ Troubleshooting & Notes

- **Eureka Self-Preservation**: In local development, you may see a red emergency warning in the Eureka dashboard. This is disabled via `eureka.server.enable-self-preservation=false` to allow immediate eviction of stopped instances during testing.
- **MongoDB Connection**: Ensure your `application.properties` points to the correct URI: `spring.data.mongodb.uri=mongodb://localhost:27017/food-service`.
- **Query Derivation**: Avoid naming repository methods `update()` directly as Spring Data tries to parse it as a property query. Use the built-in `save()` method for updates.

---

## 👤 Author

---

### Pro-Tip for your Assignment:

Since you are using **React**, make sure your `api-gateway` has **CORS** configured, otherwise, the browser will block your React app from talking to the gateway!
<<<<<<< HEAD

Would you like me to show you the Java code to enable CORS in your Gateway?
=======
>>>>>>> d254c480de497cb2a8159b0e9476b7ae6c39c844

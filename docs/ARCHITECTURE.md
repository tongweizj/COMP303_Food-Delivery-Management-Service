# Project Architecture Overview

This document outlines the high-level architecture of the Food Delivery Management Service. The project is designed using a microservices pattern, with a React frontend interacting with the backend services through an API Gateway.

## 1. Microservices Backend

The backend consists of several Spring Boot microservices, orchestrated using Spring Cloud components.

### 1.1. Eureka Service (`microservice/eureka-service`)
- **Role:** Acts as a discovery server for all other microservices. Services register themselves with Eureka, and clients can discover available services through it.
- **Technology:** Spring Cloud Netflix Eureka Server.

### 1.2. API Gateway (`microservice/api-gateway`)
- **Role:** Serves as the single entry point for all client requests. It routes requests to the appropriate backend microservices, and can handle cross-cutting concerns such as authentication, authorization, load balancing, and rate limiting.
- **Technology:** Spring Cloud Gateway.

### 1.3. Food Service (`microservice/food-service`)
- **Role:** The core business logic service. It manages all entities related to food delivery, including restaurants, menu items, customers, and orders. This service interacts directly with the database.
- **Technology:** Spring Boot, Spring Data JPA, RESTful APIs.

## 2. Frontend Application

The frontend is a single-page application (SPA) developed using React.

### 2.1. Client (`client/`)
- **Role:** Provides the user interface for customers and administrators to interact with the Food Delivery Management Service. It consumes RESTful APIs exposed by the API Gateway.
- **Technology:** React, Vite (build tool), React Router DOM (for client-side routing), Axios (for API requests), basic inline CSS for styling.

## 3. Communication Flow

1.  **Client to Backend:** All requests from the React frontend go to the API Gateway.
2.  **API Gateway to Microservices:** The API Gateway intelligently routes these requests to the appropriate microservice (e.g., Food Service).
3.  **Microservices to Database:** The Food Service interacts with the underlying database to store and retrieve data.
4.  **Service Discovery:** Microservices communicate with each other (if needed, though mainly through the API Gateway) by discovering each other via the Eureka Service.

## 4. Key Technologies Used

-   **Backend Framework:** Spring Boot
-   **Microservices Orchestration:** Spring Cloud (Eureka, Gateway)
-   **Frontend Library:** React
-   **Frontend Build Tool:** Vite
-   **Routing (Frontend):** React Router DOM
-   **API Client (Frontend):** Axios
-   **Database:** (To be determined from `application.properties`, but typically H2 for development, MySQL/PostgreSQL for production).
-   **Build Tool (Backend):** Maven
-   **Language:** Java (Backend), JavaScript/JSX (Frontend)

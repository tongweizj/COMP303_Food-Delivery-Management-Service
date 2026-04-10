# Gemini CLI Project Context: Food Delivery Management Service

This document provides context for the Gemini CLI agent regarding the `COMP303_Food-Delivery-Management-Service` project.

## Project Overview

This is a microservices-based food delivery management system. It consists of a React frontend application (`client/`) and a Spring Boot backend (`microservice/`) broken down into several services, orchestrated using Spring Cloud components.

## Technology Stack

### Backend
-   **Framework:** Spring Boot
-   **Microservices Orchestration:** Spring Cloud (Eureka for Service Discovery, Gateway for API Gateway)
-   **Language:** Java
-   **Build Tool:** Maven
-   **Persistence:**
    -   **Relational:** Spring Data JPA (for `Customer` entity)
    -   **NoSQL:** Spring Data MongoDB (for `Restaurant`, `MenuItem`, `Order` entities)

### Frontend
-   **Library:** React
-   **Build Tool:** Vite
-   **Routing:** React Router DOM
-   **API Client:** Axios
-   **Language:** JavaScript/JSX

## Key Microservices

-   **`microservice/eureka-service`**: Service Registry.
-   **`microservice/api-gateway`**: Centralized entry point, routes requests to other microservices.
-   **`microservice/food-service`**: Core business logic for managing restaurants, menu items, customers, and orders.

## Project Structure

-   **`/client`**: Contains the React frontend application.
-   **`/microservice`**: Contains all Spring Boot microservice projects.
    -   `/microservice/api-gateway`
    -   `/microservice/eureka-service`
    -   `/microservice/food-service`
-   **`/docs`**: Contains project documentation (`ARCHITECTURE.md`, `BACKEND_RULES.md`, `DB_SCHEMA.md`, `FRONTEND_RULES.md`).

## How to Run the Project (Development)

To run the full application, services should be started in a specific order:

1.  **Start Eureka Service:**
    -   Navigate to `microservice/eureka-service`.
    -   Run `./mvnw spring-boot:run` (Linux/macOS) or `mvnw spring-boot:run` (Windows).
2.  **Start Food Service:**
    -   Navigate to `microservice/food-service`.
    -   Run `./mvnw spring-boot:run` (Linux/macOS) or `mvnw spring-boot:run` (Windows).
3.  **Start API Gateway:**
    -   Navigate to `microservice/api-gateway`.
    -   Run `./mvnw spring-boot:run` (Linux/macOS) or `mvnw spring-boot:run` (Windows).
4.  **Start React Frontend:**
    -   Navigate to `client`.
    -   Install dependencies: `npm install`.
    -   Start the development server: `npm run dev`.

## Common Tasks for Gemini

-   **Feature Implementation:** Adding new functionalities to either frontend or backend.
-   **Bug Fixing:** Debugging and resolving issues.
-   **Code Refactoring:** Improving code structure and maintainability.
-   **Documentation:** Updating or creating new documentation (as done for the `/docs` folder).
-   **Testing:** Writing or fixing unit/integration tests.
-   **Configuration:** Adjusting configurations (e.g., database, API routes).

## Important Notes for Gemini

-   **Polyglot Persistence:** Be aware of the mixed persistence model (JPA for `Customer`, MongoDB for `Restaurant`, `MenuItem`, `Order`).
-   **Microservice Boundaries:** Respect the separation of concerns between microservices.
-   **API Gateway as Entry Point:** All frontend-to-backend communication goes through the API Gateway.
-   **Authentication:** Backend API endpoints (especially admin) require authentication (JWT tokens). The frontend components have placeholders for token handling.
-   **Language:** When interacting with the user, respond in Traditional Chinese as specified in the global context.

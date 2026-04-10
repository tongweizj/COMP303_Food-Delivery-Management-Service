# Backend Development Guidelines (Spring Boot Microservices)

This document outlines best practices and rules for developing the backend microservices using Spring Boot.

## 1. General Principles

-   **RESTful Design:** Adhere to RESTful principles for API design (statelessness, resource-based URLs, standard HTTP methods).
-   **Separation of Concerns:** Clearly separate layers:
    -   **Controller Layer (`@RestController`):** Handles HTTP requests, delegates to service layer. Focus on request/response mapping and validation.
    -   **Service Layer (`@Service`):** Contains business logic, orchestrates data access and domain operations.
    -   **Repository Layer (`@Repository`):** Handles data persistence and retrieval (Spring Data JPA).
    -   **Domain Layer (Entities):** Plain Java objects (`@Entity`) representing business entities.
-   **Loose Coupling:** Design services to be independent and communicate via well-defined APIs.
-   **Error Handling:** Implement consistent error handling mechanisms across all APIs (e.g., using `@ControllerAdvice` and custom exception classes to return meaningful HTTP status codes and error messages).

## 2. API Design

-   **URL Naming:** Use plural nouns for resources (e.g., `/api/restaurants`, `/api/orders`).
-   **HTTP Methods:** Use appropriate HTTP methods:
    -   `GET`: Retrieve resources.
    -   `POST`: Create new resources.
    -   `PUT`: Update existing resources (full replacement).
    -   `PATCH`: Partially update existing resources.
    -   `DELETE`: Remove resources.
-   **Versioning:** Consider API versioning (e.g., `/api/v1/restaurants`) for future compatibility.
-   **Status Codes:** Return appropriate HTTP status codes (e.g., 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).
-   **Request/Response Formats:** Use JSON as the primary data exchange format.

## 3. Data Persistence (Spring Data JPA)

-   **Entities:**
    -   Annotate domain objects with `@Entity`, `@Id`, `@GeneratedValue` as needed.
    -   Define relationships (`@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@OneToOne`) carefully, considering lazy/eager loading and cascading.
-   **Repositories:**
    -   Extend `JpaRepository<T, ID>` for basic CRUD operations.
    -   Define custom query methods following Spring Data JPA conventions (e.g., `findByEmail`, `findByNameContaining`).
    -   For complex queries, use `@Query` annotation with JPQL or native SQL.
-   **Transactions:** Use `@Transactional` annotation on service methods that perform database write operations to ensure atomicity.

## 4. Security (Authentication & Authorization)

-   **Authentication:**
    -   Implement user authentication (e.g., JWT-based authentication for stateless microservices).
    -   Login endpoint should return an access token upon successful authentication.
-   **Authorization:**
    -   Use Spring Security (`@PreAuthorize`, `@PostAuthorize`) to enforce role-based access control (RBAC) on controller or service methods.
    -   Ensure sensitive endpoints (especially admin APIs) are properly secured.
-   **Token Handling:** Securely handle and validate JWTs or other authentication tokens in API Gateway and individual microservices.

## 5. Microservices Communication

-   **Service Discovery:** Services register with Eureka. Use `@EnableEurekaClient` on client services.
-   **API Gateway:** All external requests go through the API Gateway for routing, security, and potentially load balancing.
-   **Inter-service Communication:** For direct communication between microservices (if necessary, beyond API Gateway), use REST calls with Feign Client or WebClient, or asynchronous messaging with Kafka/RabbitMQ. (Currently, communication primarily goes through API Gateway).

## 6. Configuration

-   Use `application.properties` or `application.yml` for service-specific configurations (port, database, Eureka server URL, etc.).
-   Externalize sensitive configurations where possible (e.g., environment variables).

## 7. Testing

-   **Unit Tests:** Write unit tests for individual components (services, repositories) using JUnit and Mockito.
-   **Integration Tests:** Write integration tests for controllers and service layers to ensure they work together correctly, possibly using Spring Boot Test.

## 8. Code Style and Quality

-   Adhere to a consistent Java coding style (e.g., Google Java Format, Oracle Java Code Conventions).
-   Use meaningful names for variables, methods, and classes.
-   Add Javadoc comments for complex methods and classes.
-   Perform code reviews.

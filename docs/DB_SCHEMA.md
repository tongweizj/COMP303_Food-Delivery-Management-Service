# Database Schema Overview

This document outlines the database schema for the Food Delivery Management Service. The project uses a **mixed persistence strategy**, with some entities stored in a relational database (implied by `@Entity`) and others in a NoSQL database (MongoDB, implied by `@Document`).

## 1. Relational Database Schema (Spring Data JPA)

**Entity:** `Customer`

Represents a user who places orders.

| Field Name    | Data Type     | Constraints           | Description              |
| :------------ | :------------ | :-------------------- | :----------------------- |
| `id`          | `BIGINT`      | Primary Key           | Unique identifier for the customer |
| `name`        | `VARCHAR(255)`|                       | Customer's full name     |
| `email`       | `VARCHAR(255)`| Unique, Not Null      | Customer's email address |
| `phoneNumber` | `VARCHAR(255)`|                       | Customer's phone number  |
| `address`     | `VARCHAR(255)`|                       | Customer's delivery address |

## 2. NoSQL Database Schema (MongoDB)

**Document:** `Restaurant` (Collection: `restaurants`)

Represents a food provider.

| Field Name     | Data Type     | Constraints           | Description              |
| :------------- | :------------ | :-------------------- | :----------------------- |
| `_id`          | `ObjectId`    | Primary Key           | Unique identifier for the restaurant (mapped from `restaurantId` String in Java) |
| `restaurantId` | `String`      |                       | Unique identifier for the restaurant (used in Java code) |
| `restaurantName`| `String`      |                       | Name of the restaurant   |
| `cuisineType`  | `String`      |                       | Type of cuisine (e.g., Italian, Indian) |
| `city`         | `String`      |                       | City where the restaurant is located |
| `rating`       | `Double`      |                       | Average customer rating  |
| `deliveryTime` | `Double`      |                       | Estimated delivery time in minutes |

**Document:** `MenuItem` (Collection: `menuItems`)

Represents a food item offered by a restaurant.

| Field Name   | Data Type     | Constraints           | Description              |
| :----------- | :------------ | :-------------------- | :----------------------- |
| `_id`        | `ObjectId`    | Primary Key           | Unique identifier for the menu item (mapped from `menuItemId` Long in Java) |
| `menuItemId` | `Long`        |                       | Unique identifier for the menu item (used in Java code) |
| `itemName`   | `String`      |                       | Name of the menu item    |
| `category`   | `String`      |                       | Category of the item (e.g., Appetizer, Main Course) |
| `price`      | `Double`      |                       | Price of the item        |
| `availability`| `Boolean`     |                       | Whether the item is currently available |
| `restId`     | `Long`        | Foreign Key (to `Restaurant`) | ID of the restaurant that offers this item |

**Document:** `Order` (Collection: `orders`)

Represents a customer's order.

| Field Name     | Data Type        | Constraints           | Description              |
| :------------- | :--------------- | :-------------------- | :----------------------- |
| `_id`          | `ObjectId`       | Primary Key           | Unique identifier for the order (mapped from `orderId` String in Java) |
| `orderId`      | `String`         |                       | Unique identifier for the order (used in Java code) |
| `userId`       | `String`         | Foreign Key (to `Customer`) | ID of the customer who placed the order |
| `restaurantId` | `String`         | Foreign Key (to `Restaurant`) | ID of the restaurant the order is placed with |
| `foodItemIds`  | `List<String>`   |                       | List of IDs of food items in the order |
| `totalAmount`  | `Double`         |                       | Total amount of the order |
| `orderStatus`  | `String`         |                       | Current status of the order (e.g., "Placed", "Preparing", "Delivered", "Cancelled") |
| `orderDate`    | `LocalDateTime`  |                       | Date and time the order was placed |

## 3. Relationships & Considerations

-   **Customer to Order:** One `Customer` can place many `Order`s (`userId` in `Order` references `Customer.id`).
-   **Restaurant to MenuItem:** One `Restaurant` can offer many `MenuItem`s (`restId` in `MenuItem` references `Restaurant.restaurantId`).
-   **Restaurant to Order:** One `Restaurant` can receive many `Order`s (`restaurantId` in `Order` references `Restaurant.restaurantId`).
-   **Order to MenuItem:** An `Order` contains multiple `MenuItem`s (`foodItemIds` in `Order` references `MenuItem.menuItemId`). This is a simple list of IDs; for quantities or specific order item details, `foodItemIds` could be replaced by a list of embedded `OrderItem` objects.

**Note on Mixed Persistence:**
The current setup uses a relational database for `Customer` (due to `@Entity` annotation) and MongoDB for `Restaurant`, `MenuItem`, and `Order` (due to `@Document` annotation). This implies a polyglot persistence strategy. Ensure the Spring Boot application is configured to handle connections and operations for both database types.

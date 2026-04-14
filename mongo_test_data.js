// MongoDB Test Data Insertion Script for Food Delivery Management Service
// Target Database: food_delivery_db (Change if necessary)
db = db.getSiblingDB('food-service');

// Clear existing collections (Optional: uncomment to avoid duplicates on re-run)
db.restaurants.deleteMany({});
db.menuItems.deleteMany({});
db.orders.deleteMany({});

// Pre-defined IDs to maintain relationships across collections
const restId1 = ObjectId("65a1b2c3d4e5f60001000001");
const restId2 = ObjectId("65a1b2c3d4e5f60001000002");
const restId3 = ObjectId("65a1b2c3d4e5f60001000003");

const itemId1 = ObjectId("65a1b2c3d4e5f60002000001");
const itemId2 = ObjectId("65a1b2c3d4e5f60002000002");
const itemId3 = ObjectId("65a1b2c3d4e5f60002000003");
const itemId4 = ObjectId("65a1b2c3d4e5f60002000004");
const itemId5 = ObjectId("65a1b2c3d4e5f60002000005");

const userId1 = ObjectId("65a1b2c3d4e5f60003000001");
const userId2 = ObjectId("65a1b2c3d4e5f60003000002");

// 1. Insert Test Restaurants
db.restaurants.insertMany([
  {
    _id: restId1,
    restaurantName: "Burger Joint",
    coverImageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    cuisineType: "American",
    city: "Toronto",
    rating: 4.6,
    deliveryTime: 25.0
  },
  {
    _id: restId2,
    restaurantName: "Pizza Paradise",
    coverImageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    cuisineType: "Italian",
    city: "Toronto",
    rating: 4.2,
    deliveryTime: 35.0
  },
  {
    _id: restId3,
    restaurantName: "Green Bowl Salads",
    coverImageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    cuisineType: "Healthy",
    city: "Markham",
    rating: 4.9,
    deliveryTime: 20.0
  }
]);

// 2. Insert Test Menu Items
db.menuItems.insertMany([
  {
    _id: itemId1,
    itemName: "Classic Cheeseburger",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
    category: "Burgers",
    price: 14.99,
    availability: true,
    restId: restId1
  },
  {
    _id: itemId2,
    itemName: "French Fries",
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=60",
    category: "Sides",
    price: 4.99,
    availability: true,
    restId: restId1
  },
  {
    _id: itemId3,
    itemName: "Pepperoni Pizza",
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60",
    category: "Pizzas",
    price: 18.50,
    availability: true,
    restId: restId2
  },
  {
    _id: itemId4,
    itemName: "Garlic Bread",
    imageUrl: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=60",
    category: "Sides",
    price: 6.00,
    availability: false, // Out of stock example
    restId: restId2
  },
  {
    _id: itemId5,
    itemName: "Quinoa Chicken Salad",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
    category: "Salads",
    price: 15.00,
    availability: true,
    restId: restId3
  }
]);

// 3. Insert Test Orders (with Embedded OrderItems)
db.orders.insertMany([
  {
    userId: userId1,
    restaurantId: restId1,
    items: [
      {
        foodItemId: itemId1,
        foodName: "Classic Cheeseburger",
        quantity: 2,
        unitPrice: 14.99,
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"
      },
      {
        foodItemId: itemId2,
        foodName: "French Fries",
        quantity: 1,
        unitPrice: 4.99,
        imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=60"
      }
    ],
    totalAmount: 34.97, // (14.99 * 2) + 4.99
    orderStatus: "Delivered",
    orderDate: new Date("2024-05-12T18:30:00Z"), 
    deliveryAddress: "456 King St W, Toronto, ON",
    note: "Please leave at the front door.",
    _class: "com.spring.micro.entity.Order"
  },
  {
    userId: userId2,
    restaurantId: restId2,
    items: [
      {
        foodItemId: itemId3,
        foodName: "Pepperoni Pizza",
        quantity: 1,
        unitPrice: 18.50,
        imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60"
      }
    ],
    totalAmount: 18.50,
    orderStatus: "Preparing",
    orderDate: new Date(), 
    deliveryAddress: "789 Queen St E, Toronto, ON",
    note: "Extra cheese if possible.",
    _class: "com.spring.micro.entity.Order"
  },
  {
    userId: userId1,
    restaurantId: restId3,
    items: [
      {
        foodItemId: itemId5,
        foodName: "Quinoa Chicken Salad",
        quantity: 3,
        unitPrice: 15.00,
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60"
      }
    ],
    totalAmount: 45.00,
    orderStatus: "Pending",
    orderDate: new Date(),
    deliveryAddress: "456 King St W, Toronto, ON",
    note: "",
    _class: "com.spring.micro.entity.Order"
  }
]);

print("English test data inserted successfully!");

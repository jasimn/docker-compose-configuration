// Initialization script for MongoDB
db = db.getSiblingDB('mydatabase');

// Create a sample collection with some data
db.createCollection('users');

// Insert sample data
db.users.insertMany([
  {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    created_at: new Date()
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    created_at: new Date()
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 35,
    created_at: new Date()
  }
]);

// Create index on email field
db.users.createIndex({ email: 1 }, { unique: true });

// Create another collection for products
db.createCollection('products');

db.products.insertMany([
  {
    name: 'Laptop',
    price: 999.99,
    category: 'electronics',
    in_stock: true
  },
  {
    name: 'Book',
    price: 19.99,
    category: 'education',
    in_stock: true
  }
]);

print('MongoDB initialization completed! Database "mydatabase" created with sample data.');

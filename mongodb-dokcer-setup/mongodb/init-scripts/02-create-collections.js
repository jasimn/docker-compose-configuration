// Create collections and initial data
db = db.getSiblingDB('myapp');

// Create users collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'email', 'createdAt'],
      properties: {
        username: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        email: {
          bsonType: 'string',
          pattern: '^\\S+@\\S+\\.\\S+$',
          description: 'must be a valid email and is required'
        },
        createdAt: {
          bsonType: 'date',
          description: 'must be a date and is required'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  }
});

// Create products collection
db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'price', 'category'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        price: {
          bsonType: 'number',
          minimum: 0,
          description: 'must be a positive number and is required'
        },
        category: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        inStock: {
          bsonType: 'bool',
          description: 'must be a boolean'
        }
      }
    }
  }
});

// Insert sample data
db.users.insertMany([
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

db.products.insertMany([
  {
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true
  },
  {
    name: 'Desk Chair',
    price: 199.99,
    category: 'Furniture',
    inStock: true
  }
]);

print('Collections and sample data created successfully');

// Create indexes for better performance
db = db.getSiblingDB('myapp');

// Users collection indexes
db.users.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
db.users.createIndex({ username: 1 }, { unique: true, name: "username_unique" });
db.users.createIndex({ createdAt: -1 }, { name: "created_at_desc" });

// Products collection indexes
db.products.createIndex({ name: 1 }, { name: "product_name" });
db.products.createIndex({ category: 1, price: 1 }, { name: "category_price" });
db.products.createIndex({ inStock: 1 }, { name: "in_stock" });

// Text search indexes
db.products.createIndex(
  { name: "text", category: "text" },
  { name: "product_search", weights: { name: 3, category: 1 } }
);

print('Indexes created successfully');

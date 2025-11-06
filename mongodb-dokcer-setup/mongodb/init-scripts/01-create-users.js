// Initialize database and create application users
db = db.getSiblingDB('admin');

// Create application database user
db.getSiblingDB('myapp').createUser({
  user: 'appuser',
  pwd: 'AppUserPassword123!',
  roles: [
    {
      role: 'readWrite',
      db: 'myapp'
    },
    {
      role: 'read',
      db: 'admin'
    }
  ]
});

// Create backup user
db.getSiblingDB('admin').createUser({
  user: 'backupuser',
  pwd: 'BackupUserPassword123!',
  roles: [
    {
      role: 'backup',
      db: 'admin'
    },
    {
      role: 'readAnyDatabase',
      db: 'admin'
    }
  ]
});

print('Users created successfully');

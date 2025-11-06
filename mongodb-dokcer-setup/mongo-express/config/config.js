// Mongo Express configuration
const config = {
  mongodb: {
    // Connection URL
    connectionString: process.env.ME_CONFIG_MONGODB_SERVER 
      ? `mongodb://${process.env.ME_CONFIG_MONGODB_ADMINUSERNAME}:${process.env.ME_CONFIG_MONGODB_ADMINPASSWORD}@${process.env.ME_CONFIG_MONGODB_SERVER}:${process.env.ME_CONFIG_MONGODB_PORT}`
      : 'mongodb://admin:pass@localhost:27017',
    
    // Connection options
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    }
  },

  site: {
    baseUrl: process.env.ME_CONFIG_SITE_BASEURL || '/',
    cookieSecret: process.env.ME_CONFIG_SITE_COOKIESECRET || 'cookiesecret',
    sessionSecret: process.env.ME_CONFIG_SITE_SESSIONSECRET || 'sessionsecret',
    host: process.env.VIRTUAL_HOST || 'localhost',
    port: process.env.PORT || 8081,
  },

  // Basic authentication
  basicAuth: {
    username: process.env.ME_CONFIG_BASICAUTH_USERNAME || 'admin',
    password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || 'pass',
  },

  // Options
  options: {
    documentsPerPage: 10,
    editorTheme: 'rubyblue',
    readOnly: process.env.ME_CONFIG_OPTIONS_READONLY === 'true',
    collapsibleJSON: true,
    collapsibleJSONDefaultUnfold: 1,
    gridFSEnabled: false,
    noDelete: false,
  },

  // SSL configuration (optional)
  ssl: {
    enabled: false,
    key: '',
    cert: '',
  },

  // Logging
  log: {
    level: process.env.DEBUG ? 'debug' : 'info',
  }
};

// Export configuration
module.exports = config;

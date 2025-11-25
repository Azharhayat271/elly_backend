export const config = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mathDiscussionApp',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: '24h',
  bcryptRounds: 10,
  nodeEnv: process.env.NODE_ENV || 'development',
};

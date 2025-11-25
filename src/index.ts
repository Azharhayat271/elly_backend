import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config';
import { connectDatabase } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from React app in production
if (config.nodeEnv === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
} else {
  // Error handling for development
  app.use(notFoundHandler);
  app.use(errorHandler);
}

// Start server only if not in test environment
async function startServer() {
  await connectDatabase();
  
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}

export default app;

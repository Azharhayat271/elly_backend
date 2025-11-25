import { Response } from 'express';
import { authService } from '../services/auth.service';
import { AuthRequest } from '../types';

export class AuthController {
  async register(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      const result = await authService.register(username, password);
      res.status(201).json(result);
    } catch (error) {
      const err = error as Error;
      if (err.message === 'Username already exists') {
        res.status(409).json({ error: err.message });
      } else if (err.message.includes('must be at least')) {
        res.status(400).json({ error: err.message });
      } else {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async login(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
      }

      const result = await authService.login(username, password);
      res.json(result);
    } catch (error) {
      const err = error as Error;
      if (err.message === 'Invalid credentials') {
        res.status(401).json({ error: err.message });
      } else {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export const authController = new AuthController();

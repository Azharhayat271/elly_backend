import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../repositories/database.repository';
import { User, AuthResponse } from '../types';
import { config } from '../config';

export class AuthService {
  async register(username: string, password: string): Promise<AuthResponse> {
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

    const user: User = {
      id: '',
      username,
      passwordHash,
    };

    const savedUser = await db.createUser(user);

    const token = this.generateToken(savedUser._id.toString());
    return {
      token,
      user: {
        id: savedUser._id.toString(),
        username: savedUser.username,
      },
    };
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const user = await db.getUserByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user._id.toString());
    return {
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as jwt.SignOptions);
  }
}

export const authService = new AuthService();

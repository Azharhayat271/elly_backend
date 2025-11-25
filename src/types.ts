import { Request } from 'express';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export enum OperationType {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide'
}

export interface Calculation {
  id: string;
  userId: string;
  username: string;
  parentId: string | null;
  operation: OperationType | null;
  number: number;
  result: number;
  createdAt: Date;
  children: Calculation[];
}

export interface CreateCalculationRequest {
  parentId?: string;
  operation?: OperationType;
  number: number;
}

export interface AuthRequestBody {
  username: string;
  password: string;
}

export type AuthRequest = Request<{}, {}, AuthRequestBody>;

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

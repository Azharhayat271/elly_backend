import { UserModel, IUser } from '../models/user.model';
import { CalculationModel, ICalculation } from '../models/calculation.model';
import { User, Calculation } from '../types';

class Database {
  // User operations
  async createUser(user: User): Promise<IUser> {
    const newUser = new UserModel({
      username: user.username,
      passwordHash: user.passwordHash,
    });
    return await newUser.save();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await UserModel.findOne({ username });
  }

  // Calculation operations
  async createCalculation(calculation: Calculation): Promise<ICalculation> {
    const newCalc = new CalculationModel({
      userId: calculation.userId,
      username: calculation.username,
      parentId: calculation.parentId,
      operation: calculation.operation,
      number: calculation.number,
      result: calculation.result,
    });
    return await newCalc.save();
  }

  async getCalculationById(id: string): Promise<ICalculation | null> {
    return await CalculationModel.findById(id);
  }

  async getAllCalculations(): Promise<ICalculation[]> {
    return await CalculationModel.find().sort({ createdAt: 1 });
  }

  async getRootCalculations(): Promise<ICalculation[]> {
    return await CalculationModel.find({ parentId: null }).sort({ createdAt: 1 });
  }

  async getChildCalculations(parentId: string): Promise<ICalculation[]> {
    return await CalculationModel.find({ parentId }).sort({ createdAt: 1 });
  }
}

export const db = new Database();

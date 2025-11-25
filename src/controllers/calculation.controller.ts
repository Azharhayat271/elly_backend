import { Response } from 'express';
import { calculationService } from '../services/calculation.service';
import { db } from '../repositories/database.repository';
import { AuthRequest } from '../middlewares/auth.middleware';

export class CalculationController {
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const allCalculations = await calculationService.getAllCalculations();
      const tree = calculationService.buildCalculationTree(allCalculations);
      res.json(tree);
    } catch (error) {
      console.error('Error fetching calculations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const user = await db.getUserById(userId);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const calculation = await calculationService.createCalculation(
        user._id.toString(),
        user.username,
        req.body
      );

      res.status(201).json(calculation);
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('required') || err.message.includes('Invalid') || err.message.includes('Division by zero')) {
        res.status(400).json({ error: err.message });
      } else if (err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
      } else {
        console.error('Error creating calculation:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

export const calculationController = new CalculationController();

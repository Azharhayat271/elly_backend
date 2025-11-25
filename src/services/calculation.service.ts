import { db } from '../repositories/database.repository';
import { Calculation, OperationType, CreateCalculationRequest } from '../types';
import { calculateResult } from '../utils/calculator.util';

export class CalculationService {
  async getAllCalculations(): Promise<Calculation[]> {
    const calculations = await db.getAllCalculations();
    return calculations.map(calc => ({
      id: calc._id.toString(),
      userId: calc.userId,
      username: calc.username,
      parentId: calc.parentId,
      operation: calc.operation,
      number: calc.number,
      result: calc.result,
      createdAt: calc.createdAt,
      children: [],
    }));
  }

  buildCalculationTree(calculations: Calculation[]): Calculation[] {
    const calcMap = new Map<string, Calculation>();
    
    calculations.forEach(calc => {
      calcMap.set(calc.id, { ...calc, children: [] });
    });

    const roots: Calculation[] = [];
    calculations.forEach(calc => {
      const node = calcMap.get(calc.id)!;
      if (calc.parentId === null) {
        roots.push(node);
      } else {
        const parent = calcMap.get(calc.parentId);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    return roots;
  }

  async createCalculation(
    userId: string,
    username: string,
    data: CreateCalculationRequest
  ): Promise<Calculation> {
    const { parentId, operation, number } = data;

    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Valid number is required');
    }

    let result: number;
    let calcOperation: OperationType | null = null;

    if (parentId) {
      if (!operation) {
        throw new Error('Operation is required for responses');
      }

      if (!Object.values(OperationType).includes(operation)) {
        throw new Error('Invalid operation type');
      }

      const parent = await db.getCalculationById(parentId);
      if (!parent) {
        throw new Error('Parent calculation not found');
      }

      result = calculateResult(parent.result, operation, number);
      calcOperation = operation;
    } else {
      result = number;
    }

    const calculation: Calculation = {
      id: '',
      userId,
      username,
      parentId: parentId || null,
      operation: calcOperation,
      number,
      result,
      createdAt: new Date(),
      children: [],
    };

    const saved = await db.createCalculation(calculation);
    
    return {
      id: saved._id.toString(),
      userId: saved.userId,
      username: saved.username,
      parentId: saved.parentId,
      operation: saved.operation,
      number: saved.number,
      result: saved.result,
      createdAt: saved.createdAt,
      children: [],
    };
  }
}

export const calculationService = new CalculationService();

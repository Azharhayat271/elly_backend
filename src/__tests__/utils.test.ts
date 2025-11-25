import { calculateResult } from '../utils/calculator.util';
import { OperationType } from '../types';

describe('Utils', () => {
  describe('calculateResult', () => {
    it('should add numbers correctly', () => {
      const result = calculateResult(10, OperationType.ADD, 5);
      expect(result).toBe(15);
    });

    it('should subtract numbers correctly', () => {
      const result = calculateResult(10, OperationType.SUBTRACT, 5);
      expect(result).toBe(5);
    });

    it('should multiply numbers correctly', () => {
      const result = calculateResult(10, OperationType.MULTIPLY, 5);
      expect(result).toBe(50);
    });

    it('should divide numbers correctly', () => {
      const result = calculateResult(10, OperationType.DIVIDE, 5);
      expect(result).toBe(2);
    });

    it('should throw error on division by zero', () => {
      expect(() => {
        calculateResult(10, OperationType.DIVIDE, 0);
      }).toThrow('Division by zero is not allowed');
    });
  });
});

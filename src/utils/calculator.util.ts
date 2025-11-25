import { OperationType } from '../types';

export function calculateResult(
  previousResult: number,
  operation: OperationType,
  operand: number
): number {
  switch (operation) {
    case OperationType.ADD:
      return previousResult + operand;
    case OperationType.SUBTRACT:
      return previousResult - operand;
    case OperationType.MULTIPLY:
      return previousResult * operand;
    case OperationType.DIVIDE:
      if (operand === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return previousResult / operand;
    default:
      throw new Error('Invalid operation');
  }
}

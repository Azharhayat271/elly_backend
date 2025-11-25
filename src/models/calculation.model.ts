import mongoose, { Schema, Document } from 'mongoose';
import { OperationType } from '../types';

export interface ICalculation extends Document {
  userId: string;
  username: string;
  parentId: string | null;
  operation: OperationType | null;
  number: number;
  result: number;
  createdAt: Date;
}

const calculationSchema = new Schema<ICalculation>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    default: null,
    index: true,
  },
  operation: {
    type: String,
    enum: Object.values(OperationType),
    default: null,
  },
  number: {
    type: Number,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

calculationSchema.index({ parentId: 1, createdAt: 1 });

export const CalculationModel = mongoose.model<ICalculation>('Calculation', calculationSchema);

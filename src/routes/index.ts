import { Router } from 'express';
import authRoutes from './auth.routes';
import calculationRoutes from './calculation.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/calculations', calculationRoutes);

export default router;

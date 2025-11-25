import { Router } from 'express';
import { calculationController } from '../controllers/calculation.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', async (req, res) => await calculationController.getAll(req, res));
router.post('/', authenticateToken, async (req, res) => await calculationController.create(req, res));

export default router;

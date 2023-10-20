import express from 'express';
import { generateDailyReport, generateWeeklyReport, generateMonthlyReport, findTopSellingProducts} from '../controllers/order.js';

const router = express.Router();

router.post('/dailysales', generateDailyReport);
router.get('/weeklysales', generateWeeklyReport);
router.post('/monthlysales', generateMonthlyReport);
router.delete('/topselling', findTopSellingProducts);

export default router;
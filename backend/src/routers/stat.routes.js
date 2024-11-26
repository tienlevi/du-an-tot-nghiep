import { Router } from "express";
import { statsController } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticateMiddleware.js";
const router = Router();


// router.use(authenticate)
// @Get
router.get("/total", statsController.totalStats);
router.get("/daily", statsController.orderByDayStats);
router.get("/monthly", statsController.orderByMonthStats);
router.get('/yearly', statsController.orderByYearStats);
router.get('/dateRange', statsController.orderByDateRangeStats);
router.get('/productStats',statsController.getProductStats)
router.get('/topBuyers', statsController.getTop5Buyers);



export default router;

import { Router } from "express";
import { addCategory } from "src/controller/category_controller";

const router = Router();

router.post('/', addCategory)



export default router;
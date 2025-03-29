import { Router } from "express";
import { CategoryController } from "src/controller/category_controller";


const router = Router();

router.get('/', CategoryController.list)
router.get('/:id', CategoryController.get)
router.post('/', CategoryController.add)
router.patch('/:id', CategoryController.edit)
router.delete('/:id', CategoryController.remove)


export default router;
import { Router } from "express";
import { addCategory, editCategory, getCategory, listCategories, removeCategory } from "src/controller/category_controller";

const router = Router();

router.get('/', listCategories)
router.get('/:id', getCategory)
router.post('/', addCategory)
router.patch('/:id', editCategory)
router.delete('/:id', removeCategory)


export default router;
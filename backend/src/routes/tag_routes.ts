import { Router } from "express";
import { TagController } from "src/controller/tag_controller";

const router = Router();

router.get('/', TagController.list)
router.get('/:id', TagController.get)
router.post('/', TagController.add)
router.patch('/:id', TagController.edit)
router.delete('/:id', TagController.remove)


export default router;

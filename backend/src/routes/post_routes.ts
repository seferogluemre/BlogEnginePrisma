import { Router } from "express";
import { PostController } from "src/controller/post_controller";

const router = Router()

router.get('/', PostController.list)
router.get('/:id', PostController.get)
router.post('/', PostController.add)
router.patch('/:id', PostController.edit)
router.delete('/:id', PostController.remove)


export default router;
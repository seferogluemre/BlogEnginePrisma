import { Router } from "express";
import { CommentController } from "src/controller/comment_controller";

const router = Router()

router.get('/', CommentController.list)
router.get('/:id', CommentController.get)
router.post('/', CommentController.add)
router.patch('/:id', CommentController.edit)
router.delete('/:id', CommentController.remove)


export default router;
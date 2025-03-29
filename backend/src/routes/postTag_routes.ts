import { Router } from "express";
import { PostTagController } from "src/controller/postTag_controller";

const router = Router()

router.post('/:id/tags', PostTagController.add)
router.delete("/:postId/tags/:tagId", PostTagController.edit);

export default router;
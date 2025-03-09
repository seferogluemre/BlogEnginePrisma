import { Router } from "express";
import { addPostTag, removePostTag } from "src/controller/postTag_controller";

const router = Router()

router.post('/:id/tags', addPostTag)
router.delete("/:postId/tags/:tagId", removePostTag);


export default router;
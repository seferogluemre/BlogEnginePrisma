import { Router } from "express";
import { addPostTag, removePostTag } from "src/controller/postTag_controller";

const router = Router()

router.post('/', addPostTag)
router.delete("/:postId/tags/:tagId", removePostTag);


export default router;
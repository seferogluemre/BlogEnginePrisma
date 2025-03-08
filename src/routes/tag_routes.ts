import { Router } from "express";
import { addTag, editTag, getTag, listTags, removeTag } from "src/controller/tag_controller";

const router = Router();


router.get('/', listTags)
router.get('/:id', getTag)
router.post('/', addTag)
router.patch('/:id', editTag)
router.delete('/:id', removeTag)


export default router;

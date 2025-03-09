import { Router } from "express";
import { addPostTag } from "src/controller/postTag_controller";

const router = Router()

router.post('/', addPostTag)


export default router;
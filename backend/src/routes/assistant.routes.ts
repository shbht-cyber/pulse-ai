import { Router } from "express";

import { AssistantController } from "../controllers/assistant.controller";

const router = Router();

const controller = new AssistantController();

router.post("/chat", controller.chat);

export default router;

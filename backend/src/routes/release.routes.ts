import { Router } from "express";

import { ReleaseController } from "../controllers/release.controller";

const router = Router();

const controller = new ReleaseController();

router.get("/scenarios", controller.scenarios);
router.get("/history", controller.history);
router.get("/latest", controller.latest);
router.post("/analyze", controller.analyze);

export default router;

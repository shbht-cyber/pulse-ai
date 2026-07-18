import { Request, Response } from "express";

import { AssistantService } from "../services/assistant/assistant.service";
import { AssistantChatRequest } from "../types/release.types";
import { assistantChatSchema } from "../validators/release.validator";

const assistantService = new AssistantService();

export class AssistantController {
  async chat(req: Request, res: Response): Promise<void> {
    const parsed = assistantChatSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ message: "Invalid assistant request." });
      return;
    }

    const reply = await assistantService.chat(
      parsed.data as AssistantChatRequest,
    );

    res.json({ reply });
  }
}

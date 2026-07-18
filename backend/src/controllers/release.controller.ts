import { Request, Response } from "express";

import { ReleaseService } from "../services/release/release.service";
import { analyzeReleaseSchema } from "../validators/release.validator";

const releaseService = new ReleaseService();

export class ReleaseController {
  analyze = async (req: Request, res: Response): Promise<void> => {
    const parsed = analyzeReleaseSchema.safeParse(req.body ?? {});

    if (!parsed.success) {
      res.status(400).json({ message: "Invalid release analysis request." });
      return;
    }

    const result = await releaseService.analyzeRelease(parsed.data);

    res.json(result);
  };

  scenarios = (_req: Request, res: Response): void => {
    res.json(releaseService.getScenarios());
  };

  history = async (_req: Request, res: Response): Promise<void> => {
    res.json(await releaseService.getHistory());
  };

  latest = async (_req: Request, res: Response): Promise<void> => {
    res.json(await releaseService.getLatest());
  };
}

import { Request, Response } from "express";
import { StatusService } from "../../services/status/listStatus.service";

class StatusController {
  async handle(req: Request, res: Response) {
    const statusService = new StatusService();

    const status = await statusService.execute();
    res.status(200).json(status);
  }
}

export { StatusController };

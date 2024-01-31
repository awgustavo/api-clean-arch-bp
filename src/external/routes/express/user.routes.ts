import { Router, type Request, type Response } from "express";
import { type RestResponse } from "../../../adapters/controllers/ports/rest";
import { type UserController } from "../../../adapters/controllers/user.controller";
import { type GenericRoutes } from "../ports/routes";

export class UserRoutes implements GenericRoutes<Router> {
  constructor (private readonly userController: UserController) {

  }

  registerRoutes (): Router {
    const router = Router();
    router.post("/", async (request: Request, response: Response) => {
      const userResponse: RestResponse = await this.userController.create({ body: request.body });
      if (userResponse.error) return response.status(userResponse.statusCode).send(userResponse.error);

      response.json(userResponse.body);
    });
    router.get("/", async (request: Request, response: Response) => {
      const userResponse: RestResponse = await this.userController.findByFilter({ body: request.query });
      if (userResponse.error) return response.status(userResponse.statusCode).send(userResponse.error);

      response.json(userResponse.body);
    });
    return router;
  }
}

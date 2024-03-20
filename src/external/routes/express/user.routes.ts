import { Router, type Response } from "express";
import { type RestResponse } from "../../../adapters/controllers/ports/rest";
import { type UserController } from "../../../adapters/controllers/user.controller";
import { type GenericRoutes } from "../ports/routes";
import { RequestAuth } from ".";

export class UserRoutes implements GenericRoutes<Router> {
  constructor (private readonly userController: UserController) {

  }

  async create (request: RequestAuth, response: Response) {
    const userResponse: RestResponse = await this.userController.create({ body: request.body });
    if (userResponse.error) return response.status(userResponse.statusCode).send(userResponse.error);

    response.json(userResponse.body);
  }
  async findByFilter (request: RequestAuth, response: Response) {
    const userResponse: RestResponse = await this.userController.findByFilter({ body: request.query });
    if (userResponse.error) return response.status(userResponse.statusCode).send(userResponse.error);

    response.json(userResponse.body);
  }
  registerRoutes (): Router {
    const router = Router();
    router.post("/", this.create.bind(this));
    router.get("/", this.findByFilter.bind(this));
    return router;
  }
}

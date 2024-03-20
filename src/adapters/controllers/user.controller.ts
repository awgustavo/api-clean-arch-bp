import { type UserData } from "../../entities/user/user.data";
import { CustomInject, CustomInjectable } from "../../shared/dependency-injection/dependency-injection";
import { DependencyInjectionTypes } from "../../shared/dependency-injection/dependency-injection-types";
import { BaseController } from "../../shared/interfaces/base-controller";
import { CreateUserUseCase } from "../../use-cases/user/create-user.use-case";
import { FindByFilterUseCase } from "../../use-cases/user/find-by-filter.use-case";
import { type RestRequest, type RestResponse } from "./ports/rest";

@CustomInjectable()
export class UserController implements BaseController {
  constructor (
    @CustomInject(DependencyInjectionTypes.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @CustomInject(DependencyInjectionTypes.FindByFilterUseCase)
    private readonly findByFilterUseCase: FindByFilterUseCase
  ) { }

  async create (request: RestRequest): Promise<RestResponse> {
    try {
      const createdUser = await this.createUserUseCase.execute(request.body as UserData);
      return {
        body: createdUser,
        statusCode: 201
      };
    } catch (error) {
      return {
        statusCode: 500,
        error: error.message
      };
    }
  }

  async findByFilter (request: RestRequest): Promise<RestResponse> {
    try {
      const users = await this.findByFilterUseCase.execute(request.body as UserData);
      return {
        body: users,
        statusCode: 200
      };
    } catch (error) {
      return {
        statusCode: 500,
        error: error.message
      };
    }
  }
}

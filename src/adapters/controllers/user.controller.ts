import { type UserData } from '../../entities/user/user.data';
import { type CreateUser } from '../../use-cases/create-user/create-user';
import { type RestRequest, type RestResponse } from './ports/rest';

export class UserController {
  constructor (private readonly createUser: CreateUser) { }

  async create (request: RestRequest): Promise<RestResponse> {
    try {
      const createdUser = await this.createUser.createUser(request.body as UserData);
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
      const users = await this.createUser.findByFilter(request.body as UserData);
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

import { type RestResponse } from "../../../adapters/controllers/ports/rest";
import { type UserController } from "../../../adapters/controllers/user.controller";
import { type UserData } from "../../../entities/user/user.data";
import { GraphqlRoutes } from "../../../shared/interfaces/graphql-routes";
export class UserGraphQLRoutes implements GraphqlRoutes {
  constructor (private readonly userController: UserController) {

  }
  getTypeDefs(): string {
    return `#graphql
      type User {
        email: String
        name: String
      }
      
      input SaveUser {
        email: String
        name: String
      }
      
      type Query {
        user: [User]
      }
      
      type Mutation {
        create(user: SaveUser): User
      }
    `;
  }

  async create (parent, {user}): Promise<UserData | string> {
    const userResponse: RestResponse = await this.userController.create({ body: user });
    if (userResponse.error) return userResponse.error;

    return userResponse.body;
  }

  async getUser (_, body: UserData) {
    const userResponse: RestResponse = await this.userController.findByFilter({ body });
    if (userResponse.error) return userResponse.error;

    return userResponse.body;
  }

  getResolvers() {
    return {
      Query: {
        user: this.getUser.bind(this)
      },
      Mutation: {
        create: this.create.bind(this)
      }

    };
  }
}

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
  getResolvers() {
    return {
      Query: {
        user: async (_, body: UserData) => {
          const userResponse: RestResponse = await this.userController.findByFilter({ body });
          if (userResponse.error) return userResponse.error;

          return userResponse.body;
        }
      },
      Mutation: {
        create: async (parent, {user}): Promise<UserData | string> => {
          console.log("parent", parent);
          const userPayload  = user as UserData;
          console.log("user", userPayload.email + userPayload.name);
          const userResponse: RestResponse = await this.userController.create({ body: userPayload});
          if (userResponse.error) return userResponse.error;

          return userResponse.body;
        }
      }

    };
  }
}

import { CompressionType } from "@aws-sdk/client-s3";
import { type RestResponse } from "../../../adapters/controllers/ports/rest";
import { type UserController } from "../../../adapters/controllers/user.controller";
import { type UserData } from "../../../entities/user/user.data";
import { GraphqlRoutes } from "../../../shared/interfaces/graphql-routes";
import { type GenericRoutes } from "../ports/routes";


interface Resolver {
  typeDefs: string,
  resolvers: {
    Query?
    Mutations?
  }
}
export class AuthGraphQLRoutes implements GraphqlRoutes {
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
        authenticate: [User]
      }
      
      type Mutation {
        refreshToken(user: SaveUser): User
      }
    `;
  }
  getResolvers() {
    return {
      Query: {
        authenticate: async (_, body: UserData) => {
          const userResponse: RestResponse = await this.userController.findByFilter({ body });
          if (userResponse.error) return userResponse.error;

          return userResponse.body;
        }
      },
      Mutation: {
        refreshToken: async (parent, {user}): Promise<UserData | string> => {
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

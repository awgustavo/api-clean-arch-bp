import { type RestResponse } from '../../../adapters/controllers/ports/rest';
import { type UserController } from '../../../adapters/controllers/user.controller';
import { type UserData } from '../../../entities/user/user.data';
import { type GenericRoutes } from '../ports/routes';

const typeDefs = `#graphql
type User {
  email: String
  name: String
}

type Query {
  user: [User]
}

type Mutations {
  create(user: User): User
}
`;

interface Resolver {
  typeDefs: string,
  resolvers: {
    Query?
    Mutations?
  }
}
export class UserGraphQLRoutes implements GenericRoutes<Resolver> {
  constructor (private readonly userController: UserController) {

  }

  registerRoutes (): Resolver {
    const resolvers = {
      Query: {
        user: async (_, body: UserData) => {
          const userResponse: RestResponse = await this.userController.findByFilter({ body });
          if (userResponse.error) return userResponse.error;

          return userResponse.body;
        }
      },
      Mutations: {
        create: async (email: string, name: string): Promise<UserData | string> => {
          const userResponse: RestResponse = await this.userController.create({ body: { name, email } });
          if (userResponse.error) return userResponse.error;

          return userResponse.body;
        }
      }

    };
    return { resolvers, typeDefs };
  }
}

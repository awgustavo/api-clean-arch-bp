import * as dotenv from 'dotenv';

import { listenExpress, startExpress } from '../external/routes/express';
import { listenGraphQL } from '../external/routes/graphql';
import { UserFactory } from './factories/user.factory';

dotenv.config();

const app = startExpress();

const userFactory = new UserFactory();
app.use('/user', userFactory.routes);

listenExpress(app, 3000);
listenGraphQL(userFactory.resolvers, 4000);

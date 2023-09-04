import { Router, Request, Response } from 'express'
import { RestResponse } from '../../../adapters/controllers/ports/rest'
import { UserController } from '../../../adapters/controllers/user.controller'

export class UserRoutes {

    constructor(private userController: UserController, private router: Router) {

    }

    registerRoutes() {
        this.router.post('/', async (request: Request, response: Response) => {
            const userResponse: RestResponse = await this.userController.create({ body: request.body });
            if(userResponse.error) return response.status(userResponse.statusCode).send(userResponse.error)
            
            response.json(userResponse.body);
        })
        this.router.get('/', async (request: Request, response: Response) => {
            const userResponse: RestResponse  = await this.userController.findByFilter({ body: request.query });
            if(userResponse.error) return response.status(userResponse.statusCode).send(userResponse.error)

            response.json(userResponse.body);
        })
    }

}
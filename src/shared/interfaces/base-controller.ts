import { RestRequest, RestResponse } from "../../adapters/controllers/ports/rest";

export interface BaseController {
    create (request: RestRequest): Promise<RestResponse>
    findByFilter (request: RestRequest): Promise<RestResponse>
}

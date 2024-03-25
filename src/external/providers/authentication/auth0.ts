/* eslint-disable */
import { CustomInjectable } from "../../../shared/dependency-injection/dependency-injection";
import { Authenticator } from "../../../use-cases/ports/authentication";

@CustomInjectable()
export class Auth0Provider implements Authenticator {
  signUp(email: string, password: string, name: string) {
    throw new Error("Method not implemented.");
  }
  login(email: string, password: string) {
    throw new Error("Method not implemented.");
  }
  logout(email: string) {
    throw new Error("Method not implemented.");
  }

}

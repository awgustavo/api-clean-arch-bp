import { type UserData } from "./user.data";

export class User {
  constructor (private readonly userData: UserData) { }

  isValid (): boolean {
    return !this.userData.name || !this.userData.email;
  }
}

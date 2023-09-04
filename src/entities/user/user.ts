import { UserData } from "./user.data";
import { UserError } from "./user.error";

export class User {

    constructor(private userData: UserData) { }

    isValid(): boolean {
        return !this.userData.name || !this.userData.email;
    }
}

import "reflect-metadata";
import { CreateUserUseCase } from "./create-user.use-case";
import { FileStorage } from "../ports/file-storage";
import { BaseOrmRepository } from "../ports/base-orm.repository";
import { UserData } from "../../entities/user/user.data";
import { MailSender } from "../ports/mail-sender.ts";
import { Authenticator } from "../ports/authentication";

jest.mock("../ports/base-orm.repository");
describe("Create User", () => {
  const user = {
    name: "John Doe",
    email: "john@email.com",
  };
  const usersRepository: BaseOrmRepository<UserData, UserData> =
  {
    save: jest.fn().mockReturnValueOnce(Promise.resolve(user)),
    update: jest.fn().mockReturnValueOnce(Promise.resolve(user)),
    findByFilter: jest.fn().mockReturnValueOnce(Promise.resolve([user])),
    findOne: jest.fn().mockReturnValueOnce(Promise.resolve(user)),
    delete: jest.fn().mockReturnValueOnce(Promise.resolve(user)),
  };

  it("should create a user", async () => {
    const fileStorage: FileStorage = { createFolder: jest.fn() };
    const mailSender: MailSender = { sendEmail: jest.fn() };
    const authentication: Authenticator = { signUp: jest.fn(), login: jest.fn(), logout: jest.fn()  };
    const createdUserUseCase = new CreateUserUseCase(usersRepository, fileStorage, mailSender, authentication);
    const createdUser = await createdUserUseCase.execute(user);

    expect(createdUser).toMatchInlineSnapshot(`
{
  "email": "john@email.com",
  "name": "John Doe",
}
`);
  });
});

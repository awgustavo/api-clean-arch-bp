import { CreateUserUseCase } from "./create-user.use-case";
import { UserRepository } from '../ports/user.repository';
import { FileStorage } from "../ports/file-storage";

jest.mock('../ports/user.repository');
describe("Create User", () => {
  it("should create a user", async () => {

    const user = {
      name: "John Doe",
      email: "john@email.com",
    };

    const usersRepository: UserRepository = { save: jest.fn().mockReturnValueOnce(Promise.resolve(user)), findByFilter: jest.fn() };
    const fileStorage: FileStorage = { createFolder: jest.fn() };

    const createdUserUseCase = new CreateUserUseCase(usersRepository, fileStorage);
    const createdUser = await createdUserUseCase.createUser(user);
    
    expect(createdUser).toMatchInlineSnapshot(`
{
  "email": "john@email.com",
  "name": "John Doe",
}
`);
  });
});
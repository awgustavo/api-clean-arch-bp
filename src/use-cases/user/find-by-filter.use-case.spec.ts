import { FindByFilterUseCase } from "./find-by-filter.use-case";
import { BaseOrmRepository } from "../ports/base-orm.repository";
import { UserData } from "../../entities/user/user.data";

jest.mock("../ports/base-orm.repository");
describe("Find User", () => {
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
    const findByFilterUseCase = new FindByFilterUseCase(usersRepository);
    const returnedUser = await findByFilterUseCase.execute(user);

    expect(returnedUser).toMatchInlineSnapshot(`
[
  {
    "email": "john@email.com",
    "name": "John Doe",
  },
]
`);
  });
});

import {BaseTest} from "../BaseTest";
import {User} from "../../domain/User";
import {UserRepository} from "../../db/UserRepository";
import {suite, test, timeout} from "mocha-typescript";

@suite("userControllerSpec", timeout(200000))
export class UserControllerSpec extends BaseTest {
  async before() {
    await super.before();
    let h = ""
  }

  @test("saveUser")
  async saveUser() {
    let user = new User()
    await UserRepository.create(user);
  }
}

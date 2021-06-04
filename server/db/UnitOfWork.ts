import {injectable} from "inversify";
import {UserRepository} from "./UserRepository";


@injectable()
export class UnitOfWork {


  constructor() {

  }
  get userRepository(){
    return UserRepository;
  }

}

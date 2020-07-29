import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Register, UserInfo, Login, LoginUserInfo } from './user.type';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){}

  public async addUser(register: Register): Promise<UserInfo> {
    const registerUser = await this.userRepository.create();
    registerUser.email = register.email;
    registerUser.name = register.name;
    registerUser.uuid = 'uuid';
    registerUser.password = register.password;
    const user = await this.userRepository.save(registerUser);
    const userInfo: UserInfo = {
      email: user.email,
      name: user.name,
      uuid: user.uuid
    };
    return userInfo;
  }


  public async login(loginUser: Login): Promise<LoginUserInfo> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: loginUser.email
      }
    });

    const passwordCheck = loginUser.password === user.password ? true : false;
    if (!passwordCheck) {
      return null;
    }
    user.lastLoginDate = new Date();

    await this.userRepository.save(user);

    const userInfo: LoginUserInfo = {
      email: user.email,
      name: user.name,
      uuid: user.uuid,
      lastLogin: user.lastLoginDate
    };
    return userInfo;
  }

}

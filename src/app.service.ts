import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  signup(user:any){
    return this.authService.signup(user)
  }

  signin(user:any){
    return this.authService.signin(user)
  }

  allUsers(){
    return this.userService.find()
  }

}

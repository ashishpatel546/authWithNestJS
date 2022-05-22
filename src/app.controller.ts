import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'entities/userEntity';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/currentUserDecorator';
import { AuthGuard } from './gaurds/AuthGaurd';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
    ) {}

    @Get('/whoami')
  @UseGuards(AuthGuard)
  getHello(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/allusers')
  getAllUser(){
    return this.appService.allUsers()
  }

  @Post('/signin')
  signin(@Body() body: any){
    return this.appService.signin(body)
  }

  @Post('/signup')
  signup(@Body() body: any){
    return this.appService.signup(body)
  }
}

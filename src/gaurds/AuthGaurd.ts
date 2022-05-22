import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService : AuthService,
        private readonly userService: UserService
        ){}
  async canActivate(context: ExecutionContext){
    //   const [request, response, next] = context.getArgs()
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization;
    if(!token)
    throw new UnauthorizedException('token not found with request')
    
    try{
    const tokenToDecode = token.split(' ')[1]
    
    const decode = this.authService.verifyToken(tokenToDecode)
    const {password, id, ...otherinfo} = await this.userService.findByEmail(decode['email'])
    request.user = otherinfo;
    return true
    }
    catch(error){
        throw new UnauthorizedException("Unauthorized Token")
    }
    
  }
    
}

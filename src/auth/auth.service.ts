import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { userData, UserService } from 'src/user/user.service';
import {scrypt as _scrypt, randomBytes} from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

interface LoginCreds {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(user: userData) {
      const {email, password, name} = user;
      const findExistingUser = await this.userService.findByEmail(email)
      if(findExistingUser) throw new BadRequestException('user already exist with this email')
      const salt = randomBytes(16).toString('hex');
      const hash = await scrypt(password.toString(), salt, 16) as Buffer;
      const stringHashed = hash.toString('hex')
      console.log(stringHashed);
      
      const hashedPass = `${salt}.${stringHashed}`
      const userParams = {
          email,
          password: hashedPass,
          name
      }
    return this.userService.create(userParams);
  }

  async signin(loginCreds: LoginCreds) {
    const { email, password } = loginCreds;

    const user = await this.userService.findByEmail(loginCreds.email);
    if (!user) throw new NotFoundException('User not found');

    const storedPassword = user.password;

    const [salt, pass] = storedPassword.split('.')
    const stringHashed = await scrypt(password.toString(), salt, 16) as Buffer

    const hashedPass = `${salt}.${stringHashed.toString('hex')}`
    // console.log(hashedPass.toString('hex'));
    // console.log(storedPassword);
    


    if (hashedPass !== storedPassword)
      throw new BadRequestException('User or Password does not match');

    const accessToken = sign(
      {
        email: email,
      },
      process.env.AUTH_SECRET,
      { expiresIn: '1h' },
    );

    return `bearer ${accessToken}`;
  }

  verifyToken(token: string) {
    const decode = verify(token, process.env.AUTH_SECRET);
    return decode;
  }
}

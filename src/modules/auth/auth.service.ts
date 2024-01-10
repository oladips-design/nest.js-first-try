import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) return null;
    const match = await this.comparePasssword(pass, user.password);
    if (!match) return null;
    // tslint:disable-next-line: no-string-literal
    // eslint-disable-next-line no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }

  private async comparePasssword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  public async createUser(user) {
    const hashedpassword = await this.hashPassword(user.password);
    const newUser = await this.userService.create({
      ...user,
      password: hashedpassword,
    });

    const { password, ...result } = newUser.dataValues;

    const token = await this.generateToken(result);
    return { user: result, token };
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }
}

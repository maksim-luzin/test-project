import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { Model, Types } from 'mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Config } from 'src/enums/config';
import { compare, genSaltSync } from 'bcrypt';
import { ResetPasswordDto, CreateUserDto, UserInfoDto } from './dto';
import { IToken } from './interfaces';

@Injectable()
export class AuthService {
  salt: string;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
    this.salt = genSaltSync(10);
    this.createTestUser();
  }

  async createTestUser() {
    const name = process.env[Config.UserName];
    const password = process.env[Config.UserPassword];

    const isNameEmpty = await this.isNameEmpty(name);
    if (!isNameEmpty) return;

    await this.registration({
      name,
      password,
    });
  }

  async login(payload: UserInfoDto): Promise<IToken> {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env[Config.Secret],
      }),
    };
  }

  async reset({ username, password, newPassword }: ResetPasswordDto) {
    const isPasswordValid = await this.isPasswordValid({
      name: username,
      password,
    });
    if (!isPasswordValid) return new ForbiddenException();

    const user = await this.userModel.findOne({ name: username });
    user.password = await this.getHashPassword(newPassword);
    await user.save();

    return this.login({ _id: user._id.toString(), name: user.name });
  }

  async registration({ name, password }: CreateUserDto): Promise<IToken> {
    const { _id } = await this.userModel.create({
      name,
      password: await this.getHashPassword(password),
    });

    return this.login({ _id: _id.toString(), name });
  }

  async validateUser({ name, password }: CreateUserDto): Promise<UserInfoDto> {
    const isPasswordValid = await this.isPasswordValid({ name, password });
    if (!isPasswordValid) return null;
    const { _id } = await this.userModel.findOne({ name });
    return { _id: _id.toString(), name };
  }

  async isNameEmpty(name: string): Promise<boolean> {
    const response = await this.userModel.exists({ name });
    return !response;
  }

  getHashPassword(password: string): Promise<string> {
    return hash(password, this.salt);
  }

  async isPasswordValid({ name, password }: CreateUserDto) {
    const user = await this.userModel.findOne({ name });
    if (!user?.password) return false;
    return compare(password, user.password);
  }

  async isUser({ _id, name }: UserInfoDto): Promise<boolean> {
    const user = await this.userModel.findById(new Types.ObjectId(_id));
    if (!user) return false;
    return name === user.name;
  }
}

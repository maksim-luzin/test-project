import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MustBeString, MustNotBeEmpty } from 'src/messages';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'user name' })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly name: string;

  @ApiProperty({ example: 'pas1syxU', description: 'password' })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MustBeString, MustNotBeEmpty } from 'src/messages';

export class ResetPasswordDto {
  @ApiProperty({ example: 'user', description: 'user name' })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly username: string;

  @ApiProperty({ example: 'pas1syxU', description: 'old password' })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly password: string;

  @ApiProperty({ example: 'pas1sf6yxU', description: 'new password' })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly newPassword: string;
}

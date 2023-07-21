import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MustBeString, MustNotBeEmpty } from 'src/messages';

export class UserInfoDto {
  @ApiProperty({
    example: '64bacfe966a5a864288675c7',
    description: 'user id',
  })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly _id: string;

  @ApiProperty({ example: 'user', description: 'user name' })
  @IsNotEmpty({ message: MustNotBeEmpty })
  @IsString({ message: MustBeString })
  readonly name: string;
}

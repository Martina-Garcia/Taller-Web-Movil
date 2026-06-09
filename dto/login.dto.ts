import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@pickmart.cl' })
  email!: string;

  @ApiProperty({ example: '123456' })
  password!: string;
}
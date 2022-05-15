import { IsString, IsNotEmpty } from 'class-validator';

export class SessionLoginInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

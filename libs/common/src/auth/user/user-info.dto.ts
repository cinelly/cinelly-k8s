import { IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  sub: string;
  @IsString()
  aud: string;
  @IsString()
  iat: string;
  @IsString()
  exp: string;
  @IsString()
  azp: string;
}

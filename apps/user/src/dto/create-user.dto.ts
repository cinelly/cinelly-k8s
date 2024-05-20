import {
  IsArray,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { ExpertiseModel, UserModel } from '@app/common';
import { AvailabilityModel } from '../models/availability.model';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsArray()
  expertise: ExpertiseModel[];

  @IsString()
  @IsNotEmpty()
  city: string;

  // @IsEmail()
  @IsArray()
  @IsNotEmpty()
  email_invite: string[];

  @IsString()
  @IsNotEmpty()
  profile_description: string;

  @IsString()
  @IsNotEmpty()
  website_url: string;

  @IsArray()
  availability: AvailabilityModel[];
}

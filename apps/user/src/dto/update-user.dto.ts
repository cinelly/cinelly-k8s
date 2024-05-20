import { ExpertiseModel } from '@app/common';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { AvailabilityModel } from '../models/availability.model';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsOptional()
  @IsArray()
  expertise?: ExpertiseModel[];

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  profile_description?: string;

  @IsString()
  @IsOptional()
  website_url?: string;

  @IsString()
  @IsOptional()
  company_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsArray()
  @IsOptional()
  availability?: AvailabilityModel[];
}

import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ExpertiseModel } from '@app/common';

export class CreateJobDto {
  @IsArray()
  @IsNotEmpty()
  expertise: ExpertiseModel[];

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @Type(() => Date)
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  budget: Number;

  @IsString()
  @IsNotEmpty()
  location: string;
}

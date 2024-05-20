import { IsArray, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateJobDto } from './create-job.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ExpertiseModel } from '@app/common';
import { Type } from 'class-transformer';

export class UpdateJobDto {
  @IsOptional()
  @IsArray()
  expertise: ExpertiseModel[];

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsOptional()
  budget?: number;

  @IsString()
  @IsOptional()
  location?: number;
}

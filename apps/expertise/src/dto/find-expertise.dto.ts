import { FindCommonExpertiseDto } from 'libs/common/src';
import { IsObject } from 'class-validator';

export class FindExpertiseDto {
  @IsObject()
  expertise: FindCommonExpertiseDto;
}

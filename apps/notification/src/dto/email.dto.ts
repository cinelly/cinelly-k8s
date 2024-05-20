import { IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
    @IsString()
    @IsNotEmpty()
    to: string;
  
    @IsString()
    @IsNotEmpty()
    subject: string;
  
    @IsString()
    @IsNotEmpty()
    text: string;
  
    @IsString()
    @IsNotEmpty()
    html: string;
}
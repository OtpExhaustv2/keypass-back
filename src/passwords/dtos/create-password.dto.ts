import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePasswordDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsEmpty()
  cmt: string;
}

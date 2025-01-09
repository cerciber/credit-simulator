import { IsNumber, IsString } from 'class-validator';

export class BasicResponseDto {
  @IsNumber()
  status: number = 0;

  @IsString()
  code: string = '';

  @IsString()
  message: string = '';

  @IsString()
  detail: string = '';
}

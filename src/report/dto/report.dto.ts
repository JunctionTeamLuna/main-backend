import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetReportsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive() //양수검증
  @Type(() => Number)
  page?: number = 1; // 기본값 설정

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10; // 기본값 설정
}

export class DeleteReportDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number;
}

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

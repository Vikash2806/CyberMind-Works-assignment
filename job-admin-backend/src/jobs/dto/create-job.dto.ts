import {
  IsString,
  IsEnum,
  IsNumber,
  IsDateString,
  IsNotEmpty,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Full Stack Developer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  jobTitle: string;

  @ApiProperty({ example: 'Amazon' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  companyName: string;

  @ApiProperty({ example: 'Chennai' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  location: string;

  @ApiProperty({
    example: 'Full-time',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  })
  @IsEnum(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType: string;

  @ApiProperty({ example: 0, description: 'Minimum salary (e.g., 50000)' })
  @IsNumber()
  @Min(0)
  salaryMin: number;

  @ApiProperty({ example: 1200000, description: 'Maximum salary (e.g., 80000)' })
  @IsNumber()
  @Min(0)
  salaryMax: number;

  @ApiProperty({
    example: 'Please share a description to let the candidate know more about the job role',
  })
  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @ApiProperty({ example: '2025-12-31' })
  @IsDateString()
  applicationDeadline: string;
}
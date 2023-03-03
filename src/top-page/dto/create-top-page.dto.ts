import { HhData, TopLevelCategory } from '../top-page.model/top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TopPageAdvantageDto {
	@IsString()
	tittle: string;

	@IsString()
	descriptions: string;
}

export class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstLevelCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDto)
	hh?: HhData

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantageDto [];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
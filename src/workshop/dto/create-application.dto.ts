import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {

	@IsNumber()
	deviceOwnerKey: number;

	@IsNumber()
	repairEngineerKey: number;

	@IsNumber()
	repairManagerKey: number;

	@IsObject()
	device: Record<string, any>;

	@IsString()
	deviceProblems: string;

	@IsString()
	deviceAppearance: string;

	@IsOptional()
	@IsString()
	additionalTextEngineer?: string;

	@IsOptional()
	@IsString()
	additionalTextManager?: string;

}
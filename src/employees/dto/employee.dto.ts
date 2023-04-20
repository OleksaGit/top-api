import { IsObject, IsString } from 'class-validator';

export class EmployeeDto {

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	middleName: string;

	@IsString()
	pass: string;

	@IsString()
	email: string;

	@IsString()
	tel: string;

	@IsObject()
	employeeRights: Record<string, any>;

	@IsObject()
	salarySetting: Record<string, any>;

	@IsObject()
	accessRights: Record<string, any>;

	@IsObject()
	notificationSetting: Record<string, any>;

}
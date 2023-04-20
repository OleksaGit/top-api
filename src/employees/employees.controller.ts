import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employee.dto';
import { EMPLOYEE_WITH_CURRENT_ID_NOT_FOUND } from './employee.constants';

@Controller('employees')
export class EmployeesController {
	constructor(private readonly employee: EmployeesService) {
	}

	@Post('register-employee')
	async registerNewEmployee(@Body() dto: EmployeeDto) {
		return await this.employee.createEmployee(dto)
	}

	@Get('employee')
	async findEmployees(
		@Query('firstName') firstName: string,
		@Query('lastName') lastName: string,
		@Query('middleName') middleName: string,
		@Query('email') email: string,
	) {
		const where = {}
		if (firstName) {
			where['firstName'] = firstName
		}
		if (lastName) {
			where['lastName'] = lastName
		}
		if (middleName){
			where['middleName'] = middleName
		}
		if (email) {
			where['email'] = email
		}

		return await this.employee.findEmployee(where)
	}

	@Put(':id')
	async updateEmployeeById(@Param('id') id, @Body() dto: EmployeeDto) {
		const res = await this.employee.updateEmployee(dto, id)
		if (res[0] === 1) {
			return res
		}
		throw new NotFoundException(EMPLOYEE_WITH_CURRENT_ID_NOT_FOUND)
	}
}

import { Body, Controller, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employee.dto';

@Controller('employees')
export class EmployeesController {
	constructor(private readonly employee: EmployeesService) {
	}

	@Post('register-employee')
	async registerNewEmployee(@Body() dto: EmployeeDto) {
		return await this.employee.createEmployee(dto)
	}
}

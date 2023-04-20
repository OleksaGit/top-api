import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeModel } from '../database/';
import { EmployeeDto } from './dto/employee.dto';
import { genSalt, hash } from 'bcryptjs';
import { WhereOptions } from 'sequelize';

@Injectable()
export class EmployeesService {
	constructor(
		@InjectModel(EmployeeModel)
		private readonly employee: typeof EmployeeModel
	) {	}

	async createEmployee(dto: EmployeeDto): Promise<EmployeeModel>{
		const salt = await genSalt(10);
		return this.employee.create({
			...dto,
			pass_hash: await hash(dto.pass, salt)
		})
	}

	async findEmployee(where: WhereOptions): Promise<EmployeeModel[]> {
		return await this.employee.findAll({
			where,
			order: [['createdAt', 'DESC']],
		})
	}

	async updateEmployee(dto, id) {
		return await this.employee.update({...dto }, { where: { id } })
	}
}

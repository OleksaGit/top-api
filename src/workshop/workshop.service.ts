import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkshopModel } from '../database';
import { CreateApplicationDto } from './dto/create-application.dto';
import { WhereOptions } from 'sequelize';
import { UserModel } from '../database';
import { StatusModel } from '../database';

@Injectable()
export class WorkshopService {
	constructor(
		@InjectModel(WorkshopModel)
		private readonly workshop: typeof WorkshopModel
	) {	}

	async createApplication(dto: CreateApplicationDto): Promise<WorkshopModel> {
		return await this.workshop.create({...dto})
	}

	async findApplication(where: WhereOptions): Promise<WorkshopModel[]> {
		return await this.workshop.findAll({
			where,
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: UserModel,
					as: 'deviceOwner',
				},
				{
					model: UserModel,
					as: 'repairEngineer',
				},
				{
					model: UserModel,
					as: 'repairManager',
				},
				{
					model: StatusModel,
					as: 'repairStatus',
				}
			]
		});
	}

	async updateApplication (dto: CreateApplicationDto, id: string) {
		return await this.workshop.update({...dto }, { where: { id } })
	}
}

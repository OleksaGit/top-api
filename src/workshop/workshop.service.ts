import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkshopModel } from '../database/models/workshop.model';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class WorkshopService {
	constructor(
		@InjectModel(WorkshopModel)
		private readonly workshop: typeof WorkshopModel
	) {	}

	async createApplication(dto: CreateApplicationDto): Promise<WorkshopModel> {
		return await this.workshop.create({...dto})
	}
}

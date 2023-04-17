import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('workshop')
export class WorkshopController {
	constructor(private readonly workshopService: WorkshopService) {
	}

	@Post('create-app')
	async (@Body() dto: CreateApplicationDto) {
		// 	throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		return this.workshopService.createApplication(dto)
	}

	@Get('repairs')
	async findAllRepairs(
		@Query('deviceOwnerKey') deviceOwnerKey: number,
		@Query('repairEngineerKey') repairEngineerKey: number,
		@Query('repairManagerKey') repairManagerKey: number,
		@Query('repairStatusKey') repairStatusKey: number,
	) {

		const where = {};
		if (deviceOwnerKey) {
			where['deviceOwnerKey'] = deviceOwnerKey;
		}
		if (repairEngineerKey) {
			where['repairEngineerKey'] = repairEngineerKey;
		}
		if (repairManagerKey) {
			where['repairManagerKey'] = repairManagerKey;
		}
		if (repairStatusKey) {
			where['repairStatusKey'] = repairStatusKey;
		}

		return this.workshopService.findAllRepairs(where)

	}
}

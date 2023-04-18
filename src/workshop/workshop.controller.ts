import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { APP_WITH_CURRENT_ID_NOT_FOUND } from './workshop.constants';

@Controller('workshop')
export class WorkshopController {
	constructor(private readonly workshopService: WorkshopService) {
	}

	@Post('create-app')
	async createNewApplication(@Body() dto: CreateApplicationDto) {
		// 	throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		return this.workshopService.createApplication(dto)
	}

	@Get('repairs')
	async findAllApplication(
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

		return this.workshopService.findApplication(where)

	}

	@Put(':id')
	async updateApplicationById(@Param('id') id, @Body() dto: CreateApplicationDto) {
		const res = await this.workshopService.updateApplication(dto, id)
		if (res[0] === 1) {
			return res
		}
		throw new NotFoundException(APP_WITH_CURRENT_ID_NOT_FOUND)
	}
}

import { Body, Controller, Post } from '@nestjs/common';
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
}

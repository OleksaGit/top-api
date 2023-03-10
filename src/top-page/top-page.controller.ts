import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes, ValidationPipe
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PAGE_NOT_FOUND_ERROR } from './top-page.constanst';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {
	}

	@Post('create')
	// async create(@Body() dto: Omit<TopPageModel, '_id'>) {
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto)
	}
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.findById(id)
		if (!topPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}
		return topPage
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const topPage = await this.topPageService.findByAlias(alias)
		if (!topPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}
		return topPage
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.topPageService.deleteById(id)
		if (!deletedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedTopPage = await this.topPageService.updateById(id, dto)
		if (!updatedTopPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}
		return updatedTopPage
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory)
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text)
	}
}

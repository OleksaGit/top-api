import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model/top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {
	}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto)
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec()
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec()
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		// return this.topPageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec()
		return this.topPageModel.aggregate([
			{
				$match: { firstCategory }
			},
			{
				$group: {
					_id: { secondCategory: '$secondCategory'},
					pages: { $push: { alias: '$alias', title: '$title', category: '$category', _id: '$_id'} }
				}
			}
		]).exec()

	}

	async findByText(text: string) {
		return this.topPageModel.find({ $text: {$search: text, $caseSensitive: false } }).exec()
	}

	async deleteById(id) {
		return this.topPageModel.findByIdAndDelete(id).exec()
	}

	async updateById(id, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

}

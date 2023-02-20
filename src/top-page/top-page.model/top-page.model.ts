import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	tittle: string;

	@prop()
	descriptions: string;
}

export interface TopPageModel extends Base {}
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => HhData})
	hh?: HhData

	@prop({ type: () => [TopPageAdvantage]})
	advantages: TopPageAdvantage [];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String]})
	tags: string[];
}
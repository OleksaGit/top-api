import { ModuleMetadata } from '@nestjs/common';

export interface ITelegramOption {
	chatId: string;
	token: string;
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...arg: any[]) => Promise<ITelegramOption> | ITelegramOption;
	inject?: any[];
}
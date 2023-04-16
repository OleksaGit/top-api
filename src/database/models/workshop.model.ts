import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'workshop' })
export class WorkshopModel extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({ field: 'repair_id' })
	id: number;

	@ForeignKey(() => UserModel)
	@Column({ field: 'device_owner', allowNull: false })
	deviceOwnerKey: number;

	@BelongsTo(() => UserModel)
	deviceOwner: UserModel;

	@ForeignKey(() => UserModel)
	@Column({ field: 'repair_engineer', allowNull: false })
	repairEngineerKey: number;

	@BelongsTo(() => UserModel)
	repairEngineer: UserModel;

	@ForeignKey(() => UserModel)
	@Column({ field: 'repair_manager', allowNull: false })
	repairManagerKey: number;

	@BelongsTo(() => UserModel)
	repairManager: UserModel;

	@Column({
		field: 'device',
		type: 'jsonb',
		allowNull: false,
	})
	device: Record<string, any>;

	@Column({
		field: 'device_problems',
		type: 'text',
		allowNull: false,
	})
	deviceProblem: string;

	@Column({
		field: 'device_appearance',
		type: 'text',
	})
	deviceAppearance: string;

	@Column({
		field: 'additional_text_engineer',
		type: 'text',
	})
	additionalTextEngineer: string;

	@Column({
		field: 'additional_text_manager',
		type: 'text',
	})
	additionalTextManager: string;

	@Column({
		field: 'conclusion',
		type: 'text',
	})
	conclusion: string;

	@Column({
		field: 'warranty',
		type: 'integer',
	})
	warrantyDays: number;

	@Column({
		field: 'parts',
		type: 'jsonb',
	})
	parts: Record<string, any>;

	@Column({
		field: 'completed_works',
		type: 'jsonb',
	})
	completedWorks: Record<string, any>;

	@Column({
		field: 'date_out',
		type: 'timestamptz',
	})
	dateOut: Date;

	@Column({
		field: 'created_at',
		allowNull: false
	})
	createdAt: Date;

	@Column({
		field: 'updated_at',
		allowNull: false
	})
	updatedAt: Date;

}
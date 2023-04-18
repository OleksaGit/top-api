import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'repair_status' })
export class StatusModel extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({ field: 'status_id' })
	id: number;

	@Column({
		field: 'status_key',
		allowNull: false,
	})
	statusKey: string;

	@Column({
		field: 'actions',
		type: 'jsonb',
	})
	actions: Record<string, any>;

	@Column({
		field: 'prev_status_key',
		type: 'varchar',
	})
	previewStatusKey: string;

	@Column({
		field: 'next_status_key',
		type: 'varchar',
	})
	nextStatusKey: string;

	@Column({
		field: 'created_at',
		allowNull: false,
		type: 'timestamptz'
	})
	createdAt: Date;

	@Column({
		field: 'updated_at',
		allowNull: false,
		type: 'timestamptz'
	})
	updatedAt: Date;

}
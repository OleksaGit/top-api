import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserModel extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column({ field: 'user_id' })
	id: number;

	@Column
	first_name: string;

	@Column
	last_name: string;

	@Column
	middle_name: string;

	@Column
	tel: string;

	@Column
	email: string;

	@Column
	user_rights: string;

	@Column({ field: 'pass_hash' })
	pass_hash: string;

	@Column
	customer_note: string;

	@Column({ field: 'created_at', allowNull: false })
	createdAt: Date;

	@Column({ field: 'updated_at', allowNull: false })
	updatedAt: Date;
}
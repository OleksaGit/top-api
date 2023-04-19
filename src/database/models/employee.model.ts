import { AutoIncrement, BeforeCreate, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'employees' })
export class EmployeeModel extends Model {
	@BeforeCreate
	static async addDefaultId(employee: EmployeeModel) {
		const count = await EmployeeModel.count();
		if (count === 0) {
			employee.id = 1;
		}
	}

	@PrimaryKey
	@AutoIncrement
	@Column({ field: 'employee_id' })
	id: number;

	@Column
	first_name: string;

	@Column
	last_name: string;

	@Column
	middle_name: string;

	@Column({ field: 'pass_hash' })
	pass_hash: string;

	@Column
	email: string;

	@Column
	tel: string;

	@Column({
		field: 'employee_rights',
		type: 'jsonb',
		allowNull: false,
	})
	employeeRights: Record<string, any>;

	@Column({
		field: 'salary_setting',
		type: 'jsonb',
		allowNull: false,
	})
	salarySetting: Record<string, any>;

	@Column({
		field: 'access_rights',
		type: 'jsonb',
		allowNull: false,
	})
	accessRights: Record<string, any>;

	@Column({
		field: 'notification_setting',
		type: 'jsonb',
		allowNull: false,
	})
	notificationSetting: Record<string, any>;

	@Column({
		field: 'created_at',
		type: 'timestamptz',
		allowNull: false
	})
	createdAt: Date;

	@Column({
		field: 'created_at',
		type: 'timestamptz',
		allowNull: false
	})
	updatedAt: Date;
}
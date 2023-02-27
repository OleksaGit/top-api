import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	login: 'tmp@gmail.com',
	password: '12345'
}

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) success', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.expect(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined()
			})
	});

	it('/auth/login (POST) fail login', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto , login: 'test_failed@gmeil.com' })
			.expect(401, {
				statusCode: 401,
				message: "Користувача з таким email не знайдено",
				error: "Unauthorized"
			})
	});

	it('/auth/login (POST) fail pass', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto , password: 'wrong_pass' })
			.expect(401, {
				statusCode: 401,
				message: "Невірний пароль",
				error: "Unauthorized"
			})
	});



	afterAll(() => {
		disconnect()
	})

});
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString()

const loginDto: AuthDto = {
	login: 'tmp@gmail.com',
	password: '12345'
}

const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	description: 'Descriptions',
	rating: 5,
	productId,
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();

	const { body } = await request(app.getHttpServer())
		.post('/auth/login')
		.send(loginDto)
		token = body.access_token
  });

	it('/review/create (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.expect(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined()
			})

			// .then(({ body }: request.Response) => {
			// 	createdId = body._id;
			// 	expect(createdId).toBeDefined()
			// 	done()
			// })
	});

	it('/review/create (POST) fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({...testDto, rating: 0 })
			.expect(400)
	});

	it('/review/byProduct/:productId (GET)', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.send(testDto)
			.expect(200)
			.expect(({ body }: request.Response) => {
				expect(body.length).toBe(1)
			})
	});

	it('/review/:id (DELETE)', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.send(testDto)
			.expect(200)
	});

	afterAll(() => {
		disconnect()
	})


	/**default test
	 *
	 */
  // it('/ (GET)', () => {
	// return request(app.getHttpServer())
	// 	.get('/')
	// 	.expect(200)
	// 	.expect('Hello World!');
  // });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'process';

const createCategory = {
  name: 'Test',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let id: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories/create (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/categories/create')
      .send(createCategory)
      .expect(200)
      .then(({ body }: request.Response) => {
        id = body.id;
        expect(body.name).toBeDefined();
        done();
      });
  });

  it('/categories/:id (GET)', async (done) => {
    return request(app.getHttpServer())
      .get('/categories/' + id)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });

  it('/categories/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .get('/categories/' + id)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});

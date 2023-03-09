import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'process';

const createBank = {
  name: 'Test Bank',
  balance: 2500,
  cardNumber: '1111 1111 1111 1111',
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

  it('/banks/create (POST)', async (done) => {
    return request(app.getHttpServer())
      .post('/banks/create')
      .send(createBank)
      .expect(200)
      .then(({ body }: request.Response) => {
        id = body.id;
        expect(body.name).toBeDefined();
        expect(body.balance).toBeDefined();
        expect(body.cardNumber).toBeDefined();
        done();
      });
  });

  it('/banks/:id (GET)', async (done) => {
    return request(app.getHttpServer())
      .get('/banks/' + id)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });

  it('/banks/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .get('/banks/' + id)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});

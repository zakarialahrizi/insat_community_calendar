import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest'
import { AppModule } from '../src/app.module';

describe('Reservations (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => { await app.close(); });

  it('POST /api/reservations -> 201', () => {
    return request(app.getHttpServer())
      .post('/api/reservations')
      .send({
        nomResponsable: 'Ali', email: 'ali@test.tn',
        date: '2030-01-10', heureDebut: '09:00', heureFin: '10:00',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.statut).toBe('EN_ATTENTE');
        expect(res.body.id).toBeDefined();
      });
  });

  it('POST avec heures incohérentes -> 400', () => {
    return request(app.getHttpServer())
      .post('/api/reservations')
      .send({
        nomResponsable: 'Ali', email: 'ali@test.tn',
        date: '2030-01-10', heureDebut: '10:00', heureFin: '09:00',
      })
      .expect(400);
  });
});
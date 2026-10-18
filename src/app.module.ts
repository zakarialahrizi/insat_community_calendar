import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
    imports: [
      TypeOrmModule.forRoot({
    type: 'sqljs',
    location: 'db.sqlite',
    autoSave: process.env.NODE_ENV !== 'test',
    autoLoadEntities: true,
    synchronize: true,
  }),
    ReservationsModule,
  ],
})
export class AppModule {}
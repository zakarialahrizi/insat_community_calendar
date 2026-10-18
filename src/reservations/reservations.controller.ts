import { Body, Controller, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Post()
  creer(@Body() dto: CreateReservationDto) {
    return this.service.creer(dto);
  }
}
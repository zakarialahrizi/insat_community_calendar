import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, StatutReservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly repo: Repository<Reservation>,
  ) {}

  async creer(dto: CreateReservationDto): Promise<Reservation> {
    if (dto.heureFin <= dto.heureDebut) {
      throw new BadRequestException("L'heure de fin doit être après l'heure de début");
    }
    if (new Date(dto.date) < new Date(new Date().toDateString())) {
      throw new BadRequestException('La date doit être dans le futur');
    }
    const reservation = this.repo.create({
      ...dto,
      statut: StatutReservation.EN_ATTENTE,
    });
    return this.repo.save(reservation);
  }
}
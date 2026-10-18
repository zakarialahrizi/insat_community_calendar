import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum StatutReservation {
  EN_ATTENTE = 'EN_ATTENTE',
  ACCEPTEE = 'ACCEPTEE',
  REFUSEE = 'REFUSEE',
}

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() nomResponsable: string;
  @Column() email: string;
  @Column() date: string;        // YYYY-MM-DD
  @Column() heureDebut: string;  // HH:mm
  @Column() heureFin: string;    // HH:mm
  @Column({ nullable: true }) description?: string;

  @Column({ type: 'varchar', default: StatutReservation.EN_ATTENTE })
  statut: StatutReservation;
}
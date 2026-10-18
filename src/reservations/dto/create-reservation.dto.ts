import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateReservationDto {
  @IsString() @IsNotEmpty() nomResponsable: string;
  @IsEmail() email: string;
  @Matches(/^\d{4}-\d{2}-\d{2}$/) date: string;
  @Matches(/^\d{2}:\d{2}$/) heureDebut: string;
  @Matches(/^\d{2}:\d{2}$/) heureFin: string;
  @IsOptional() @IsString() description?: string;
}
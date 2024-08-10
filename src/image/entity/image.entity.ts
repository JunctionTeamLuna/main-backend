import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

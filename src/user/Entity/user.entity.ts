import { ReportEntity } from 'src/report/entity/report.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  report: number;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];
}

import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './entity/report.entity';

@Module({
  providers: [ReportService],
  controllers: [ReportController],
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  exports: [ReportService, TypeOrmModule],
})
export class ReportModule {}

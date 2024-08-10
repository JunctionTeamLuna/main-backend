import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './entity/report.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ReportService],
  controllers: [ReportController],
  imports: [TypeOrmModule.forFeature([ReportEntity]), UserModule],
  exports: [ReportService, TypeOrmModule],
})
export class ReportModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entity/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {}

  async getAllReport(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: ReportEntity[]; count: number }> {
    const [data, count] = await this.reportRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, count };
  }
}

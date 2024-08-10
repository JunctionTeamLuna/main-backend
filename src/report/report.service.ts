import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async getReport(userId: number) {
    return await this.reportRepository.find({
      where: { user: { id: userId } },
    });
  }

  async deleteReport(userId: number, reportId: number) {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
      relations: ['user'],
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    // Report가 해당 유저의 소유인지 확인
    if (report.user.id !== userId) {
      throw new UnauthorizedException('You do not own this report');
    }

    // 리포트 삭제
    await this.reportRepository.delete(reportId);
    return { message: 'Report deleted successfully' };
  }

  async createReport(user: any, data: any) {
    const newReport = this.reportRepository.create({
      ...data,
      user,
    });

    return await this.reportRepository.save(newReport);
  }
}

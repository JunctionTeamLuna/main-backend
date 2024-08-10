import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';

@ApiTags('Report API')
@Controller('api/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiQuery({
    name: 'page',
    required: false,
    description: '페이지 번호',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '페이지당 데이터 수',
    example: 10,
  })
  @Get()
  async getAllReport(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const reports = await this.reportService.getAllReport(page, limit);
    return {
      data: reports.data,
      count: reports.count,
      currentPage: page,
      totalPages: Math.ceil(reports.count / limit),
    };
  }
}

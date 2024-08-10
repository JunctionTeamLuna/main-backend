import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import {
  CreateReportDto,
  DeleteReportDto,
  GetReportsDto,
} from './dto/report.dto';

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
  @Get('all')
  async getAllReport(@Query() query: GetReportsDto) {
    const { page, limit } = query;
    const reports = await this.reportService.getAllReport(page, limit);
    return {
      data: reports.data,
      count: reports.count,
      currentPage: page,
      totalPages: Math.ceil(reports.count / limit),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getReport(@Request() req) {
    const user = req.user;
    return this.reportService.getReport(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  async deleteReport(
    @Request() req,
    @Query() deleteReportDto: DeleteReportDto,
  ) {
    const { id } = deleteReportDto;
    const user = req.user;
    const report = await this.reportService.getReport(user.id);

    if (!report) {
      throw new NotFoundException();
    }
    return await this.reportService.deleteReport(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReport(@Request() req, @Body() createReportDto: CreateReportDto) {
    const { title, content } = createReportDto;
    const user = req.user;
    return await this.reportService.createReport(user, { title, content });
  }
}

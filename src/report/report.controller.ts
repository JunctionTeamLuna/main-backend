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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@ApiTags('Report API')
@Controller('api/report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly userService: UserService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getReport(@Request() req) {
    const user = req.user;
    return this.reportService.getReport(user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteReport(@Request() req, @Query('id') id: number) {
    const user = req.user;
    const report = await this.reportService.getReport(user.id);

    if (!report) {
      throw new NotFoundException();
    }
    await this.reportService.deleteReport(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReport(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const user = req.user;
    await this.reportService.createReport(user, { title, content });
  }
}

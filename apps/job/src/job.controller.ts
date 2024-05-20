import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthorizationGuard, PermissionGuard } from '@app/common';

@UseGuards(AuthorizationGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @SetMetadata('permissions', ['read:expertise'])
  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto, @Req() req: any) {
    console.log('createJobDto', createJobDto);
    return this.jobService.create(req, createJobDto);
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  find(@Req() req: any) {

    return this.jobService.find(req);

  }

  @UseGuards(AuthorizationGuard, PermissionGuard)
  // @SetMetadata('permissions', ['read:jobs'])
  @Get('all')
  findAll() {
    return this.jobService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Get(':_id')
  findOne(@Param('_id') id: string) {
    return this.jobService.findOne(id);
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':_id')
  update(@Param('_id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':_id')
  remove(@Param('_id') id: string) {
    return this.jobService.remove(id);
  }
}

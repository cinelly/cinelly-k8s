import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ExpertiseService } from "./expertise.service";
import {
  Ctx,
  EventPattern,
  MessagePattern,
  RmqContext,
} from "@nestjs/microservices";

import {
  AuthorizationGuard,
  ExpertiseModel,
  IdExpertiseDto,
  PermissionGuard,
} from "@app/common";
import { CreateExpertiseDto } from "./dto/create-expertise.dto";

@Controller("expertise")
export class ExpertiseController {
  constructor(private readonly expertisesService: ExpertiseService) {}

  @Post()
  async create(@Body() createExpertiseDto: CreateExpertiseDto) {
    return this.expertisesService.create(createExpertiseDto);
  }

  // @SetMetadata('permissions', ['read:expertise'])
  // @UseGuards(AuthorizationGuard)
  // @Get()
  // findAll() {
  //   return this.expertisesService.findAll();
  // }

  @MessagePattern("get-expertise")
  @UsePipes(new ValidationPipe())
  @Get("find")
  async findMultiple(
    @Body() data: ExpertiseModel[],
    @Ctx() context: RmqContext
  ) {
    return await this.expertisesService.findMultipleExpertises(data);
  }

  @UseGuards(AuthorizationGuard)
  @Get("/protected")
  getProtected(@Req() req): string {
    console.log(req.auth);

    const hello = this.expertisesService.getPrivate();

    return hello;
  }
}

import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Patch,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AbstractDocument,
  AuthorizationGuard,
  ExpertiseModel,
} from '@app/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.userService.create(req, createUserDto);
  }

  @UseGuards(AuthorizationGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.update(req, updateUserDto);
  }

  @UseGuards(AuthorizationGuard)
  @MessagePattern({ cmd: 'get-user' })
  @UsePipes(new ValidationPipe())
  async findMultiple(@Body() data: ExpertiseModel[]) {
    console.log(data);
  }

  @UseGuards(AuthorizationGuard)
  @UsePipes(new ValidationPipe())
  @Get()
  async findAllUser(@Req() req) {
    console.log(req.user.sub);
    // return this.userService.getUserInfo(req);
  }

  // @UseGuards(AuthorizationGuard)
  @MessagePattern({ cmd: 'post-user' })
  @UsePipes(new ValidationPipe())
  async findJobExpertises(@Body() data: AbstractDocument) {
    return await this.userService.compareExpertises(data);
  }

  @UseGuards(AuthorizationGuard)
  @UsePipes(new ValidationPipe())
  async findUserInformation(@Req() req) {
    this.userService.getUserInfo(req);
  }
}

import { Body, Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern } from '@nestjs/microservices';
import { EmailDto } from './dto/email.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern({ cmd: 'post-email' })
  @UsePipes(new ValidationPipe())
  async sendEmail(@Body() emailDto: EmailDto) {
    return this.notificationService.sendEmail(emailDto.to, emailDto.subject, emailDto.text, emailDto.html);
  }
}

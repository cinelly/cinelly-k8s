import { JOB_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import sgMail from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(JOB_SERVICE) private readonly natsClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(to: string, subject: string, text: string, html: string) {
    sgMail.setApiKey(this.configService.get('NATS_SERVER'));

    const msg = {
      to,
      from: 'admin@cinelly.com',
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}

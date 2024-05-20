import { NestFactory } from "@nestjs/core";
import { ExpertiseModule } from "./expertise.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { RmqService } from "@app/common";
import { EXPERTISE_SERVICE } from "apps/job/src/constants/services";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(ExpertiseModule);
  // const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>("RABBITMQ_URL")],
      queue: "expertise",
      noAck: true,
      persistent: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle("expertise example")
    .setDescription("The expertise API description")
    .setVersion("1.0")
    .addTag("expertise")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // app.connectMicroservice(rmqService.getOptions(EXPERTISE_SERVICE));
  await app.startAllMicroservices();
  await app.listen(configService.get("HTTP_PORT"));
}
bootstrap();

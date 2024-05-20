import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ExpertiseRepository } from "./expertise.repository";
import { CreateExpertiseDto } from "./dto/create-expertise.dto";
import { ExpertiseModel, IdExpertiseDto } from "@app/common";
import { ExpertiseController } from "./expertise.controller";

@Injectable()
export class ExpertiseService {
  constructor(private readonly expertiseRepository: ExpertiseRepository) {}

  private readonly logger = new Logger(ExpertiseController.name);

  public test(data: ExpertiseModel[]) {
    this.logger.log("test", data);
  }

  public async create(createExpertiseDto: CreateExpertiseDto) {
    const expertise = await this.expertiseRepository.find({
      name: createExpertiseDto.name,
    });

    if (expertise && expertise.length > 0) {
      throw new BadRequestException("Expertise already exists");
    }

    return this.expertiseRepository.create({
      ...createExpertiseDto,
    });
  }

  getPrivate(): string {
    return "This is a public resource. Welcome visitor!";
  }

  async findMultipleExpertises(data: IdExpertiseDto[]): Promise<any[]> {
    return Promise.all(
      data.map(async (item) => {
        const filter = { _id: item };

        const expertise = await this.expertiseRepository.find(filter);

        if (!expertise) {
          throw new NotFoundException(item._id);
        }

        return expertise;
      })
    );
  }
}

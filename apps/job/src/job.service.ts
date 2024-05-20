import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JobRepository } from './job.repository';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { lastValueFrom, map } from 'rxjs';
import { EXPERTISE_SERVICE, IdExpertiseDto } from '@app/common';

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    @Inject(EXPERTISE_SERVICE) private expertiseClient: ClientProxy,
  ) {}

  async create(req: any, createJobDto: CreateJobDto) {
    const { expertise } = createJobDto;
    const expertises = await this.sendExpertise(expertise);
    console.log(expertises);
    // const expertiseResponse = await this.getExpertise(expertise);
    // Use the response to create the job
    // return await this.jobRepository.create({
    //   user: req.auth,
    //   ...createJobDto,
    //   expertise: expertiseResponse,
    //   timestamp: new Date(),
    // });
  }

  private async sendExpertise(expertise: IdExpertiseDto[]) {
    try {
      const userResponse = await lastValueFrom(
        this.expertiseClient.send('get-expertise', expertise),
      );
      if (!userResponse) {
        return 'No expertise found for the provided expertises IDs';
      }
      return userResponse;
    } catch (error) {
      console.error('Error while sending message to get expertise:', error);
      throw error;
    }
  }

  // private async sendJob(job: AbstractDocument) {
  //   try {
  //     const userResponse = await lastValueFrom(
  //       this.userClient.send({ cmd: 'post-job' }, job),
  //     );
  //     if (!userResponse) {
  //       return 'No user found for the provided expertises IDs';
  //     }
  //     return userResponse;
  //   } catch (error) {
  //     console.error('Error while sending message to post-job:', error);
  //     throw error;
  //   }
  // }

  async find(req: any) {
    const sub = req.auth.sub;
    return this.jobRepository.find({ 'user.sub': sub });
  }

  async findAll() {
    return this.jobRepository.find({});
  }

  async findOne(_id: string) {
    return this.jobRepository.findOne({ _id });
  }

  async update(_id: string, updateJobDto: UpdateJobDto) {
    // const { expertise } = updateJobDto;
    //
    // // Check if expertise has changed
    // if (expertise !== undefined) {
    //   // Fetch the expertise details
    //   const expertiseResponse = await this.getExpertise(expertise);
    //
    //   // Update the job with the new details
    //   return this.jobRepository.findOneAndUpdate(
    //     { _id },
    //     {
    //       $set: {
    //         ...updateJobDto,
    //         expertise: expertiseResponse,
    //       },
    //     },
    //   );
    // } else {
    //   // If expertise is not changed, update without fetching
    //   return this.jobRepository.findOneAndUpdate(
    //     { _id },
    //     {
    //       $set: updateJobDto,
    //     },
    //   );
    // }
  }

  // async update(_id: string, updateJobDto: UpdateJobDto) {
  //   return this.jobRepository.findOneAndUpdate({ _id }, { $set: updateJobDto });
  // }

  async remove(_id: string) {
    return this.jobRepository.findOneAndDelete({ _id });
  }
}

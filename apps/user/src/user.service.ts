import { EXPERTISE_SERVICE, IdExpertiseDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { UserRepository } from './user.repository';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(EXPERTISE_SERVICE) private readonly natsClient: ClientProxy,
  ) {}

  async create(req: any, createUserDto: CreateUserDto) {
    // Check if the user already exists
    const userExists = await this.doesUserExist(req.auth.sub);

    // If the user exists, throw an error or return a meaningful response
    if (userExists) {
      throw new Error('User already exists.');
      // Alternatively, you can return a response indicating the user exists
      // return { message: 'User already exists.' };
    }

    // If the user does not exist, proceed with creating a new user
    const { expertise } = createUserDto;
    const expertiseResponse = await this.getExpertise(expertise);

    // Create a new user with the provided details and additional information
    const newUser = await this.userRepository.create({
      ...createUserDto,
      user: req.auth,
      expertise: expertiseResponse,
    });

    // Return the newly created user or a success response
    return newUser;
    // Alternatively, return a success message
    // return { message: 'User created successfully', user: newUser };
  }

  async update(req: any, updateUserDto: UpdateUserDto) {
    const userExists = await this.doesUserExist(req.auth.sub);

    if (!userExists) {
      throw new Error('User does not exist');
    }

    const { expertise } = updateUserDto;
    const expertiseResponse = await this.getExpertise(expertise);

    return await this.userRepository.findOneAndUpdate(
      { 'user.sub': req.auth.sub },
      {
        ...updateUserDto,
        expertise: expertiseResponse,
      },
    );
  }

  async compareExpertises(data: any) {
    //find users with matching expertise
    const users = await this.userRepository.find({
      expertise: { $in: data.expertise },
    });

    //send users to job service
    return users;
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  async doesUserExist(sub: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ 'user.sub': sub });
    if (result) {
      return true;
    }
    return false;
  }

  private async getExpertise(expertise: IdExpertiseDto[]) {
    try {
      const expertiseResponse = await lastValueFrom(
        this.natsClient.send({ cmd: 'get-expertise' }, expertise),
      );
      if (!expertiseResponse) {
        throw new Error('No expertise found for the provided IDs');
      }
      return expertiseResponse;
    } catch (error) {
      console.error('Error while sending message to get-expertise:', error);
      throw error;
    }
  }

  async getUserInfo(req: any) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://cinelly.eu.auth0.com/users/${req.auth.sub}`,
      headers: {
        Accept: 'application/json',
        Authorization: req.headers.authorization,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    // const options = {
    //   method: 'GET',
    //   url: `https://cinelly.com/api/v2/users/${req.auth.sub}`,
    //   headers: { authorization: req.headers.authorization },
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log('test', response.data);
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }
  }
}

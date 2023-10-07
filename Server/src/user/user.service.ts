/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

interface ApiResponse {
  data: User;
  status: number;
  msg: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  // private user: User[] = [];

  async setUser(newUser: User): Promise<ApiResponse> {
    const res = await this.userModel.create(newUser);
    const result: ApiResponse = {
      data: res.toObject(), // Replace with the actual data you want to send
      status: 201,
      msg: 'Successfully created',
    };
    // return res;
    // TODO: handle this return data
    return result;
  }

  async updateUser(updatedUser: User): Promise<ApiResponse> {
    const filter = { userName: updatedUser.userName };
    const update = updatedUser;
    const options = { new: true }; // To return the updated document

    const res = await this.userModel.findOneAndUpdate(filter, update, options);
    const result: ApiResponse = {
      data: res.toObject(), // Replace with the actual data you want to send
      status: 201,
      msg: 'Data has been changed',
    };
    return result;
  }

  async getAllUser(): Promise<User[]> {
    const findUser = await this.userModel.find();
    return [...findUser];
  }

  async getUser(searchString: string) {
    console.log(searchString);

    const foundUser = await this.userModel
      .findOne({ userName: searchString })
      .exec();
    console.log(foundUser);

    if (!foundUser) {
      throw new NotFoundException(
        `User with username '${searchString}' not found`,
      );
    }
    return foundUser;
  }
}

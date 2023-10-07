/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Body, Get, Post, Param, Header, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './DTO/create.user.dto';


interface ApiResponse {
  data: User;
  status: number;
  msg: string;
}


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // For updating user
  @Put()
  editUser(@Body() updatedUser: CreateUserDto): Promise<ApiResponse> {
    return this.userService.updateUser(updatedUser);
  }

  // For creating user
  @Post()
  setUser(@Body() newUser: CreateUserDto): Promise<ApiResponse> {
    return this.userService.setUser(newUser);
  }

  // For getting all user
  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  // For getting user by usrname
  @Get(':username')
  @Header('Content-Type', 'application/json')
  getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }
}


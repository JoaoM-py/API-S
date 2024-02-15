import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async select(){
    return this.usersService.selectAll()
  }

  @Post()
  async create(@Body() data:User){
    return this.usersService.create(data)
  }

  @Put()
  async update(@Body() data:User){
    return this.usersService.update(data)
  }

  @Delete()
  async delete(@Body() data:User){
    return this.usersService.delete(data)
  }
}

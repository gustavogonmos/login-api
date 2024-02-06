/* eslint-disable prettier/prettier */
import {Controller, Post, Body, Param, Get, Put, Delete, HttpCode} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {} 
    
    
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
    @HttpCode(201)
    @Post('/create')
    insertUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.usersService.insertUser(createUserDto);
    }
}
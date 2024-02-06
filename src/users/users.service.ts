/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcryptjs from 'bcryptjs';

interface IUser {
    name: string;
    password:string;
}
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}


    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async insertUser({name, password}: IUser): Promise<any> {
        return this.userRepository.save({
            name,
            password:  await bcryptjs.hash(password, 10)
        });
    }

}
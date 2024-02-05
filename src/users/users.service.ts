
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    private users: User[] = [
        {
            id: 1,
            name: 'John',
            email: 'john@gmail.com'
        },
        {
            id: 2,
            name: 'Juan',
            email: 'juan@gmail.com'
        },
    ];

    private autoIncrement: number = 4;



    create(createUserDto: CreateUserDto) {
        let id = createUserDto.id

        if (!id) {
            id = this.autoIncrement++;
        } else {
            if (this.users.find(u => u.id == id)) {
                throw new ConflictException('El id ya existe');
            }
            this.autoIncrement = id + 1;
        }


        if (this.users.find(u => u.email == createUserDto.email)) {
            throw new ConflictException('El email ya existe');
        }

        const user = {
            id,
            name: createUserDto.name,
            email: createUserDto.email
        };

        this.users.push(user);

        return user;
    }

    findAll() {
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id == id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        let user = this.users.find(user => user.id == id);
        if(user) {
            if(updateUserDto.id && this.users.find(user => user.id != id && user.id == updateUserDto.id)){
                throw new ConflictException('El id ya existe');
            }

            if(updateUserDto.email && this.users.find(user => user.id != id && user.email == updateUserDto.email)) {
                throw new ConflictException('El email ya existe');
            }

            user.id = updateUserDto.id ? updateUserDto.id : user.id;
            user.name = updateUserDto.name ? updateUserDto.name : user.name;
            user.email = updateUserDto.email ? updateUserDto.email : user.email;

            return user;
        }
        return null;
    }

    remove(id: number) {
        let userIndex = this.users.findIndex(user => user.id == id);

        if(userIndex != -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}
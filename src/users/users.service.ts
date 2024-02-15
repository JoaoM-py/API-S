import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'database/PrismaDatabase';
import { Users } from './users.model';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    async selectAll():Promise<User[]>{
        return this.prisma.user.findMany()
    }

    async create(data: Users):Promise<Users>{
        const user = await this.prisma.user.create({
            data,
        });
        return user
    }

    async update(data: User){
        const user = await this.prisma.user.update({
            where: {
                id:data.id
            },
            data: {
                ...data
            }
        });
        return user
    }

    async delete(data: User){
        const user = await this.prisma.user.delete({
            where: {
                id:data.id
            },
        });
        return user
    }
}
